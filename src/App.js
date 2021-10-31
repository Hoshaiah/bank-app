import logo from './logo.svg';
import './App.css';
import settings from './img/settings.png';
import notification from './img/notification.png';
import Popup from './js/Popup';
import {useState} from "react"
import Actions from './js/Actions'
import Dashboard from './js/Dashboard'

function App() {
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
    <Dashboard/>
  );
}

export default App;
