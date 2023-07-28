
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RingLoader from "react-spinners/ClipLoader";
import "./All.css"
import { Button, Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

export default function All({ loading, setloading }) {
  const [all, setAll] = useState([])
  const [limit, setlimit] = useState(20)

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '00b6125240mshba78c14829d6bd3p1daddcjsnee3d6c55eb77',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      setloading(true)
      let { data } = await axios.request(options)
      setAll(data)
      setloading(false)
    }, 2000);
  }, [])
  function loadmore() {
    setlimit((x) => x + 20);
  }
  return <>  <SkeletonTheme baseColor='#32383e' highlightColor='#7a8288' borderRadius={true}>
    <div className="container ">
      <div className="row ">
        {loading ? <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton /></>
          :
          <>
            {all.slice(0, limit).map((item, i) =>
              <div key={item.id} className="col-md-3 gy-4">
                <NavLink className='text-decoration-none text-white' to={`/itemdetails/${item.id}`}>

                  <div className="card gameCard bg-color1 mx-auto" style={{ width: '19rem', height: '19rem' }}>
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
                      <p className="card-text">{item.short_description.split(' ').slice(0, 3).join(' ')}</p>
                      <div className='d-flex justify-content-between align-items-center '>
                        <i className="fa-regular fa-square-plus "></i>
                        <div className='text-muted d-flex justify-content-center align-items-center'>
                          <p className='bg-icon rounded me-2 fw-bold p-1'>{item.genre}</p>
                          <p>{item.platform === 'PC (Windows)' ? <i className="fa-brands fa-windows"></i> : <i className="fa-solid fa-window-maximize"></i>}</p>                            </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            )}

            <div className='col-md-2 mx-auto text-center'>
              <button className='btn btn-btn-outline-secondary text-light my-5' onClick={() => { loadmore() }}>More Games <i className="fa-solid fa-angle-right"></i></button>
            </div>

          </>}</div></div>
  </SkeletonTheme>
  </>
}
