import React, { useEffect } from 'react';
import { getPokemons, getTypes } from '../../actions';
import { useDispatch } from 'react-redux' ;
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';

export default function LandingPage(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [dispatch])

    return(
        <div className={style.position}>
            <div style={{display:'flex', flexFlow:'column'}}>
                <img src='images/logo.png'alt="Pokemon" width='500px'/>
                <Link to='/home'>
                    <button className={style.button}>Home</button>
                </Link>
            </div>
            <img src='images/cover.png'alt="Loading.." width='500px'/>
        </div>
    ) 
}
