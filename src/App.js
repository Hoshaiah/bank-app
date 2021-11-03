import { useState } from 'react/cjs/react.development';
import './App.css';
import Dashboard from './js/Dashboard'
import Login from './js/Login';
import Signup from './js/Signup';


function App() {
  const [users, setUsers] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  const [isLoginPage, setIsLoginPage] = useState(true)
  const [isSignupPage, setIsSignupPage] = useState(false)
  const [isDashboardPage, setIsDashboardPage] = useState(false)
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
