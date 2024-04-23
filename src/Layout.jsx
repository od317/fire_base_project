import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import { useDispatch } from 'react-redux'
import {fetchUsers} from './features/users/usersSlice'

store.dispatch(fetchUsers())

function Layout() {


  return (
        <Provider store={store}>
             <App></App>
        </Provider>
  )
}

export default Layout
