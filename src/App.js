import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './App.css';
import Dashboard from './js/Dashboard'
import Login from './js/Login';
import Signup from './js/Signup';


function App() {

  const localStorageUsers = localStorage.getItem("users")
  let userData = {}
  if(localStorageUsers) {
    userData = JSON.parse(localStorageUsers)
  }

  const [users, setUsers] = useState(userData)
  const [currentUser, setCurrentUser] = useState({})

  const [isLoginPage, setIsLoginPage] = useState(true)
  const [isSignupPage, setIsSignupPage] = useState(false)
  const [isDashboardPage, setIsDashboardPage] = useState(false)


  useEffect(()=>{
    console.log(users)
    localStorage.setItem("users",JSON.stringify(users))
  },[users])

  useEffect(()=>{
    let username = currentUser.username
    setUsers({
      ...users,
      [username] : currentUser
    })
  },[currentUser])
  return (
    <>
      <Dashboard
        isDashboardPage = {isDashboardPage}
        setIsDashboardPage = {setIsDashboardPage}
        currentUser = {currentUser}
        setCurrentUser = {setCurrentUser}
        setIsLoginPage = {setIsLoginPage}
        setUsers = {setUsers}
        users = {users}
        
      />
      <Login
        isLoginPage = {isLoginPage}
        users = {users}
        setCurrentUser = {setCurrentUser}
        setIsLoginPage = {setIsLoginPage}
        setIsDashboardPage = {setIsDashboardPage}
        setIsSignupPage = {setIsSignupPage}
        currentUser = {currentUser}
      />
      <Signup
        isSignupPage = {isSignupPage}
        setIsSignupPage = {setIsSignupPage}
        setIsLoginPage = {setIsLoginPage}
        users = {users}
        setUsers = {setUsers}
      />
    </>
  );
}

export default App;
