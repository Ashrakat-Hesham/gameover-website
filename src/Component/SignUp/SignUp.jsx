import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import img1 from "../../imgs/gaming.ebaf2ffc84f4451d.jpg"
import "./Signup.css"

export default function Register() {
  const [loading, setLoading] = useState(false)
  const notify = (msg, type) => { return toast[type](msg) };
  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')

  const validation = Yup.object({
    name: Yup.string().required('you have to insert your firstname').min(5, 'you have to insert at least 5 chars').max(10, 'you have to insert at max 10 chars'),
    email: Yup.string().required('you have to insert your email').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'insert valid mail'),
    password: Yup.string().required('you have to insert your password').matches(/^[A-z][a-z0-9]{6,8}$/, 'you must start with capital letter then continue from 6 to 8 chars in small letters'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'enter the same password'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: validation,
    onSubmit: registerData,
  })
  async function registerData(values) {
    setLoading(true)

    axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values).then((data) => {
      if (data.status === 201) {
        setLoading(false)
        navigate('/login')
        notify('success', 'success')
      }
    }).catch((error) => {
      if (error.response.status === 409) {
        setLoading(false)
        notify(error.response.data.message, 'error')
      }
    })


  }

  return <>
    <div className="container sign-container my-5" height="80vh">
      <div className="row">
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}
        <div className="col-md-6 col-1">
          <img className='w-100 h-100' src={img1} alt="" />
        </div>
        <div className="col-md-6 text-center bg-color1">
          <div className='px-5'>
            <h4 className='text-muted mt-5'>Create My Account</h4>
            <form onSubmit={formik.handleSubmit}>


              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='name' id='name' className='form-control my-2' placeholder='Name' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-warning'>{formik.errors.name}</div> : ''}



                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' id='email' type="text" className='form-control my-2' placeholder='Email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-warning'>{formik.errors.email}</div> : ''}




                <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' id='password' className='form-control my-2' placeholder='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-warning'>{formik.errors.password}</div> : ''}



                <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name='rePassword' id='rePassword' className='form-control my-2' placeholder='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-warning'>{formik.errors.rePassword}</div> : ''}

              </div>
              <button type='submit' className='form-control my-2 text-white p-2 btn-login'> {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Create Account'}</button>
              <p className='text-muted fs-6'>This site is protected by reCAPTCHA and the Google <a href="" className='text-muted'>Privacy Policy</a> and <a href="" className='text-muted'>Terms of Service</a> apply.
              </p>

              <hr className='text-white' />
              <p className='text-light mb-5'>Already a member?<NavLink to='/login' className='loginbtn'>Log In</NavLink></p>
            </form>
          </div>

        </div>
      </div>

    </div>
  </>

}




