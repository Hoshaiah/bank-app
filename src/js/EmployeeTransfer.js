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
    const transferFromAccountNumber = useRef("")
    const transferToAccountNumber = useRef("")
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
            event.preventDefault()
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
            setTransferReminder("Transfer Confirmed")

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

            transferFromLastName.current.value = ""
            transferFromFirstName.current.value = ""
            transferFromUsername.current.value = ""
            transferToLastName.current.value = ""
            transferToFirstName.current.value = ""
            transferToUsername.current.value = ""
            transferAmount.current.value = ""
            transferToAccountNumber.current.value = ""
            transferFromAccountNumber.current.value = ""
        }
    }
    return (
        <form id="employeePopupTransfer">
            <div id="transferHeader">
                <h1>Transfer</h1>
                <div id="transferReminder"><p>{transferReminder}</p></div>
            </div>
            {/* <div id="transferX">
                <button onClick={e => onCancel(e)}type="submit">X</button>
            </div> */}
            <div id="transferMain">
                <div id="transferInputs">
                    <label for="transferFromAccountNumber"></label>
                    <input ref={transferFromAccountNumber}onChange={event => onAccountNumberChangeFrom(event.target.value)} type="text" id="transferFromAccountNumber" placeholder="Account Number From"></input>
                    <label for="transferToAccountNumber"></label>
                    <input ref={transferToAccountNumber} onChange={event => onAccountNumberChangeTo(event.target.value)} type="text" id="transferToAccountNumber" placeholder="Account Number To"></input>
                    <label for="transferFromAmount"></label>
                    <input ref = {transferAmount} type="number" id="transferAmount" placeholder="Amount"></input>
                    <button onClick={e => onSubmit(e)}type="submit">Submit</button>
                </div>

                <div id="transferInfos">
                    <div id="transferInfoFrom">
                        <label for="transferFromUsername"></label>
                        <input ref = {transferFromUsername} type="text" id="transferFromUsername" placeholder="Username from" readOnly></input>
                        <label for="transferFromFirstName"></label>
                        <input ref = {transferFromFirstName} type="text" id="transferFromFirstName" placeholder="First Name from" readOnly></input>
                        <label for="transferFromLastName"></label>
                        <input ref = {transferFromLastName} type="text" id="transferFromLastName" placeholder="Last Name from" readOnly></input>
                    </div>
                    <div id="transferInfoTo">
                        <label for="transferToUsername"></label>
                        <input ref = {transferToUsername} type="text" id="transferToUsername" placeholder="Username to" readOnly></input>
                        <label for="transferToFirstName"></label>
                        <input ref = {transferToFirstName} type="text" id="transferToFirstName" placeholder="First Name to" readOnly></input>
                        <label for="transferToAmount"></label>
                        <input ref = {transferToLastName} type="text" id="transferToAmount" placeholder="Last Name to" readOnly></input>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EmployeeTransfer