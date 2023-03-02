import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import PokeCreate from './components/PokeCreate/PokeCreate'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route exact path="/home" element={<Home />}/>
        <Route path="/pokemons" component={PokeCreate}/>
      </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;
