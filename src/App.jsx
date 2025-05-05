import './App.css'
import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Navbar from './components/Navbar'
import Awards from './pages/Awards'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Resources from './pages/Resources'
import Testimonial from './pages/Testimonials'
import AddTestimonial from './components/AddTestimonial'
import PrivateRoute from './components/PrivateRoute.jsx'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <div className='bg-grid-small'>
            <Navbar />
            <ToastContainer position='top-center' autoClose={3000} />
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/awards' element={<Awards />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/experience' element={<Experience />} />
              <Route path='/testimonials' element={<Testimonial />} />
              <Route path='/not-found' element={<Home />} />
              <Route path='/add-testimonial' element={<AddTestimonial />} />
              <Route element={<PrivateRoute />}>
                <Route path='/resources' element={<Resources />} />
              </Route>
            </Routes>
      </div>
    </>
  )
}

export default App
