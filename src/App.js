// import logo from './logo.svg';
import './App.css';
import Row from './Row';
import requests from './request';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner/>
      <Row
        title="NETFLIX ORIGINALS"
        fetchurl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchurl={requests.fetchTrending} />
      <Row title="TopRated" fetchurl={requests.fetchTopRatedMovies} />
      <Row title="ActionMovies" fetchurl={requests.fetchActionMovies} />
      <Row title="ComedyMovies" fetchurl={requests.fetchComedyMovies} />
      <Row title="HorrorMovies" fetchurl={requests.fetchHorrorMovies} />
      <Row title="RomanceMovies" fetchurl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchurl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
