import { useState, useRef } from "react"

function EmployeeWithdraw(props) {
    const {users, setUsers, usedAccountNumbers, setPopupAction, setOverlayVisibility, adminRecords, setAdminRecords} = props
    const withdrawLastName = useRef("")
    const withdrawFirstName = useRef("")
    const withdrawUsername = useRef("")
    const withdrawAmount = useRef(0)
    const withdrawAccountNumber = useRef("")
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
        if ( username.length === 0){
            event.preventDefault()
            setWithdrawReminder("*Account number is invalid")
        } else if (amountToWithdraw === "" || amountToWithdraw <=0 ) {
            event.preventDefault()
            setWithdrawReminder("*Amount cannot be 0 or empty")
        } else if (users[username].wallet <amountToWithdraw){
            event.preventDefault()
            setWithdrawReminder("*Insufficient Balance")
        } else {
            event.preventDefault()
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
            setWithdrawReminder("Withdraw Confirmed")
            
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
            withdrawAmount.current.value = ""
            withdrawAccountNumber.current.value =""
            withdrawLastName.current.value = ""
            withdrawFirstName.current.value = ""
            withdrawUsername.current.value = ""
        }
    }

    return (
        <form id="employeePopupWithdraw">
            <div id="withdrawHeader">
                <h1> Withdraw</h1>
                <div id="withdrawReminder"><p>{withdrawReminder}</p></div>
            </div>
            {/* <div id="withdrawX">
                <button onClick={e => onCancel(e)}type="submit">X</button>
            </div> */}
            <div id="withdrawMain">
                <div id="withdrawInputDiv">
                    <label for="withdrawAccountNumber"></label>
                    <input ref={withdrawAccountNumber} onChange={event => onAccountNumberChange(event.target.value)} type="text" id="withdrawAccountNumber" placeholder="Account Number"></input>
                    <input ref = {withdrawAmount} type="number" id="withdrawAmount" placeholder="Amount"></input>
                    <button onClick={e => onSubmit(e)}type="submit">Submit</button>
                </div>
                <div id="withdrawUserInfo">
                    <label for="withdrawUsername"></label>
                    <input ref = {withdrawUsername} type="text" id="withdrawUsername" placeholder="Username" readOnly></input>
                    <label for="withdrawFirstName"></label>
                    <input ref = {withdrawFirstName} type="text" id="withdrawFirstName" placeholder="First Name" readOnly></input>
                    <label for="withdrawAmount"></label>
                    <input ref = {withdrawLastName} type="text" id="withdrawAmount" placeholder="Last Name" readOnly></input>
                    <label for="withdrawAmount"></label>
                </div>
            </div>
        </form>
    )
}

export default EmployeeWithdraw