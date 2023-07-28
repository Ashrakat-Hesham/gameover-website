import { useFormik } from 'formik'
import React, { useState } from 'react'
import img1 from '../../imgs/gaming.ebaf2ffc84f4451d.jpg'
import * as yup from "yup"
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import img2 from "../../imgs/logo.png"
import "../SignUp/Signup.css"
import "./Login.css"
import axios from 'axios'

export default function Login({saveUserData}) {
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')

  const tell = () => alert('ههه اعمل اكونت جديد')



  const validation = yup.object({
    email: yup.string().required('you have to insert your email').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'insert valid mail'),
    password: yup.string().required('you have to insert your password').matches(/^[A-z][a-z0-9]{6,8}$/, 'you must start with capital letter then continue from 6 to 8 chars in small letters'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: registerData,
  })
  async function registerData(values) {
    setLoading(true)
   let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=>{
      setapiError(err.response.data.message)
      setLoading(false)
    });
  
    if (data.message === 'success') {
      localStorage.setItem('userToken',data.token)
      saveUserData();
      setLoading(false)
      navigate('/home')
    }
  
    
    console.log(data);
  }


return <>
  <div className="container sign-container my-5" height="80vh">
    <div className="row">
      {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}

      <div className="col-md-6">
        <img className='w-100 h-100' src={img1} alt="" />
      </div>
      <div className="col-md-6 text-center bg-color1">
        <img src={img2} width='20%' alt="" />
        <h4 className='text-muted my-2'>Log in to GameOver</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className='px-5'>
            <div className="col-md-12">
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' id='email' type="text" className='form-control my-2' placeholder='Email' />
              {formik.errors.email && formik.touched.email ? <div className='alert alert-warning'>{formik.errors.email}</div> : ''}

            </div>
            <div className="col-md-12">
              <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' id='password' className='form-control my-2' placeholder='password' />
              {formik.errors.password && formik.touched.password ? <div className='alert alert-warning'>{formik.errors.password}</div> : ''}

            </div>
            <button type='submit' className='form-control my-2 text-white p-2 btn-login'> {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}</button>
            <hr className='my-4' />
            <p onClick={tell} ><NavLink className='loginbtn' to="">Forget Password?</NavLink></p>

            <p>Not a member yet?<NavLink className='loginbtn' to='/signup'> Create Account</NavLink></p>
          </div>
        </form>
      </div>


    </div>
  </div>
</>
}



