import { useState } from "react"
import { useRef } from "react/cjs/react.development"

function AddUser(props){
    const {users, setUsers, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails} = props

    const newUsername = useRef("")
    const newEmail = useRef("")
    const newFirstName = useRef("")
    const newLastName = useRef("")
    const newPassword = useRef("")
    const newInitialBalance = useRef(0)
    const [addUserReminder, setAddUserReminder] = useState("")

    
    const createAccountNumber = () => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let proceed = true;
        let accountNumber = ""
        for (let i=0; proceed; i++){
            let a = getRandomInt(1,9)
            let b = getRandomInt(1,9)
            let c = getRandomInt(1,9)
            let d = getRandomInt(1,9)
            accountNumber = `00${a}${b}${c}${d}`
            if(!(accountNumber in usedAccountNumbers)){
                proceed = false
            }
        }
        return accountNumber
    }


    const onSubmit = (e) => {
        let username = newUsername.current.value
        let email = newEmail.current.value
        let password = newPassword.current.value
        let firstName = newFirstName.current.value
        let lastName = newLastName.current.value
        let initialBalance = newInitialBalance.current.value

        if (username.length === 0){
            e.preventDefault()
            setAddUserReminder("*Username is required")
        } else if (email.length ===0) {
            e.preventDefault()
            setAddUserReminder("*Email address is required")
        } else if (firstName.length ===0){
            e.preventDefault()
            setAddUserReminder("*First name is required")
        } else if (lastName.length ===0) {
            e.preventDefault()
            setAddUserReminder("*Last name is required")
        } else if (password.length === 0 ) {
            e.preventDefault()
            setAddUserReminder ("*Password is required")
        } else if (initialBalance <0 || initialBalance === "") {
            e.preventDefault()
            setAddUserReminder("*Initial balance must be zero or higher")
        } else if (username in users) {
            e.preventDefault()
            setAddUserReminder("*Username is already taken")
        }  else if (email in usedEmails) {
            e.preventDefault()
            setAddUserReminder("*Email address is already taken")
        } else {
            let newAccountNumber = createAccountNumber()
            setUsedAccountNumbers({
                ...usedAccountNumbers,
                [newAccountNumber] : username
            })
            setUsedEmails({
                ...usedEmails,
                [email]: username
            })

            let newUser = {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                wallet: Number(initialBalance),
                transactions: [],
                linkedAccounts: [],
                accountNumber: newAccountNumber,
                expenses: {}
            }
            setUsers({
                ...users,
                [username]: newUser
            })
            setAddUserReminder("")
            newUsername.current.value = ""
            newFirstName.current.value = ""
            newLastName.current.value = ""
            newPassword.current.value = ""
            newInitialBalance.current.value = ""
            newEmail.current.value = ""
        }

    }

    return(
        <form>
            <h1> Add a User</h1>
            <div><p>{addUserReminder}</p></div>
            <div id="addUserInputs">
                <label for="newUsername"></label>
                <input ref = {newUsername} type="text" id="newUsername" placeholder="Username"></input>
                <label for="newFirstName"></label>
                <input ref = {newEmail} type="text" id="newEmail" placeholder="Email Address"></input>
                <label for="newFirstName"></label>
                <input ref = {newFirstName} type="text" id="newFirstName" placeholder="First Name"></input>
                <label for="newLastName"></label>
                <input ref = {newLastName} type="text" id="newLastName" placeholder="Last Name"></input>
                <label for="newPassword"></label>
                <input ref = {newPassword} type="text" id="newPassword" placeholder="Password"></input>
                <label for="newInitialBalance"></label>
                <input ref = {newInitialBalance} type="number" id="newInitialBalance" placeholder="Initial Balance"></input>
            </div>
            <div id="addUserButtons">
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
            </div>
        </form>
    )
}
export default AddUser