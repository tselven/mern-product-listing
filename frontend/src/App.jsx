import { useState } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDashboard from './pages/ProductDashboard'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
        {/* <NavBar/> */}
        <BrowserRouter>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" Component={HomePage} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="/products" element={<h1>Products Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path='/dashboard' Component={ProductDashboard} />
            <Route path="/login" Component={LoginPage} />
            {/* Add more routes as needed */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
