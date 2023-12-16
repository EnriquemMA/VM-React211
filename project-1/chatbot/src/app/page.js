"use client"
import { Provider } from 'react-redux'
import store from '../store'
import AuthenticateUser from '../AuthenticateUser'

export default function Home() {
  return (
    <Provider store={store}>    
      <AuthenticateUser />      
    </Provider>
  )
}