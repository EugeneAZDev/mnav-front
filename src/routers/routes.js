import Export from '../pages/Export'
import Home from '../pages/Home'
import Import from '../pages/Import'
import ItemEditing from '../pages/ItemEditing'
import Item from '../pages/Item'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Register from '../pages/Register'
import Reset from '../pages/Reset'
import Sections from '../pages/Sections'
import Today from '../pages/Today'
import Value from '../pages/Value'

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset/:id', element: <Reset /> },
  { path: '*', element: <Home /> }
]

export const privateRoutes = [
  { path: '/edit-item', element: <ItemEditing /> },
  { path: '/edit-item/:id', element: <ItemEditing /> },
  { path: '/export', element: <Export /> },
  { path: '/import', element: <Import /> },
  { path: '/items/:id', element: <Item />},
  { path: '/sections', element: <Sections /> },
  { path: '/today', element: <Today /> },
  { path: '/values/:itemId/:itemTitle/:valueType', element: <Value />},
  { path: '/values/value/:itemId/:itemTitle/:valueType/:valueId', element: <Value />},
  { path: '*', element: <Menu /> }
]
