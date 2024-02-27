import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className='bg-gray-200 w-full py-5'>
        <div className=' max-w-6xl mx-auto flex justify-between items-center'>
            <div>
            <Link to={'/'}>
                <h1 className='text-2xl font-semibold'>Auth App</h1>
                </Link>

            </div>
            <ul className='flex gap-5'>
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/sign-in'}>Sign in</Link>
            </ul>
        </div>
    </div>
  )
}

export default Nav