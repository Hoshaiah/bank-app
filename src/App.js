import logo from './logo.svg';
import './App.css';

function App() {
  let color = "blue"
  let balance = 0
  let user = "Hosh"
  return (
    <div className="App">
      <nav> 
      
        <ul id="gennav">
          <img src={logo} className="App-logo" alt="logo" />
          <li>Dashboard</li>
          <li>Wallet</li>
          <li>Activity</li>
          <li>Help</li>
        </ul>
        <ul id="lognav">
          <li>Settings</li>
          <li>Notifications</li>
          <li>Log Out</li>
        </ul>
      </nav>
      <header>
          <caption>Good Evening, {user}</caption>
      </header>
      <main>
        <div id="balance">
          <h1>HoshBank Balance</h1>
          <h2>P {balance}</h2>
        </div>
      <div id= "actions">
          <div id="send"> Send</div>
          <div id="request"> Request</div>
          <div id="link">Link Bank</div>
          <div id="withdraw"> Withdraw</div>
          <div id="deposit"> Deposit</div>
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
