import { useState } from "react"
import { useRef } from "react/cjs/react.development"

function EmployeeWithdraw(props) {
    const {users, setUsers, usedAccountNumbers, setPopupAction, setOverlayVisibility, adminRecords, setAdminRecords} = props
    const withdrawLastName = useRef("")
    const withdrawFirstName = useRef("")
    const withdrawUsername = useRef("")
    const withdrawAmount = useRef(0)
    const [withdrawReminder, setWithdrawReminder] = useState("")

    const onAccountNumberChange = (accountNumber) => {


        function emptyInputs() {
            withdrawLastName.current.value = ""
            withdrawFirstName.current.value = ""
            withdrawUsername.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                let username = usedAccountNumbers[accountNumber]
                console.log({withdrawFirstName,withdrawLastName,username,users})
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

    const onCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setPopupAction("")
        setWithdrawReminder("")
    }

    const onSubmit = (event) => {
        let username = withdrawUsername.current.value
        let amountToWithdraw = withdrawAmount.current.value
        if ( username === ""){
            event.preventDefault()
            setWithdrawReminder("*Account number is invalid")
        } else if (amountToWithdraw === "" || amountToWithdraw <=0 ) {
            event.preventDefault()
            setWithdrawReminder("*Amount cannot be 0 or empty")
        } else {
            let userObject = users[username]
            let currentWallet = userObject.wallet
            let currentTransaction = userObject.transactions
            let newDate = new Date()
            let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`
            let newTransaction = {
                runningBalance: Number(currentWallet)-Number(amountToWithdraw),
                transactionType: "Withdrawal",
                Amount: amountToWithdraw,
                otherAccount: {
                    bank: "Hwallet",
                    accountNumber: "Admin"
                },
                dateOfTransaction: dateOfTransaction
            }
            setUsers(
                {
                    ...users,
                    [username] : {
                        ...userObject,
                        // "wallet": Number(1000)
                        "wallet": Number(currentWallet)-Number(amountToWithdraw),
                        "transactions":[
                            ...currentTransaction,
                            newTransaction
                        ]
                    }
                }
            )
            setWithdrawReminder("")
            
            let previousTransactions = []
            if (adminRecords.transactions) {
                previousTransactions = adminRecords.transactions
            }
            setAdminRecords({
                ...adminRecords,
                transactions : [
                    ...previousTransactions,
                    {  
                        from: users[username].accountNumber,
                        to: "Hwallet",
                        transactionType: "Withdrawal",
                        Amount: amountToWithdraw,
                        dateOfTransaction: dateOfTransaction
                    }
                ]
            })

        }
    }

    return (
        <form class="popup">
            <h1> Withdraw header</h1>
            <div><p>{withdrawReminder}</p></div>
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
                <button onClick={e => onCancel(e)}type="submit">Cancel</button>
            </div>
        </form>
    )
}

export default EmployeeWithdraw