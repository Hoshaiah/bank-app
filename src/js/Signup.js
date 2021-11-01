import { useRef } from 'react';
import logo from '../logo.svg';

function Signup(props){

    const {setIsSignupPage, isSignupPage, setIsLoginPage, users, setUsers} = props

    const inputFirstName = useRef("")
    const inputLastName = useRef("")
    const inputNewUserName = useRef("")
    const inputNewPassword = useRef("")
    const inputConfirmPassword = useRef("")

    const onCreateAccount = () => {
        let username = inputNewUserName.current.value
        let userData = {
            firstName: inputFirstName.current.value,
            lastName: inputLastName.current.value,
            password: inputNewPassword.current.value,
            wallet: 0
        }
        setUsers(
            {   ...users,
                [username]: userData
            }
        )
        setIsSignupPage(false)
        setIsLoginPage(true)
    }
    
    const onBacktoLogin = () => {
        setIsSignupPage(false)
        setIsLoginPage(true)
    }


    if (isSignupPage){
        return (
            <div id="signupdiv">
                <div id="signupCaption">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Hwallet</h1>
                </div>
    
                <div id="newNameInput">
                    <label for="newFirst"></label>
                    <input ref={inputFirstName} type="text" id="firstName" name="firstName" placeholder="First Name"></input>
                    <label for="newLast"></label>
                    <input ref={inputLastName} type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
                </div>
    
                <div id="newUserInput">
                    <label for="newUsername"></label>
                    <input ref={inputNewUserName} type="text" id="newUsername" name="username" placeholder="Username"></input>
                </div>
                <div id="newpasswordInput">
                    <label for="newPassword"></label>
                    <input ref={inputNewPassword} type="password" id="newPassword" name="newPassword" placeholder="Password"></input>
                </div>
    
                <div id="confirmpasswordInput">
                    <label for="confirmPassword"></label>
                    <input ref={inputConfirmPassword} type="password" name="confirmPassword" placeholder="Confirm Password"></input>
                </div>
                <div id="signupReminder">
                    <p>By clicking Create Account, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
                </div>
                <div id="createAccount">
                    <button onClick={onCreateAccount} id="createButton" type="submit">Create Account</button>
                    <button onClick={onBacktoLogin} id="backlogin" type="submit"> Back to Log In</button>
                </div>
            </div>
            
        )
    } else {
        return null
    }
}

export default Signup