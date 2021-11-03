import { useRef , useState} from 'react';
import logo from '../logo.svg';

function Signup(props){

    const {setIsSignupPage, isSignupPage, setIsLoginPage, users, setUsers} = props

    const inputFirstName = useRef("")
    const inputLastName = useRef("")
    const inputNewUserName = useRef("")
    const inputNewPassword = useRef("")
    const inputConfirmPassword = useRef("")
    const [signupReminder, setSignupReminder] = useState("")

    const onCreateAccount = (event) => {
        let username = inputNewUserName.current.value
        let confirmPassword = inputConfirmPassword.current.value
        let password = inputNewPassword.current.value
        let firstName = inputFirstName.current.value
        let lastName = inputLastName.current.value

        if (username === "") {
            setSignupReminder("*Username is required")
            event.preventDefault()
        } else if (firstName === ""){
            setSignupReminder("*First name is required")
            event.preventDefault()
        } else if (lastName === ""){
            setSignupReminder("*Last name is required")
            event.preventDefault()
        } else if (password === ""){
            setSignupReminder("*Password is required")
            event.preventDefault()
        } else if (confirmPassword === ""){
            setSignupReminder("*Confirm password is required")
            event.preventDefault()
        } else if (password !== confirmPassword){
            setSignupReminder("*Confirm password does not match password")
            event.preventDefault()
        } else if (username in users) {
            setSignupReminder("*Username is already taken")
            event.preventDefault()
        } else {
            setSignupReminder("")
            let userData = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                wallet: Number(0),
                transactions: []
            }
    
    
            setUsers(
                {   ...users,
                    [username]: userData
                }
            )
            setIsSignupPage(false)
            setIsLoginPage(true)
        }        
    }
    
    const onBacktoLogin = () => {
        setSignupReminder("")
        setIsSignupPage(false)
        setIsLoginPage(true)
    }

    if (isSignupPage){
        return (
                <form id="signupdiv">
                    <div id="signupCaption">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Hwallet</h1>
                    </div>

                    <div id="missingSignupReminder">
                        <p>{signupReminder}</p>
                    </div>

                    <div id="newNameInput">
                        <label for="newFirst"></label>
                        <input ref={inputFirstName} type="text" id="firstName" name="firstName" placeholder="First Name" required></input>
                        <label for="newLast"></label>
                        <input ref={inputLastName} type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
                    </div>
        
                    <div id="newUserInput">
                        <label for="newUsername"></label>
                        <input ref={inputNewUserName} type="text" id="newUsername" name="username" placeholder="Username" required></input>
                    </div>
                    <div id="newpasswordInput">
                        <label for="newPassword"></label>
                        <input ref={inputNewPassword} type="password" id="newPassword" name="newPassword" placeholder="Password" required></input>
                    </div>
        
                    <div id="confirmpasswordInput">
                        <label for="confirmPassword"></label>
                        <input ref={inputConfirmPassword} type="password" name="confirmPassword" placeholder="Confirm Password" required></input>
                    </div>
                    <div id="signupReminder">
                        <p>By clicking Create Account, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
                    </div>
                    <div id="createAccount">
                        <button onClick={onCreateAccount} id="createButton" type="submit">Create Account</button>
                        <button onClick={onBacktoLogin} id="backlogin" type="submit"> Back to Log In</button>
                    </div>
                </form>
            
        )
    } else {
        return null
    }
}

export default Signup