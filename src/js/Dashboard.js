import logo from '../logo.svg';
import '../App.css';
import settings from '../img/settings.png';
import notification from '../img/notification.png';
import Popup from '../js/Popup';
import {useEffect, useState} from "react"
import Actions from '../js/Actions'


function Dashboard(props) {
    const {isDashboardPage, setIsDashboardPage, currentUser, setCurrentUser, setIsLoginPage, users, setUsers } = props

    let balance = currentUser.wallet
    let user = currentUser.firstName + " " + currentUser.lastName
  
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupName, setPopupName] = useState("")
    const [popupAction, setPopupAction] = useState("")
    const [transaction, setTransaction] = useState([])

    useEffect(()=>{
      setCurrentUser({
        ...currentUser,
        transactions: transaction
      })
    },[transaction])

    const onCancelClick = () => {
      setOverlayVisibility("hidden")
    }
  
    const onSubmitClick = () => {
      setOverlayVisibility("hidden")
    }
    
    const onLogout = () => {
      setIsDashboardPage(false)
      setCurrentUser({})
      setIsLoginPage(true)
    }

    const onSettings = () => {

      console.log(currentUser)
    }

    const onNotif = () => {
      let username = currentUser.username
      setUsers({
        ...users,
      Hoshaiah14: currentUser})
      console.log(users[username])
    }
    // useEffect(()=>{
    //   let username = currentUser.username
    //   setUsers({
    //     ...users,
    //     username: currentUser
    //   })
    // })

    if (isDashboardPage){
        return (
          <div className="App">
            <nav> 
            
              <ul id="gennav">
                <img src={logo} className="App-logo" alt="logo" />
                <li id="dashboard">Dashboard</li>
                <li>Wallet</li>
                <li>Activity</li>
                <li>Help</li>
              </ul>
              <ul id="lognav">
                <li onClick={onNotif}><img id="notification" src={notification} alt=""></img></li>
                <li onClick={onSettings}><img id="settings" src= {settings} alt="" ></img></li>
                <li onClick={onLogout} id="logout">Log Out</li>
              </ul>
            </nav>
            <header>
                <caption>Good Evening, {user}</caption>
            </header>
      
            <main>
              <div id="balance">
                <h1>Balance</h1>
                <p>₱ {balance}</p>
              </div>
      
              <Actions
                setOverlayVisibility = {setOverlayVisibility}
                setPopupName = {setPopupName}
                setPopupAction = {setPopupAction}
              />
      
              <div id="recentActivity">
                <h1>Recent Activity</h1>
                <div id ="recentActivites"></div>
              </div>
      
              <div className={overlayVisiblity} id="overlay" >
                <Popup
                  popupAction = {popupAction}
                  popupName = {popupName}
                  setOverlayVisibility = {setOverlayVisibility}
                  setCurrentUser = {setCurrentUser}
                  currentUser = {currentUser}
                  transaction = {transaction}
                  setTransaction = {setTransaction}
                />
              </div>
            </main>
          </div>
        );
    } else {
        return null;
    }
  }

  export default Dashboard