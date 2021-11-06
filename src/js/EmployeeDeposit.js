import { useState } from "react"
import { useRef } from "react/cjs/react.development"


function EmployeeDeposit(props) {
    const {users, setUsers} = props
    const depositLastName = useRef("")
    const depositFirstName = useRef("")
    const depositUsername = useRef("")
    const depositAmount = useRef(0)


    const onAccountNumberChange = (accountNumber) => {


        function emptyInputs() {
            depositLastName.current.value = ""
            depositFirstName.current.value = ""
            depositUsername.current.value = ""
        }

        if(accountNumber.length ===6){
            let usersInversedCopy = {}
            let usernames = Object.keys(users)
            for (let i = 0; i< usernames.length; i++){
                let object = users[usernames[i]]
                let accNumber = object["accountNumber"]
                let username = object["username"]
                usersInversedCopy = {
                    ...usersInversedCopy,
                    [accNumber] : username
                }
            }
            if(accountNumber in usersInversedCopy) {
                let username = usersInversedCopy[accountNumber]
                console.log(users[username])
                depositLastName.current.value = users[username].lastName
                depositFirstName.current.value = users[username].firstName
                depositUsername.current.value = users[username].username
            } else {
                emptyInputs()
            }

        } else{
            emptyInputs()
        }
    }

    const onSubmit = (event) => {
        let username = depositUsername.current.value
        let amountTodeposit = depositAmount.current.value
        let userObject = users[username]
        let currentWallet = userObject.wallet
        setUsers(
            {
                ...users,
                [username] : {
                    ...userObject,
                    // "wallet": Number(1000)
                    "wallet": Number(currentWallet)+Number(amountTodeposit)
                }
            }
        )
    }

    return (
        <form>
            <h1> Deposit header</h1>
            <div id="addUserInputs">
                <label for="depositAccountNumber"></label>
                <input onChange={event => onAccountNumberChange(event.target.value)} type="text" id="depositAccountNumber" placeholder="Account Number"></input>
                <label for="depositUsername"></label>
                <input ref = {depositUsername} type="text" id="depositUsername" placeholder="Username"></input>
                <label for="depositFirstName"></label>
                <input ref = {depositFirstName} type="text" id="depositFirstName" placeholder="First Name"></input>
                <label for="depositAmount"></label>
                <input ref = {depositLastName} type="text" id="depositAmount" placeholder="Last Name"></input>
                <label for="depositAmount"></label>
                <input ref = {depositAmount} type="text" id="depositAmount" placeholder="Amount"></input>
            </div>
            <div id="addUserButtons">
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EmployeeDeposit