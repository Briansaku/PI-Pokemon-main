import React, {useState, useEffect} from 'react' ;
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, filterCreated, orderByNameOrStrengh, getTypes, removeDetail, filterByType, reloadPokemons } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Pagination/Pagination';
import Navbar from '../Navbar/Navbar';
import style from './Home.module.css';
import charmander from '../../assets/charmander.png';
import random from '../../assets/random.png';

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const all = useSelector(state => state.allPokemons)
    const types = useSelector(state => state.types)

    const [pokeLoaded, setPokeLoaded] = useState(all.length ? true : false)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(removeDetail());
        dispatch(getTypes());
        if(!pokeLoaded){
            dispatch(getPokemons());
        }   
    }, [pokeLoaded, dispatch])

    useEffect(() => {
        setCurrentPage(1);
      }, [allPokemons.length,setCurrentPage]);

    function handleClick(e){
        e.preventDefault();
        dispatch(reloadPokemons());
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterByType(e){
        dispatch(filterByType(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByNameOrStrengh(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={style.home}>
        <Navbar />
            <button onClick={handleClick} className={style.poke}>
                <img src={charmander} alt="pokeball" width='15px'/>
                RELOAD
            </button>
            <div className={style.sortfilter}>
                <select onChange={handleSort}>
                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>
                <select onChange={handleFilterCreated}>
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>
                <select onChange={handleFilterByType}>
                    <option value="All">All types</option>
                    {types.map(type => (
                        <option value={type.name} key={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
        
            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                pagination={pagination}
                page={currentPage}
            />
        
            <div className={style.cards}>
                {currentPokemons.length ? (
                    typeof currentPokemons[0] === 'object' ? (
                        currentPokemons.map(el => (
                            <div key={el.id}>
                                <Link to={`/home/${el.id}`} style={{textDecoration:'none'}}>
                                    <Card name={el.name} types={el.types} image={el.img ? el.img : random} id={el.id} weight={el.weight} height={el.height} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className={style.notfound}>
                            <img src='images/notFound.png'alt="Pokemon not found" width='200px'/>
                            <span>{currentPokemons[0]} Not found</span>
                        </div>
                    )
                ) : (
                    <div className={style.loading}> 
                        <img src='images/loading.gif' alt="Loading.." width='250px'/>
                        <p className={style.loadingtext}>Loading...</p>
                    </div>
                )}
            </div>
        </div>
        );
 }
        
        
        
        