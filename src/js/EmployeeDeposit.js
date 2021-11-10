import { useState, useRef } from "react"



function EmployeeDeposit(props) {
    const {users, setUsers, usedAccountNumbers, setPopupAction, setOverlayVisibility, adminRecords, setAdminRecords} = props
    const depositLastName = useRef("")
    const depositFirstName = useRef("")
    const depositUsername = useRef("")
    const depositAmount = useRef(0)
    const depositAccountNumber = useRef("")
    const [depositReminder, setDepositReminder] = useState("")


    const onAccountNumberChange = (accountNumber) => {


        function emptyInputs() {
            depositLastName.current.value = ""
            depositFirstName.current.value = ""
            depositUsername.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                let username = usedAccountNumbers[accountNumber]
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

    const onCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setPopupAction("")
        setDepositReminder("")
    }
    
    const onSubmit = (event) => {
        let username = depositUsername.current.value
        let amountTodeposit = depositAmount.current.value

        if ( username === ""){
            event.preventDefault()
            setDepositReminder("*Account number is invalid")
        } else if (amountTodeposit === "" || amountTodeposit <=0 ) {
            event.preventDefault()
            setDepositReminder("*Amount cannot be 0 or empty")
        } else {
            event.preventDefault()
            let userObject = users[username]
            let currentWallet = userObject.wallet
            let currentTransaction = userObject.transactions
            let newDate = new Date()
            let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`
            let newTransaction = {
                runningBalance: Number(currentWallet)+Number(amountTodeposit),
                transactionType: "Received",
                Amount: amountTodeposit,
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
                        "wallet": Number(currentWallet)+Number(amountTodeposit),
                        "transactions":[
                            ...currentTransaction,
                            newTransaction
                        ]
                    }
                }
            )
            setDepositReminder("Deposit Confirmed")
            
            let previousTransactions = []
            if (adminRecords.transactions) {
                previousTransactions = adminRecords.transactions
            }
            setAdminRecords({
                ...adminRecords,
                transactions : [
                    ...previousTransactions,
                    {  
                        from: "Hwallet",
                        to: users[username].accountNumber,
                        transactionType: "Deposit",
                        Amount: amountTodeposit,
                        dateOfTransaction: dateOfTransaction
                    }
                ]
            })
            depositLastName.current.value = ""
            depositFirstName.current.value = ""
            depositUsername.current.value = ""
            depositAccountNumber.current.value = ""
            depositAmount.current.value = ""

        }
    }

    return (
        <form id="employeePopupDeposit">
            <div id="depositHeader">
                <h1>Deposit</h1>
                <div><p id="depositReminder">{depositReminder}</p></div>
            </div>
            {/* <div id="depositX">
                <button onClick={e => onCancel(e)}type="submit">X</button>
            </div> */}
            <div id="depositMain">
                <div id="depositInputs">
                    <label for="depositAccountNumber"></label>
                    <input ref={depositAccountNumber} onChange={event => onAccountNumberChange(event.target.value)} type="text" id="depositAccountNumber" placeholder="Account Number"></input>
                    <label for="depositAmount"></label>
                    <input ref = {depositAmount} type="number" id="depositAmount" placeholder="Amount"></input>
                    <button onClick={e => onSubmit(e)}type="submit">Submit</button>
                </div>
                <div id="depositInfo">
                    <label for="depositUsername"></label>
                    <input ref = {depositUsername} type="text" id="depositUsername" placeholder="Username"></input>
                    <label for="depositFirstName"></label>
                    <input ref = {depositFirstName} type="text" id="depositFirstName" placeholder="First Name"></input>
                    <label for="depositAmount"></label>
                    <input ref = {depositLastName} type="text" id="depositAmount" placeholder="Last Name"></input>
                </div>
            </div>
        </form>
    )
}

export default EmployeeDeposit