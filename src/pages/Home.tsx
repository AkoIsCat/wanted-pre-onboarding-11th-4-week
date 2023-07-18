import Header from '../components/Header';
import Search from '../components/Search';
import Container from '../styles/Container';

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Search />
      </Container>
    </>
  );
};

export default Home;
