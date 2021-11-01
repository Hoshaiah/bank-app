import logo from '../logo.svg';

function Signup(){
    return (

        <div id="signupdiv">
            <div id="signupCaption">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hwallet</h1>
            </div>

            <div id="newNameInput">
                <label for="newFirst"></label>
                <input type="text" id="firstName" name="firstName" placeholder="First Name"></input>
                <label for="newLast"></label>
                <input type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
            </div>

            <div id="newUserInput">
                <label for="newUsername"></label>
                <input type="text" id="newUsername" name="username" placeholder="Username"></input>
            </div>
            <div id="newpasswordInput">
                <label for="newPassword"></label>
                <input type="password" id="newPassword" name="newPassword" placeholder="Password"></input>
            </div>

            <div id="confirmpasswordInput">
                <label for="confirmPassword"></label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password"></input>
            </div>
            <div id="signupReminder">
                <p>By clicking Create Account, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
            </div>
            <div id="createAccount">
                <button id="createButton" type="submit">Create Account</button>
            </div>
        </div>
        
    )
}

export default Signup