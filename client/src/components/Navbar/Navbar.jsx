import React from 'react' ;
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import style from './Navbar.module.css'

export default function Navbar(){
    return (
        <nav className={style.nav}>
            <Link to='/'>
                <span className={style.landinglink}>
                    <img id="PokeLogo" src={`images/navLogo.png`} width="110" alt="landing" />
                </span>
            </Link>
            <Searchbar />
            <Link to="/pokemons"><button className={style.create}>Create</button></Link>
        </nav>
      );
}