import './App.css';
import SearchBar from './components/Search-Bar/SearchBar';
import background from './music-background.svg'


function App() {
  return (
    <div>
      <h6 className="music">
        Aux-i-Gen
      </h6>
      <img className="background" src={background}></img>
      <SearchBar placeholder="Enter a Note..."/>

    </div>

  );
}

export default App;
