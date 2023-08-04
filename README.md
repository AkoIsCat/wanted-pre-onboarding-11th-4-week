# 원티드 프리온보딩 인턴십 11차 4주차 개인 과제

<br />

<div align='center'>

![GIF](https://github.com/AkoIsCat/wanted-pre-onboarding-11th-4-week/assets/109052469/1413c621-035e-4267-aa01-348495b23076)

</div>

## ABOUT

<div align='center'>
    <p> <a href="https://github.com/walking-sunset/assignment-api">assignment-api</a>를 활용하여 <br/>국내의 모든 임상시험을 검색하고 <br/> 검색어를 추천 해주는 프로젝트입니다</p>
    <font color="gray">
    * 이 프로젝트를 실행하려면 api 문서를 바탕으로 서버를 열어야 실행됩니다.
    </font>
    <br />
    <br />
    <div style="text-align: center"> 2023.07.16 ~ 2023.07.19 </div>
</div>

## 기술 스택

![vite](https://img.shields.io/badge/Vite-1.4.0-red?logo=vite&logoColor=red)
![React](https://img.shields.io/badge/React-5.0.1-20232A?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.9.5-007ACC?logo=typescript)
![styled-components](https://img.shields.io/badge/styled--components-1.12.0-28A745?logo=styled-components)
![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios&logoColor=%23671DDF)

## 실행 방법

프론트엔드

```
git clone https://github.com/AkoIsCat/wanted-pre-onboarding-11th-4-week.git

npm install

npm run dev
```

백엔드

```
git clone https://github.com/walking-sunset/assignment-api.git

npm install

npm start
```

## 폴더 구조

```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂store
 ┣ 📂styles
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 📌 주요 기능

  - 검색창 구현
  - 검색어 추천 기능 (키보드로 이동 가능)
  - API가 호출될때마다 콘솔에 안내 (api 호출 횟수 확인 기능)
  - API 호출 횟수를 줄이기 위한 Debounce 기능
  - 로컬 스토리지를 이용한 캐싱 기능(expire time 적용)
      - 추천 검색어 목록을 가져올 때 마다 Context에 만료 시간과 함께 저장 후 로컬 스토리지에 추가
      - 로컬 스토리지 → 캐시 스토리지로 리팩토링 할 예정

### 1. 검색어 추천 기능

검색창에 입력한 값을 통해 검색창 바로 아래에 추천 검색어 목록을 보여주는 기능(7개 까지만 표시)
<br />
(추천 검색어가 없을 시 "검색어 없음" 표시)

### 2. API 호출 횟수를 줄이기 위한 Debounce 기능

setTimeOut을 이용해 350ms 동안 입력이 없으면 api를 호출하도록 하여 api 호출 횟수를 줄이기 위해 노력하였습니다.
<br>350ms가 지나기 전에 입력이 다시 입력이 들어오면 기존 타이머는 지워집니다.
<br>입력 시간은 유동적으로 변경 가능합니다.

```
// useDebounce.ts

import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;

// Search.tsx

  const debouncedSearchInput = useDebounce(searchInput, 350);

```

### 3. API 호출별 로컬 캐싱 기능

#### 캐싱

함수 호출 시 캐싱할 데이터와 키 이름, 만료 시간을 담아 호출을 합니다.
<br/>
그 후, 전달받은 데이터를 로컬 스토리지에 저장합니다.
<br/>
검색어가 입력되었을 때 로컬 스토리지에 데이터가 있다면 api 호출을 하지 않고 캐싱된 데이터를 불러옵니다.

```
  const cachingLocalstorage = (result: any, input: string, tts: number) => {
    const now = new Date();
    const cachedData = {
      result,
      expiry: now.getTime() + tts,
    };
    // 데이터와 만료 시간을 함께 저장
    localStorage.setItem(input, JSON.stringify(cachedData));
  };

  // 함수 호출 부분
  cachingLocalstorage(payload.result, trimInput, 5000);

```

#### 캐싱 검증

```
const trimInput = search.trim();
const cachingData = localStorage.getItem(trimInput);

  // 해당 검색어가 캐싱 되어있는지 검증
  if (cachingData) {
    // 데이터가 있다면 api 호출하지 않음
      const parseData = JSON.parse(cachingData);
      dispatch({ type: 'UPDATE', payload: parseData });
    } else {
      // 캐싱된 데이터가 없을 경우 api 호출 후 로컬 스토리지에 저장
    }
```

#### 캐싱된 데이터 삭제 (expire time)

1분마다 로컬 스토리지에 있는 값들을 순회해 만료 시간이 지난 값들은 삭제합니다.
<br />
삭제 시간은 유동적으로 변경이 가능합니다.

```
  const removeExpiredCaches = () => {
    const now = new Date();
    // for문을 이용해 저장된 데이터 순회
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const cachingData = localStorage.getItem(key);
        if (cachingData) {
          const parseData = JSON.parse(cachingData);
          // 만료시간이 지난 데이터는 삭제
          if (now.getTime() > parseData.expiry) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  };

// 1분마다 만료 시간이 지난 데이터를 삭제
  if (localStorage.length !== 0) {
    setInterval(() => {
      removeExpiredCaches();
    }, 60000);
  }
```

### 4. 키보드를 이용한 추천 검색어 목록 이동 기능

사용자가 키보드만으로도 쉽고 편하게 검색어를 선택할 수 있습니다.
<br/>

- 첫번째 목록에서 ↑ 키를 누를 시 마지막 목록으로 이동합니다.
  <br/>
- 마지막 목록에서 ↓ 키를 눌렀을 때 또한 첫번째 목록으로 이동합니다.
  <br/>
- Esc를 누를 시 검색어가 초기화 됩니다.
  <br/>
- Enter를 누를 시 선택된 추천 검색어가 입력됩니다.

```
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        setIndex(prevIdx => (prevIdx + 1) % recommendData.result.length);
        break;
      case 'ArrowUp':
        setIndex(
          prevIdx => (prevIdx - 1 + recommendData.result.length) % recommendData.result.length
        );
        break;
      case 'Escape':
        searchItems('');
        setSearchInput('');
        setIndex(-1);
        break;
      case 'Enter':
        if (idx !== -1 && recommendData.result[idx]) {
          const data = recommendData.result[idx].sickNm;
          searchItems(data);
          setSearchInput(data);
        }
        break;
    }
  };
```
<!-- ## 프로젝트 결과

**아쉬웠던 점**

- **로컬 스토리지로 구현한 캐싱 기능**
    
    웹 스토리지로 캐시, 로컬 스토리지, 세션 스토리지에 대한 지식만을 갖고 있어서 로컬 스토리지로 구현을 했는데 완성을 하고 보니 캐시 스토리지에 대해 알게 되었습니다. 
    캐싱을 구현하기엔 캐시 스토리지가 적합하다고 생각돼 후에 캐시 스토리지로 리팩토링을 할 것입니다.
     -->


## 프로젝트를 통해 얻은 것

**성능 최적화 기법 Debounce**

- 불필요한 API 호출을 줄여 서버의 부하를 줄이는 방법을 고민하다가 Debounce 기능을 사용했습니다. 이로인해 API 호출 횟수를 많이 감소 시켰으며 앞으로 실시간으로 요청을 해야 할 때 유용하게 사용할 것 같습니다.

**로컬 스토리지와 캐시 스토리지**

- 웹 스토리지로 캐시, 로컬 스토리지, 세션 스토리지에 대한 지식만을 갖고 있어서 로컬 스토리지로 구현을 했는데 완성을 하고 보니 캐시 스토리지에 대해 알게 되었습니다. 
로컬 스토리지는 동기적으로 동작하때문에 캐싱을 구현하기엔 캐시 스토리지가 적합하다고 생각돼 후에 캐시 스토리지로 리팩토링을 할 것입니다.
