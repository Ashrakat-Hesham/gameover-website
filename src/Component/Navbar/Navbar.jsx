import React from 'react'
import img1 from "../../imgs/logo.png"
import "./Navbar.css"
import { Link, NavLink } from 'react-router-dom'
export default function Navbar({ userData, logout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark border-bottom border-dark fixed-top">
      <div className="container">
        <img src={img1} width="5%" alt="" />
        <h2 className="navbar-brand pointer me-5">Game Over</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="all">All</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PlatForms
              </NavLink>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="pc">pc</Link></li>
                <li><Link className="dropdown-item" to="browser">browser</Link></li>

              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort-by
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="releaseDate">release-date</NavLink></li>
                <li><NavLink className="dropdown-item" to="popularity">popularity</NavLink></li>
                <li><NavLink className="dropdown-item" to="alphabetical">alphabetical</NavLink></li>
                <li><NavLink className="dropdown-item" to="relevance">relevance</NavLink></li>

              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="racing">racing</NavLink></li>
                <li><NavLink className="dropdown-item" to="sports">sports</NavLink></li>
                <li><NavLink className="dropdown-item" to="social">social</NavLink></li>
                <li><NavLink className="dropdown-item" to="shooter">shooter</NavLink></li>
                <li><NavLink className="dropdown-item" to="openWorld">open-world</NavLink></li>
                <li><NavLink className="dropdown-item" to="zombie">zombie</NavLink></li>
                <li><NavLink className="dropdown-item" to="fantasy">fantasy</NavLink></li>
                <li><NavLink className="dropdown-item" to="actionRpg">action-rpg</NavLink></li>
                <li><NavLink className="dropdown-item" to="action">action</NavLink></li>
                <li><NavLink className="dropdown-item" to="flight">flight</NavLink></li>
                <li><NavLink className="dropdown-item" to="battleRoyale">battle-royale</NavLink></li>

              </ul>
            </li>
          </ul> : ''}

          <ul className='ms-auto navbar-nav'>
          
            {userData ? <button onClick={logout} className='btn btn-outline-primary'>LogOut</button> : <><button className='btn btn-outline-primary me-2'><NavLink to='login'>Login</NavLink></button>
          <button className='btn btn-outline-primary'><NavLink to='/signup'>Join free</NavLink></button></>}

          </ul>
        </div>
      </div>
    </nav>
  )
}
