import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const ContainerDiv = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Container = ({ children }: PropsWithChildren) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
