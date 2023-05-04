import Home from '../pages/Home'
import ItemEditing from '../pages/ItemEditing'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Register from '../pages/Register'
import Reset from '../pages/Reset'
import Sections from '../pages/Sections'
import Today from '../pages/Today'

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset/:id', element: <Reset /> },
  { path: '*', element: <Home /> }
]

export const privateRoutes = [
  { path: '/today', element: <Today /> },
  { path: '/edit-item', element: <ItemEditing /> },
  { path: '/sections', element: <Sections /> },
  { path: '*', element: <Menu /> }
]
