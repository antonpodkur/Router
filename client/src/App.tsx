import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import OpenStreetMap from './pages/Map/Map'
import { VechaiProvider } from '@vechaiui/react'
import { Theme } from './Themes'

import store from './app/store'
import { Provider } from 'react-redux'
import Login from './pages/Login'
import AuthMiddleware from './components/AuthMiddleware'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import RequireAuth from './components/RequireAuth'
import PersonalCabinet from './pages/PersonalCabinet'

function App() {

  return (
    <VechaiProvider theme={Theme} colorScheme='emerald-light'>
      <Provider store={store}>
        <AuthMiddleware>
          <BrowserRouter>
          <NavBar></NavBar>
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/map' element={<OpenStreetMap />} />
              <Route element={<RequireAuth />}> 
                <Route path='/cabinet' element={<PersonalCabinet/>} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthMiddleware>
      </Provider>
    </VechaiProvider>
  )
}

export default App
