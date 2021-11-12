import { useState } from 'react';
import logo from '../logo.svg';
import Footer from './Footer';
function Login(props){
    const {isLoginPage, users, setCurrentUser, setIsLoginPage, setIsDashboardPage, setIsSignupPage, setIsEmployeePage} = props
    const usernameObject = useState("")
    const passwordObject = useState("")
    const [loginReminder, setLoginReminder] = useState("")

    const onLoginClick = (event) => {
        const username = usernameObject.current.value
        const password = passwordObject.current.value

        if (username==="") {
            setLoginReminder("*Username is not filled")
        } else if (password === ""){
            setLoginReminder("*Password is not filled")
        } else if (username in users){
            if(password === users[username].password){
                setLoginReminder("")
                setCurrentUser(users[username])
                setIsLoginPage(false)
                setIsDashboardPage(true)
            } else {
                event.preventDefault()
                setLoginReminder("*Username or password is incorrect")
            }
        } else {
            event.preventDefault()
            setLoginReminder("*Username or password is incorrect")
        }
    } 

    const onSignupClick = (event) => {
        event.preventDefault()
        setLoginReminder("")
        setIsLoginPage(false)
        setIsSignupPage(true)
    }

    const onEmployeePage = (event) => {
        event.preventDefault()
        setIsLoginPage(false)
        setIsEmployeePage(true)
    }

    if (isLoginPage){
        return (
            <form id="logindiv">
                <div id="loginCaption">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Hwallet</h1>
                </div>

                <div id="missingLoginReminder">
                        <p>{loginReminder}</p>
                </div>

                <div id="userInput">
                    <label for="username"></label>
                    <input ref={usernameObject} type="text" id="username" name="username" placeholder="Username" required></input>
                </div>
                <div id="passwordInput">
                    <label for="password"></label>
                    <input ref={passwordObject} type="password" name="password" placeholder="Password" required></input>
                </div>
                <div id="loginForgot">
                    <h2>Forgot Password?</h2>
                </div>
                <div id="loginButtons">
                    <button onClick={onSignupClick} id="signupButton" type="submit">Sign up</button>
                    <button onClick={onLoginClick} id="loginButton" type="submit">Log In</button>
                </div>
                <p id="adminButton" onClick={onEmployeePage}>Admin</p>
                <Footer/>

            </form>
            
        )
    } else {
        return null;
    }
}

export default Login