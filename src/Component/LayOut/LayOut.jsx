import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
export default function LayOut({ setuserData, userData }) {
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem('userToken')
        setuserData(null)
        navigate('/login')
    }


    return <>
        <Navbar userData={userData} logout={logout} />

        <Outlet></Outlet>


    </>


}
