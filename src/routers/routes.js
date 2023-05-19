import Home from '../pages/Home'
import ItemEditing from '../pages/ItemEditing'
import ItemId from '../pages/ItemId'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Register from '../pages/Register'
import Reset from '../pages/Reset'
import Sections from '../pages/Sections'
import Today from '../pages/Today'
import Value from '../pages/Value'
import ValueId from '../pages/ValueId'

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset/:id', element: <Reset /> },
  { path: '*', element: <Home /> }
]

export const privateRoutes = [
  { path: '/edit-item/', element: <ItemEditing /> },
  { path: '/edit-item/:id', element: <ItemEditing /> },
  { path: '/items/:id', element: <ItemId />},
  { path: '/sections', element: <Sections /> },
  { path: '/today', element: <Today /> },
  { path: '/values/:id/:itemTitle', element: <ValueId />},
  { path: '/value/:itemId/:itemTitle', element: <Value />},
  { path: '*', element: <Menu /> }
]
