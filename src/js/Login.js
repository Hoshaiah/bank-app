import logo from '../logo.svg';

function Login(){
    return (

        <div id="logindiv">
            <div id="loginCaption">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hwallet</h1>
            </div>
            <div id="userInput">
                <label for="username"></label>
                <input type="text" id="username" name="username" placeholder="Username"></input>
            </div>
            <div id="passwordInput">
                <label for="password"></label>
                <input type="password" name="password" placeholder="Password"></input>
            </div>
            <div id="loginForgot">
                <h2>Forgot Password?</h2>
            </div>
            <div id="loginButtons">
                <button id="signupButton" type="submit">Sign up</button>
                <button id="loginButton" type="submit">Log In</button>
            </div>
        </div>
        
    )
}

export default Login