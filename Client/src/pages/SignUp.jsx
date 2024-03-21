import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  const [formData , setFormData] = useState({})
  const [err , setErr] = useState(false) ;
  const [loading , setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({...formData , [e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setErr(false)
      const res = await axios.post('http://localhost:3000/api/auth/signup' , formData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErr(true)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className=' text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" id='username' className=' bg-slate-100 p-3 rounded-lg' placeholder='Username' onChange={handleChange} />
        <input type="email" id='email' className='bg-slate-100 p-3 rounded-lg' placeholder='Email' onChange={handleChange} />
        <input type="password" id='password' className='bg-slate-100 p-3 rounded-lg' placeholder='Password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className=' text-blue-500'>Sign in</span>
        </Link>
      </div>
      <div>
        <p className=' text-red-700 mt-5'>
          {err && 'Something wents wrong...'}
        </p>
      </div>
    </div>
  )
}

export default SignUp