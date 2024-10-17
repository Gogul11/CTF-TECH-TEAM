import { useEffect, useMemo, useState } from 'react'
import Main from './components/main'
import Login from './components/login'
import Register from './components/register'
import Profiles from './components/prof'
import Info from './components/info'
import Myprofile from './components/myprofile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

function App() {

  

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
            <Route
              path='/'
              element = {<Main/>}
            />
            <Route
              path='/login'
              element = {<Login/>}
            />
            <Route
              path='/signup'
              element = {<Register/>}
            />
            <Route
              path='/profiles'
              element = {<Profiles/>}
            />
            <Route
              path='/profiles/info/:id'
              element = {<Info/>}
            />
            <Route
              path='/profiles/myprofile/:id'
              element = {<Myprofile/>}
            />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
