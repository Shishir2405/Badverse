import './App.css'
import HomescreenLayout from './components/layouts/HomescreenLayout'
import Navbar from './components/core/navbar'
import MobileNavbar from './components/core/MobileNavbar'

function App() {
  return (
    <>
    <div className='md:flex hidden'>
      <Navbar />
    </div>
    <div className='md:hidden flex'>
      <MobileNavbar />
    </div>
      <HomescreenLayout />
    </>
  )
}

export default App
