import logo from './logo.svg';
import './App.css';
import settings from './img/settings.png';
import notification from './img/notification.png';
import send from './img/send.png';
import deposit from './img/deposit.png';
import bank from './img/bank.png';
import withdraw from './img/withdraw.png';
import request from './img/request.png';


function App() {
  let color = "blue"
  let balance = 100
  let user = "Hosh"
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
      <div id= "actions">
          <div id="send"> <div id="senddiv"> <img src={send} alt=""></img> </div>Send</div>
          <div id="request"> <div id="requestdiv"> <img src={request} alt=""></img> </div> Request</div>
          <div id="link"> <div id="bankdiv"> <img src={bank} alt=""></img> </div>Link Bank</div>
          <div id="withdraw"> <div id="withdrawdiv"> <img src={withdraw} alt=""></img> </div> Withdraw</div>
          <div id="deposit"> <div id="depositdiv"> <img src={deposit} alt=""></img> </div> Deposit</div>
      </div>
      <div id="recentActivity">
        <h1>Recent Activity</h1>
        <div id ="recentActivites"></div>
      </div>
      </main>



    </div>
  );
}

export default App;
