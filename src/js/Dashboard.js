import logo from '../logo.svg';
import '../App.css';
import settings from '../img/settings.png';
import notification from '../img/notification.png';
import Popup from '../js/Popup';
import {useEffect, useState} from "react"
import Actions from '../js/Actions'
import RecentActivities from './RecentAcitivities';


function Dashboard(props) {
    const {isDashboardPage, setIsDashboardPage, currentUser, setCurrentUser, setIsLoginPage, users, setUsers, transaction, setTransaction, linkedAccounts, setLinkedAccounts } = props

    let balance = currentUser.wallet
    let user = currentUser.firstName + " " + currentUser.lastName
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupName, setPopupName] = useState("")
    const [popupAction, setPopupAction] = useState("")
    
    const onLogout = () => {
      setIsDashboardPage(false)
      setCurrentUser({})
      setTransaction([])
      setLinkedAccounts([])
      setIsLoginPage(true)
    }

    const onSettings = () => {

      console.log(currentUser)
      console.log(transaction)
      console.log(linkedAccounts)
    }

    const onNotif = () => {
    }

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
                <p>₱ {Number(balance).toLocaleString()}</p>
              </div>
      
              <Actions
                setOverlayVisibility = {setOverlayVisibility}
                setPopupName = {setPopupName}
                setPopupAction = {setPopupAction}
                />
            </main>

            <RecentActivities
              currentUser = {currentUser}
              linkedAccounts = {linkedAccounts}
              setLinkedAccounts = {setLinkedAccounts}
            />
      
            <div className={overlayVisiblity} id="overlay" >
              <Popup
                popupAction = {popupAction}
                popupName = {popupName}
                setOverlayVisibility = {setOverlayVisibility}
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                transaction = {transaction}
                setTransaction = {setTransaction}
                linkedAccounts = {linkedAccounts}
                setLinkedAccounts = {setLinkedAccounts}
              />
            </div>
          </div>
        );
    } else {
        return null;
    }
  }

  export default Dashboard