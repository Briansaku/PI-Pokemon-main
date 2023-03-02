import React from 'react'
import style from './Pagination.module.css'

export default function Pagination({ pokemonsPerPage, allPokemons, pagination, page}) {
    const totalPages = Math.ceil(allPokemons / pokemonsPerPage);
    const pagesArray = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }

    return (
        <nav>
          <ul className={style.pag}>
            {pagesArray && pagesArray.map((number) => (
              <li key={number} style={{ listStyle: 'none' }}>
                <button
                  className={style.buttons}
                  style={page === number ? { color: 'white' } : {}}
                  onClick={() => pagination(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );

}