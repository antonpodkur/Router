import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import OpenStreetMap from './pages/Map/Map'
import { VechaiProvider } from '@vechaiui/react'
import {Theme} from './Themes'

import store from './app/store'
import { Provider } from 'react-redux'
import Login from './pages/Login'
import AuthMiddleware from './components/AuthMiddleware'
import Register from './pages/Register'

function App() {

  return (
    <VechaiProvider theme={Theme} colorScheme='mac-light'>
      <Provider store={store}>
        <AuthMiddleware>
          <BrowserRouter> 
            <Routes>
              <Route path='/' element={<Welcome/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/map' element={<OpenStreetMap />} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </BrowserRouter>
        </AuthMiddleware>
      </Provider>
    </VechaiProvider>
  )
}

export default App
