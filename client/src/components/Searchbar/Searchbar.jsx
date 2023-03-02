import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPokemons } from '../../actions';
import style from './Searchbar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.trim().replace(/\s+/g, " "));
      }

    function handleSubmit(e){
        e.preventDefault();
        if(name !== ''){
            dispatch(searchPokemons(name))
            setName('')
        }
    }

    return (
        <div className={style.searchBox}>
          <form onSubmit={handleSubmit}>
            <input
              className={style.searchText}
              type="text"
              placeholder="Search Pokemon..."
              value={name}
              onChange={handleInputChange}
            />
            <button type="submit" className={style.searchButton} style={{ outline: "none" }}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      );
    }
    
    
    
