import { getDefaultNormalizer } from "@testing-library/dom"
import { useState } from "react"
import { unstable_renderSubtreeIntoContainer } from "react-dom"
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development"
import { Component, useEffect, useRef } from "react/cjs/react.development"


function EmployeeWithdraw(props) {
    const {users, setUsers} = props
    const [withdrawAccountNumber, setWithdrawAccountNumber] = useState("")
    const withdrawLastName = useRef("")
    const withdrawFirstName = useRef("")
    const withdrawUsername = useRef("")
    const withdrawAmount = useRef(0)


    const onAccountNumberChange = (accountNumber) => {


        function emptyInputs() {
            withdrawLastName.current.value = ""
            withdrawFirstName.current.value = ""
            withdrawUsername.current.value = ""
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
                withdrawLastName.current.value = users[username].lastName
                withdrawFirstName.current.value = users[username].firstName
                withdrawUsername.current.value = users[username].username
            } else {
                emptyInputs()
            }

        } else{
            emptyInputs()
        }
    }

    const onSubmit = (event) => {
        let username = withdrawUsername.current.value
        let amountToWithdraw = withdrawAmount.current.value
        let userObject = users[username]
        let currentWallet = userObject.wallet
        setUsers(
            {
                ...users,
                [username] : {
                    ...userObject,
                    // "wallet": Number(1000)
                    "wallet": Number(currentWallet)-Number(amountToWithdraw)
                }
            }
        )
    }

    return (
        <form>
            <h1> Withdraw header</h1>
            <div id="addUserInputs">
                <label for="withdrawAccountNumber"></label>
                <input onChange={event => onAccountNumberChange(event.target.value)} type="text" id="withdrawAccountNumber" placeholder="Account Number"></input>
                <label for="withdrawUsername"></label>
                <input ref = {withdrawUsername} type="text" id="withdrawUsername" placeholder="Username"></input>
                <label for="withdrawFirstName"></label>
                <input ref = {withdrawFirstName} type="text" id="withdrawFirstName" placeholder="First Name"></input>
                <label for="withdrawAmount"></label>
                <input ref = {withdrawLastName} type="text" id="withdrawAmount" placeholder="Last Name"></input>
                <label for="withdrawAmount"></label>
                <input ref = {withdrawAmount} type="text" id="withdrawAmount" placeholder="Amount"></input>
            </div>
            <div id="addUserButtons">
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EmployeeWithdraw