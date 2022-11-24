const StarWarDetails = ({starWarDetails,filmDetails,filmDetailsLoading}) => {

  return (
    <div>
        <h2 className='starWarDetails_title'>Character Details </h2>
        <div className='profile_details'>
            <div className='profile_card_img'>
                <img alt="persson" className='image_icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png' width={100} height={100} />
                <h3>{starWarDetails?.name}</h3>
            </div>
            <div className='profile_card'>
                <span className='badge'>{starWarDetails?.vehicles && starWarDetails?.vehicles.length}</span>
                <span className='profile_key_name'>Vehicles</span>
            </div>
            <div className='profile_card'>
                <span className='badge'>{starWarDetails?.species && starWarDetails?.species.length}</span>
                <span className='profile_key_name'>Species</span>
            </div>
            <div className='profile_card'>
                <span className='badge'>{starWarDetails?.starships && starWarDetails?.starships.length}</span>
                <span className='profile_key_name'>Starships</span>
            </div>
            <div className='profile_card'>
                <span className='badge'>{starWarDetails?.films && starWarDetails?.films.length}</span>
                <span className='profile_key_name'>Films</span>
            </div>
            
        </div>
        <div>
            {/* <h3>Personal Details</h3> */}
            
            <div className='details_container'>
                
                <table className='details_table'>
                    <tbody>
                        <tr>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Gender</span> 
                                <span className='details_value'>{starWarDetails?.gender}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Birth Year</span>  
                                <span className='details_value'>{starWarDetails?.birth_year}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Height</span>  
                                <span className='details_value'>{starWarDetails?.height}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Mass</span>  
                                <span className='details_value'>{starWarDetails?.mass}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Hair Color</span>  
                                <span className='details_value'>{starWarDetails?.hair_color}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Eye Color</span>  
                                <span className='details_value'>{starWarDetails?.eye_color}</span>
                            </td>
                            <td className='table_td_conatainer'>
                                <span className='details_label'>Skin Color</span>  
                                <span className='details_value'>{starWarDetails?.skin_color}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Film Details </h2>

            <div className='film_container'>
                {!filmDetailsLoading? filmDetails && filmDetails.map((film,index)=>{
                    return(
                        <div key={index} className='film_details'>
                            <img alt="film" src='http://simpleicon.com/wp-content/uploads/film-3.png' width={225} height={200} />
                            <div>
                                <div>
                                    <span className='details_label'>Film Name</span>  
                                    <span className='details_value'>{film?.title}</span>
                                </div>
                                <div>
                                    <span className='details_label'>Film Director</span>  
                                    <span className='details_value'>{film?.director}</span>
                                </div>
                                <div>
                                    <span className='details_label'>Film Producer</span>  
                                    <span className='details_value'>{film?.producer}</span>
                                </div>
                            </div>
                        </div>
                    )
                }): <h3>Film details are loading .....</h3>}

            </div>

            
            
        </div>
    </div>
  )
}

export default StarWarDetails