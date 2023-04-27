import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import OpenStreetMap from './pages/Map/Map'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/map' element={<OpenStreetMap />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
