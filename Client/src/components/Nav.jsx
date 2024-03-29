import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Nav() {
  const {currentUser} = useSelector(state => state.user)
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
                <Link to={'/profile'}>
                {
                  currentUser ? (
                    <img src={currentUser.profilePicture} alt="Profile pic" className='w-7 h-7 object-cover rounded-full' />
                  ) : 
                    <li>
                      Sign in
                    </li>
                }
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Nav