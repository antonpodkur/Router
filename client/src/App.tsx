import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import OpenStreetMap from './pages/Map/Map'
import { VechaiProvider } from '@vechaiui/react'
import {Theme} from './Themes'

function App() {

  return (
    <VechaiProvider theme={Theme} colorScheme='mac-light'>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/map' element={<OpenStreetMap />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </VechaiProvider>
  )
}

export default App
