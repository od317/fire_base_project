import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import { useDispatch } from 'react-redux'
import {fetchUsers} from './features/users/usersSlice'
import Nav from './components/nav/Nav'

store.dispatch(fetchUsers())

function Layout() {
  return (
    <div>
        <Provider store={store}>
             <Nav></Nav>
             <App></App>
        </Provider>
    </div>
  )
}

export default Layout
