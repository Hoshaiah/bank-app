import { useState } from 'react';
import logo from '../logo.svg';

function Login(props){
    const {isLoginPage, users, setCurrentUser, setIsLoginPage, setIsDashboardPage, setIsSignupPage} = props
    const usernameObject = useState("")
    const passwordObject = useState("")

    const onLoginClick = () => {

        const username = usernameObject.current.value
        const password = passwordObject.current.value
        console.log(users)
        if (username in users){
            if(password === users[username].password){
                setCurrentUser(users[username])
                setIsLoginPage(false)
                setIsDashboardPage(true)
            }
        } 

    } 

    const onSignupClick = () => {
        setIsLoginPage(false)
        setIsSignupPage(true)
    }

    if (isLoginPage){
        return (
            <div id="logindiv">
                <div id="loginCaption">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Hwallet</h1>
                </div>
                <div id="userInput">
                    <label for="username"></label>
                    <input ref={usernameObject} type="text" id="username" name="username" placeholder="Username"></input>
                </div>
                <div id="passwordInput">
                    <label for="password"></label>
                    <input ref={passwordObject} type="password" name="password" placeholder="Password"></input>
                </div>
                <div id="loginForgot">
                    <h2>Forgot Password?</h2>
                </div>
                <div id="loginButtons">
                    <button onClick={onSignupClick} id="signupButton" type="submit">Sign up</button>
                    <button onClick={onLoginClick} id="loginButton" type="submit">Log In</button>
                </div>
            </div>
            
        )
    } else {
        return null;
    }
}

export default Login