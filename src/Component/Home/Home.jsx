import React from 'react'
import "./Home.css"
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card } from 'react-bootstrap'
import RingLoader from "react-spinners/ClipLoader";
import CardSkeleton from '../CardSkeleton/CardSkeleton'
import { SkeletonTheme } from 'react-loading-skeleton'


export default function Home({ loading, setloading }) {

    const [popularity, setPopularity] = useState([])

    const options = {

        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: { 'sort-by': `popularity` },
        headers: {
            'X-RapidAPI-Key': '00b6125240mshba78c14829d6bd3p1daddcjsnee3d6c55eb77',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    useEffect(() => {
        setTimeout(async () => {
            let { data } = await axios.request(options)
            setPopularity(data)
            setloading(false)
        }, 2000);
    }, [])

    return <>
        <div className='home my-5'>
            <div>
                <SkeletonTheme baseColor='#32383e' highlightColor='#7a8288' borderRadius={true}>
                    {loading ?
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 gy-5 mx-auto"><CardSkeleton /></div>
                                <div className="col-md-4 gy-5 mx-auto"><CardSkeleton /></div>
                                <div className="col-md-4 gy-5 mx-auto"><CardSkeleton /></div>
                            </div>
                        </div>
                        :
                        <>
                            <div className="container-fluid overlay">
                                <div className="row">
                                    <div className='bg-overlay text-center mx-auto'>
                                        <h1 className='text-white mt-5 '>Find & track the best <span className='text-primary'>free-to-play</span> games!</h1>
                                        <h3 className='text-muted h4 fw-light'>Track what you've played and search for what to play next! Plus get free premium loot!</h3>
                                        <button className='btn btn-sm btn-outline-secondary  mt-3 py-2 px-3'><Link className="text-decoration-none" to='/all'>Browse Games</Link></button>
                                    </div>

                                </div>
                            </div>
                            <div className="container my-5">
                                <div className="row ">
                                    <div className='d-flex'>
                                        <i className="fa-solid fa-robot fs-3"></i>
                                        <h3>Personalized Recommendations</h3>
                                    </div>
                                    {popularity.slice(0, 3).map((item, index) => <div key={item.id} className="col-md-4 gy-5 mx-auto">
                                        <Link className='text-decoration-none text-white' to={`/itemdetails/${item.id}`}>
                                            {/* <Card className='bg-color1 mx-auto' style={{ width: '25rem', height: '19rem' }}>
                                            <Card.Img variant="top" src={item.thumbnail} />
                                            <Card.Body>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div className="col-md-10">
                                                        <div className='text-start text-muted'><h4 className=' normal'>{item.title.length < 15 ? item.title : item.title.substring(0, 15).concat('...')}</h4></div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <Button className='btn-sm' variant="primary">free</Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card> */}
                                            <div className="card gameCard bg-color1 mx-auto" style={{ width: '25rem', height: '19rem' }}>
                                                <img src={item.thumbnail} className="card-img-top " alt="..." />
                                                <div className="card-body px-2">
                                                    <div className='d-flex justify-content-between align-items-center mt-2'>
                                                        <div className="col-md-10">
                                                            <div className='text-start text-muted'><h4 className=' normal'>{item.title.length < 15 ? item.title : item.title.substring(0, 15).concat('...')}</h4></div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <Button className='btn-sm' variant="primary">free</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>)}


                                </div>
                            </div>
                        </>}

                </SkeletonTheme></div>
        </div>
    </>
}

