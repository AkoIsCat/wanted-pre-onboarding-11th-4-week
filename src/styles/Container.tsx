import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const ContainerDiv = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = ({ children }: PropsWithChildren) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
