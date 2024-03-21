import React from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className=' text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id='username' className=' bg-slate-100 p-3 rounded-lg' placeholder='Username' />
        <input type="email" id='email' className='bg-slate-100 p-3 rounded-lg' placeholder='Email' />
        <input type="password" id='password' className='bg-slate-100 p-3 rounded-lg' placeholder='Password' />
        <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className=' text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp