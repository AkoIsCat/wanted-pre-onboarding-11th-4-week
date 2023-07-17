import Header from '../components/Header';
import Search from '../components/Search';
import SearchResult from '../components/SearchResult';
import Container from '../styles/Container';

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Search />
        <SearchResult />
      </Container>
    </>
  );
};

export default Home;
