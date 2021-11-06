import { useState } from "react"
import { useRef } from "react/cjs/react.development"

function AddUser(props){
    const {users, setUsers, usedAccountNumbers, setUsedAccountNumbers} = props

    const newUsername = useRef("")
    const newFirstName = useRef("")
    const newLastName = useRef("")
    const newPassword = useRef("")


    
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
            console.log(usedAccountNumbers)
            if(!(accountNumber in usedAccountNumbers)){
                proceed = false
            }
        }
        return accountNumber
    }


    const onSubmit = (e) => {
        e.preventDefault()
        let newAccountNumber = createAccountNumber()
        setUsedAccountNumbers([...usedAccountNumbers,newAccountNumber])
        let newUser = {
            username: newUsername.current.value,
            firstName: newFirstName.current.value,
            lastName: newLastName.current.value,
            password: newPassword.current.value,
            wallet: Number(0),
            transactions: [],
            linkedAccounts: [],
            accountNumber: newAccountNumber
        }
        setUsers({
            ...users,
            newUser
        })
        newUsername.current.value = ""
        newFirstName.current.value = ""
        newLastName.current.value = ""
        newPassword.current.value = ""
    }

    return(
        <form>
            <h1> Add a User</h1>
            <div id="addUserInputs">
                <label for="newUsername"></label>
                <input ref = {newUsername} type="text" id="newUsername" placeholder="Username"></input>
                <label for="newFirstName"></label>
                <input ref = {newFirstName} type="text" id="newFirstName" placeholder="First Name"></input>
                <label for="newLastName"></label>
                <input ref = {newLastName} type="text" id="newLastName" placeholder="Last Name"></input>
                <label for="newPassword"></label>
                <input ref = {newPassword} type="text" id="newPassword" placeholder="Password"></input>
            </div>
            <div id="addUserButtons">
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
            </div>
        </form>
    )
}
export default AddUser