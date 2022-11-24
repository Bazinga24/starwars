import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarWarDetails from './StarWarDetails'

const StarWarsList = () => {
    const [filmDetailsLoading,setFilmDetailsLoading] = useState(true);
    const [favouritesList,setFavouritesList ] = useState(JSON.parse(localStorage.getItem("favoriteList")) ? JSON.parse(localStorage.getItem("favoriteList")) : [] )
    const [dataSource, setDataSource] = useState();
    const [starWarDetails, setStarWarDetails] = useState();
    const [filmDetails, setFilmDetails] = useState();
    const [pagination, setPagination] = useState({
        items: 0,
        total: 0,
        current_page: 0
    })

    let url = "https://swapi.dev/api/people/";
    const getStarWarsList = async (action) => {
        
        const res = await fetch(url);
        const data = await res.json();
        setDataSource(data)
        GetStarWarDetails(data?.results[0]?.url);
        setPagination(
            {
                items: data.results.length,
                total: data.count,
                current_page: action === "next" ? pagination.current_page + 1 : action === "prev" ? pagination.current_page - 1 : 1
            }
        )
         if (action === "init") {
            url = data?.next;
        }
    }
    const PrevPage =  ()  => {
        if (dataSource?.previous) {
           url = dataSource?.previous
            getStarWarsList("prev");
        }
        else {
            alert("previous page not available")
        }
    }
    const Nextpage =  () => {
        if (dataSource?.next) {
           url =  dataSource?.next
            getStarWarsList("next");
        }

        else {
            alert("Next page not available")
        }
    }
    const GetStarWarDetails = async (urlForDetails) => {
        setFilmDetailsLoading(true);
        const res = await fetch(urlForDetails);
        const data = await res.json();
        setStarWarDetails(data);
        let filmData = []
        for(let filmUrl of data.films) {
            const res = await fetch(filmUrl);
            const data = await res.json();
            filmData.push(data);
        }
        setFilmDetails(filmData);
        setFilmDetailsLoading(false);
    }
    const AddToFavourite = (starwar) => {
        var found = false;
        if(favouritesList){
            
        for(var i = 0; i < favouritesList.length; i++) {
            if (favouritesList[i].name === starwar.name) {
                found = true;
                break;
            }
        }
        if(!found) {
            let FavouriteData = favouritesList;
            FavouriteData.push(starwar)
            setFavouritesList(FavouriteData)
            localStorage.setItem("favoriteList",JSON.stringify(FavouriteData));
        }
        GetStarWarDetails(starwar?.url)
        }
        
    }
    const FavouriteHeartIcon = (starwar,favouritesList) =>{

        for(var i = 0; i < favouritesList.length; i++)
        {
            var found = false;
            if (favouritesList[i].name === starwar.name) {
                found = true;
                return true; 
            }
        }
        if(!found) {
           return false
        }

    }
    const DeleteFromFavourite = (starwar) => {
        
        let FavouriteData = favouritesList;
        for(var i=0;i<FavouriteData.length;i++){

            if(FavouriteData[i].name === starwar.name){
                FavouriteData.splice(i,1);
            }
        }
        setFavouritesList(FavouriteData);
        localStorage.setItem("favoriteList",JSON.stringify(FavouriteData));
        GetStarWarDetails(starwar?.url)
    }
    useEffect(() => {
        getStarWarsList("init")
    }, [])


    return (
        <div className='StarWars_main_container'>
            <div className='page_title_container'>
                <h2 className='page_title'>Starwars</h2>
                <div className='favourite_container'>
                    <span className='favorite_text'>Favourites</span>
                    <span className='favourite_heart_container'>
                        <i className="favourite_icon fa-solid fa-heart"></i>
                        <span className='favourite_count'>{favouritesList && favouritesList.length}</span>
                    </span>
                </div>
            </div>
            <div className='StarWars_container'>
                <div className='StarWars_list'>
                    <ul className='StarWars_list_ul_container'>
                        {dataSource && dataSource.results && dataSource.results.map((starwar, index) => {
                            return (
                                <li key={index}  className='StarWars_list_li'>
                                    <div className='starwar_list'>
                                        <Link onClick={() => GetStarWarDetails(starwar?.url)} className='StarWars_list_a'>{starwar?.name} </Link>
                                        { FavouriteHeartIcon(starwar,favouritesList) ? 
                                            <span className='red_heart_icon' onClick={() => DeleteFromFavourite(starwar)}><i className="fa-solid fa-heart"></i></span>
                                            :
                                            <span className='heart_icon' onClick={() => AddToFavourite(starwar)}><i className="fa-regular fa-heart"></i></span>
                                        }
                                        </div>
                                </li>
                            )
                        })}
                    </ul>
                    {pagination && <div className='StarWars_list_pagination'>
                        <span>Items {pagination.items}</span>
                        <span><i onClick={PrevPage} className="arrows fa-solid fa-caret-left"></i></span>
                        <span>{pagination.current_page}</span>
                        <span><i className="arrows fa-solid fa-caret-right" onClick={Nextpage}></i></span>
                        <span>Total {pagination.total}</span>

                    </div>}

                </div>
                <div className='StarWars_Details'>
                    {starWarDetails && <StarWarDetails filmDetailsLoading={filmDetailsLoading} filmDetails={filmDetails} starWarDetails={starWarDetails} />}
                </div>
            </div>
        </div>
    )
}

export default StarWarsList