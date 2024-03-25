import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

function SingIn() {
  const [formData , setFormData] = useState({})

  const {loading , error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({...formData , [e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      dispatch(signInFailure(false))
      const res = await axios.post('http://localhost:3000/api/auth/signin' , formData)
      dispatch(signInSuccess(res.data))
      navigate('/')
    } catch (error) {
        dispatch(signInFailure(error.response.data))
      }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className=' text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" id='email' className='bg-slate-100 p-3 rounded-lg' placeholder='Email' onChange={handleChange} />
        <input type="password" id='password' className='bg-slate-100 p-3 rounded-lg' placeholder='Password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className=' text-blue-500'>Sign up</span>
        </Link>
      </div>
      <div>
        <p className=' text-red-700 mt-5'>
          {error ? error.message || 'Something wents wrong...' : ''}
        </p>
      </div>
    </div>
  )
}

export default SingIn