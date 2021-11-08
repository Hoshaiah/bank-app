import { useState } from "react"
import { Component, useRef } from "react/cjs/react.development"


function EmployeeTransfer(props) {
    const {users, setUsers, usedAccountNumbers, setPopupAction, setOverlayVisibility, adminRecords, setAdminRecords} = props
    const transferFromLastName = useRef("")
    const transferFromFirstName = useRef("")
    const transferFromUsername = useRef("")
    const transferToLastName = useRef("")
    const transferToFirstName = useRef("")
    const transferToUsername = useRef("")
    const transferAmount = useRef(0)
    const [transferReminder, setTransferReminder] = useState("")

    const onAccountNumberChangeFrom = (accountNumber) => {
        function emptyInputsFrom() {
            transferFromLastName.current.value = ""
            transferFromFirstName.current.value = ""
            transferFromUsername.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                let username = usedAccountNumbers[accountNumber]
                transferFromLastName.current.value = users[username].lastName
                transferFromFirstName.current.value = users[username].firstName
                transferFromUsername.current.value = users[username].username
            } else {
                emptyInputsFrom()
            }

        } else {
            emptyInputsFrom()

        }
    }

    const onAccountNumberChangeTo = (accountNumber) => {
        function emptyInputsTo() {
            transferToLastName.current.value = ""
            transferToFirstName.current.value = ""
            transferToUsername.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                let username = usedAccountNumbers[accountNumber]
                transferToLastName.current.value = users[username].lastName
                transferToFirstName.current.value = users[username].firstName
                transferToUsername.current.value = users[username].username
            } else {
                emptyInputsTo()
            }

        } else {
            emptyInputsTo()

        }
    }

    const onCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setPopupAction("")
        setTransferReminder("")
    }

    const onSubmit = (event) => {
        let amountToTransfer = transferAmount.current.value
        let usernameFrom = transferFromUsername.current.value
        let usernameTo = transferToUsername.current.value

        if ( usernameFrom === ""){
            event.preventDefault()
            setTransferReminder("*Account number from is invalid")
        } else if ( usernameTo === ""){
            event.preventDefault()
            setTransferReminder("*Account number to is invalid")
        }else if (usernameTo === ""){
            event.preventDefault()
            setTransferReminder("*Account number receiving is invalid")
        }else if (amountToTransfer === "" || amountToTransfer <=0 ) {
            event.preventDefault()
            setTransferReminder("*Amount cannot be 0 or empty")
        } else if (usernameFrom === usernameTo){
            event.preventDefault()
            setTransferReminder("*Account from cannot be the same as account to")
        } else if (users[usernameFrom].wallet < amountToTransfer){
            event.preventDefault()
            setTransferReminder("*Insufficient Balance")
        } else {
            let newDate = new Date()
            let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`

            let userObjectFrom = users[usernameFrom]
            let currentWalletFrom = userObjectFrom.wallet
            let accountNumberFrom = userObjectFrom.accountNumber
            let currentTransactionsFrom = userObjectFrom.transactions
            let newTransactionFrom = {
                runningBalance: Number(currentWalletFrom)-Number(amountToTransfer),
                transactionType: "Send",
                Amount: amountToTransfer,
                otherAccount: {
                    bank: "Hwallet (Admin)",
                    accountNumber: accountNumberFrom
                },
                dateOfTransaction: dateOfTransaction
            }

            let userObjectTo = users[usernameTo]
            let currentWalletTo = userObjectTo.wallet
            let accountNumberTo = userObjectTo.accountNumber
            let currentTransactionsTo = userObjectTo.transactions
            let newTransactionTo = {
                runningBalance: Number(currentWalletTo)+Number(amountToTransfer),
                transactionType: "Received",
                Amount: amountToTransfer,
                otherAccount: {
                    bank: "Hwallet (Admin)",
                    accountNumber: accountNumberTo
                },
                dateOfTransaction: dateOfTransaction
            }
            setUsers(
                {
                    ...users,
                    [usernameFrom] : {
                        ...userObjectFrom,
                        "wallet": Number(currentWalletFrom)-Number(amountToTransfer),
                        "transactions": [
                            ...currentTransactionsFrom,
                            newTransactionFrom
                        ]
                    },
                    [usernameTo] : {
                        ...userObjectTo,
                        "wallet": Number(currentWalletTo)+Number(amountToTransfer),
                        "transactions": [
                            ...currentTransactionsTo,
                            newTransactionTo
                        ]
                    }
                }
            )
            setTransferReminder("")

            let previousTransactions = []
            if (adminRecords.transactions) {
                previousTransactions = adminRecords.transactions
            }
            setAdminRecords({
                ...adminRecords,
                transactions : [
                    ...previousTransactions,
                    {  
                        from: users[usernameFrom].accountNumber,
                        to: users[usernameTo].accountNumber,
                        transactionType: "Transfer",
                        Amount: amountToTransfer,
                        dateOfTransaction: dateOfTransaction
                    }
                ]
            })
        }
    }
    return (
        <form class="popup">
            <h1> Transfer header</h1>
            <div><p>{transferReminder}</p></div>
            <div id="addUserInputs">
                <label for="transferFromAccountNumber"></label>
                <input onChange={event => onAccountNumberChangeFrom(event.target.value)} type="text" id="transferFromAccountNumber" placeholder="Account Number"></input>
                <label for="transferFromUsername"></label>
                <input ref = {transferFromUsername} type="text" id="transferFromUsername" placeholder="Username"></input>
                <label for="transferFromFirstName"></label>
                <input ref = {transferFromFirstName} type="text" id="transferFromFirstName" placeholder="First Name"></input>
                <label for="transferFromAmount"></label>
                <input ref = {transferFromLastName} type="text" id="transferFromAmount" placeholder="Last Name"></input>
            </div>
            <div id="addUserInputs">
                <label for="transferToAccountNumber"></label>
                <input onChange={event => onAccountNumberChangeTo(event.target.value)} type="text" id="transferToAccountNumber" placeholder="Account Number"></input>
                <label for="transferToUsername"></label>
                <input ref = {transferToUsername} type="text" id="transferToUsername" placeholder="Username"></input>
                <label for="transferToFirstName"></label>
                <input ref = {transferToFirstName} type="text" id="transferToFirstName" placeholder="First Name"></input>
                <label for="transferToAmount"></label>
                <input ref = {transferToLastName} type="text" id="transferToAmount" placeholder="Last Name"></input>
            </div>
            <label for="transferFromAmount"></label>
            <input ref = {transferAmount} type="text" id="transferAmount" placeholder="Amount"></input>
            <div id="addUserButtons">
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
                <button onClick={e => onCancel(e)}type="submit">Cancel</button>
            </div>
        </form>
    )
}

export default EmployeeTransfer