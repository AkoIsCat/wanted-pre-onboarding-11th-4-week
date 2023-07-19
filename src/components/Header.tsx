import { styled } from 'styled-components';

const Header = () => {
  return (
    <header>
      <Title>
        <div className='inner'>한국임상정보</div>
      </Title>
      <Description>
        <div className='inner'>국내 모든 임상시험을 검색하고</div>
        <div className='inner'>온라인으로 참여해보세요!</div>
      </Description>
    </header>
  );
};

export default Header;

const Title = styled.div`
  background: #fff;
  font-weight: bold;
  width: 100vw;
  height: 8vh;
  font-size: 2em;
  display: flex;
  align-items: center;

  .inner {
    padding: 5px 30px;
    background: #fff;
  }
`;

const Description = styled.div`
  font-weight: bold;
  width: 100vw;
  height: 20vh;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .inner {
    margin: 5px 0;
  }
`;
