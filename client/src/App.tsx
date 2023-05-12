import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import OpenStreetMap from './pages/Map/Map'
import { VechaiProvider } from '@vechaiui/react'
import {Theme} from './Themes'

import store from './app/store'
import { Provider } from 'react-redux'
import { Layout } from 'react-feather'
import Login from './pages/Login'

function App() {

  return (
    <VechaiProvider theme={Theme} colorScheme='mac-light'>
      <Provider store={store}>
        <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/map' element={<OpenStreetMap />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </VechaiProvider>
  )
}

export default App
