import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favourite from './pages/Favourite.jsx'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer.jsx'
const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin') 

  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favourite" element={<Favourite />} />
    </Routes>
     {!isAdminRoute && <Footer />}
    </>
  )
}
export default App

