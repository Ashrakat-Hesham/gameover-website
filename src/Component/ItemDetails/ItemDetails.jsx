import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./ItemDetails.css"

export default function ItemDetails({ loading, setloading }) {
    const [game, setgame] = useState(undefined)

    let { id } = useParams()
    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
        params: { id: `${id}` },
        headers: {
            'X-RapidAPI-Key': '00b6125240mshba78c14829d6bd3p1daddcjsnee3d6c55eb77',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }


    function getGameDetails(){
        axios.request(options).then((data) => {
            if(game!==undefined||game!==null){
              setgame(data.data)
                console.log(data);
                
            }
        })
            .catch((error) => {
                if (error.response.status === 409) {
                    setloading(false)
                }
            })
    }
    useEffect(() => {
      
            getGameDetails()

    
    },[game] )




    return <>

        {game&&<section className='position-relative' style={{ backgroundImage: `url(https://www.freetogame.com/g/${game.id}/background.jpg)`, height: '100vh ' }}>
            <div className='game-overlay position-absolute'>
                <div className="container my-5 ">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={game.thumbnail} className='w-100 rounded' alt="" />
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='btn px-2 py-1 fs-5 rounded bg-transparent text-muted'>free</h3>
                                <a className='btn form-control fs-5 rounded btn-blue text-decoration-none' target='_blank' href={game.freetogame_profile_url}>play Now <i className='fas fa-sign-out-alt'></i></a>
                            </div>
                        </div>
                        <div className="col-md-8 ps-3 vh-auto">
                            <h2 className='fs-1'>{game.title}</h2>
                            <h4>About{game.title}</h4>
                            <p className='fs-5 '>{game.description}</p>
                            <h4>Minimum System Requirements</h4>
                             <p>Graphics: {game.minimum_system_requirements.graphics==null||game.minimum_system_requirements.graphics==undefined?'':game.minimum_system_requirements.graphics}</p> 
                            <p>Memory: {game.minimum_system_requirements.memory} </p>
                            <p>Os: {game.minimum_system_requirements.os}</p>
                            <p>Processor:{game.minimum_system_requirements.processor}</p>
                            <p>Storage:{game.minimum_system_requirements.storage}</p>  
                            <h4>Overwatch 2 Screenshots</h4>
                            <div id="carouselExampleAutoplaying"  className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {game.screenshots.map(item => <div key={item.id} className="carousel-item active">
                                        <img src={item.image} className='w-100' />                                    </div>)}
                                </div>
                            </div>

<div className='mt-5'>
                            <h3>Additional Information</h3>
                            <div className='d-flex'>
                                <div className="col-md-4">
                                    <p className='text-muted'>Title </p>
                                    <p>{game.title}</p>
                                    <p className='text-muted'>Release Date</p>
                                    <p>{game.release_date}</p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-muted'>Developer </p>
                                    <p>{game.developer}</p>
                                    <p className='text-muted'>Genre</p>
                                    <p>{game.genre}</p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-muted'>Publisher </p>
                                    <p>{game.publisher}</p>
                                    <p className='text-muted'>Platform</p>
                                    <p>{game.platform}</p>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}
