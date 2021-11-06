import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './App.css';
import Dashboard from './js/Dashboard'
import Login from './js/Login';
import Signup from './js/Signup';
import Employee from './js/Employee';


function App() {

  const localStorageUsers = localStorage.getItem("users")
  let userData = {}
  if(localStorageUsers) {
    userData = JSON.parse(localStorageUsers)
  }

  const localStorageCurrentUser = localStorage.getItem("currentUser")
  let currentUserData = {}
  if(localStorageCurrentUser) {
    currentUserData = JSON.parse(localStorageCurrentUser)
  }

  const localStorageUsedAccountNumbers = localStorage.getItem("usedAccountNumbers")
  let usedAccountNumbersData = []
  if(localStorageUsedAccountNumbers) {
    usedAccountNumbersData = JSON.parse(localStorageUsedAccountNumbers)
  }


  const isPageData = sessionStorage.getItem("isPageData")
  let pagesStatus = {
    isLoginPage: true,
    isSignupPage:false,
    isDashboardPage: false,
    isEmployeePage: false
  }
  if(isPageData) {
    const pageData = JSON.parse(isPageData)
    pagesStatus.isLoginPage = pageData.isLoginPage
    pagesStatus.isDashboardPage = pageData.isDashboardPage
    pagesStatus.isSignupPage = pageData.isSignupPage
  }




  const [users, setUsers] = useState(userData)
  const [currentUser, setCurrentUser] = useState(currentUserData)
  const [transaction, setTransaction] = useState(currentUserData?.["transactions"] || [])
  const [linkedAccounts, setLinkedAccounts] = useState(currentUserData?.["linkedAccounts"] || [])
  const [usedAccountNumbers, setUsedAccountNumbers] = useState(usedAccountNumbersData)

  const [isLoginPage, setIsLoginPage] = useState(pagesStatus.isLoginPage)
  const [isSignupPage, setIsSignupPage] = useState(pagesStatus.isSignupPage)
  const [isDashboardPage, setIsDashboardPage] = useState(pagesStatus.isDashboardPage)
  const [isEmployeePage, setIsEmployeePage] = useState(pagesStatus.isEmployeePage)


  useEffect(()=>{
    localStorage.setItem("users",JSON.stringify(users))
  },[users])

  useEffect(()=>{
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
  },[currentUser])

  
  useEffect(()=>{
    localStorage.setItem("usedAccountNumbers",JSON.stringify(usedAccountNumbers))
  },[usedAccountNumbers])

  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      transactions: transaction
    })
  },[transaction])


  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
    linkedAccounts: linkedAccounts
    })
  },[linkedAccounts])





  useEffect(()=>{
    let data = {
      isLoginPage: isLoginPage,
      isSignupPage: isSignupPage,
      isDashboardPage: isDashboardPage
    }
    sessionStorage.setItem("isPageData", JSON.stringify(data))
  },[isSignupPage, isLoginPage, isDashboardPage])


  useEffect(()=>{
    let username = currentUser.username
    setUsers({
      ...users,
      [username] : currentUser
    })
  },[currentUser])

  


  return (
    <>
      <Employee
        isEmployeePage = {isEmployeePage}
        setIsEmployeePage = {setIsEmployeePage}
        currentUser = {currentUser}
        setCurrentUser = {setCurrentUser}
        setUsers = {setUsers}
        users = {users}
        setIsLoginPage = {setIsLoginPage}
        usedAccountNumbers = {usedAccountNumbers}
        setUsedAccountNumbers = {setUsedAccountNumbers}
      />

      <Dashboard
        isDashboardPage = {isDashboardPage}
        setIsDashboardPage = {setIsDashboardPage}
        currentUser = {currentUser}
        setCurrentUser = {setCurrentUser}
        setIsLoginPage = {setIsLoginPage}
        setUsers = {setUsers}
        users = {users}
        transaction = {transaction}
        setTransaction = {setTransaction}
        linkedAccounts = {linkedAccounts}
        setLinkedAccounts = {setLinkedAccounts}
        
      />
      <Login
        isLoginPage = {isLoginPage}
        users = {users}
        setCurrentUser = {setCurrentUser}
        setIsLoginPage = {setIsLoginPage}
        setIsDashboardPage = {setIsDashboardPage}
        setIsSignupPage = {setIsSignupPage}
        currentUser = {currentUser}
        setIsEmployeePage = {setIsEmployeePage}

      />
      <Signup
        isSignupPage = {isSignupPage}
        setIsSignupPage = {setIsSignupPage}
        setIsLoginPage = {setIsLoginPage}
        users = {users}
        setUsers = {setUsers}
        usedAccountNumbers = {usedAccountNumbers}
        setUsedAccountNumbers = {setUsedAccountNumbers}
      />
    </>
  );
}

export default App;
