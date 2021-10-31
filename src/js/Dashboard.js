import logo from '../logo.svg';
import '../App.css';
import settings from '../img/settings.png';
import notification from '../img/notification.png';
import Popup from '../js/Popup';
import {useState} from "react"
import Actions from '../js/Actions'


function Dashboard() {
    let balance = 100
    let user = "Hosh"
  
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupName, setPopupName] = useState("")
    const [popupInputs, setPopupInputs] = useState([])
  
  
    const onCancelClick = () => {
      setOverlayVisibility("hidden")
    }
  
    const onSubmitClick = () => {
      setOverlayVisibility("hidden")
    }
  
  
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
            <li><img id="notification" src={notification} alt=""></img></li>
            <li><img id="settings" src= {settings} alt="" ></img></li>
            <li id="logout">Log Out</li>
          </ul>
        </nav>
        <header>
            <caption>Good Evening, {user}</caption>
        </header>
  
        <main>
          <div id="balance">
            <h1>Main Wallet</h1>
            <p>₱ {balance}</p>
          </div>
  
          <Actions
            setOverlayVisibility = {setOverlayVisibility}
            setPopupInputs = {setPopupInputs}
            setPopupName = {setPopupName}
          />
  
          <div id="recentActivity">
            <h1>Recent Activity</h1>
            <div id ="recentActivites"></div>
          </div>
  
          <div className={overlayVisiblity} id="overlay" >
            <Popup
            onCancelClick = {onCancelClick}
            onSubmitClick = {onSubmitClick}
            popupName = {popupName}
            popupInputs = {popupInputs}/>
          </div>
        </main>
      </div>
    );
  }

  export default Dashboard