// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { AgentDashboard } from '../pages/AgentDashboard'
import { PropertyDetails } from '../pages/PropertyDetails'
import { Navbar } from '../components/Shared/Navbar'
import { Footer } from '../components/Shared/Footer'
import PropertySearch from '../components/Client/PropertySearch'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
} 
