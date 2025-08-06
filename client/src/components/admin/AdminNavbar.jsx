import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

function AdminNavbar() {
  return (
    <div className='flex items-center justify-between px-6 py-4 text-white shadow-md fixed top-0 left-0 w-full z-50'>
      <Link to="/" className='flex items-center space-x-2'>
      <img src={assets.logo} alt="" className='h-10 w-auto' /></Link>
    </div>

  )
}

export default AdminNavbar
