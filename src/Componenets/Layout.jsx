import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from '../Footer'

export default function Layout() {
  return (
    <div className='parent'>
      <Navbar/>
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  )
}
