import { useRef, useState, useEffect } from "react/cjs/react.development"

function Withdraw(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const withdrawAmountData = useRef(0)
    const [withdrawalReminder, setWithdrawalReminder] = useState("")
    const [linkedAccountsToDisplay, setLinkedAccountsToDisplay] = useState(currentUser.linkedAccounts)

    let widthdrawAccountDefault = ""
    if (currentUser.linkedAccounts.length>0){
        widthdrawAccountDefault = currentUser.linkedAccounts[0]
    }
    const [withdrawalAccount, setWithdrawalAccount] = useState(widthdrawAccountDefault)

    useEffect (() => {
        setLinkedAccountsToDisplay(currentUser.linkedAccounts)
    },[currentUser])

    const onWithdrawCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setWithdrawalReminder("")
    }

    const onWithdrawSubmit = (event) => {
        event.preventDefault()
        let withdrawalAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDay()} ${newDate.toLocaleString('default', { month: 'short' })}`

        if(withdrawalAmount <= currentBalance && linkedAccounts.length !== 0){
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance-withdrawalAmount
            })
            setWithdrawalReminder("")
            let record = {
                runningBalance: currentBalance-withdrawalAmount,
                transactionType: "Withdrawal",
                Amount: `₱ -${withdrawalAmount}`,
                otherAccount: withdrawalAccount,
                dateOfTransaction: dateOfTransaction
            }
            setTransaction([...transaction, record])

        } else if (linkedAccounts.length === 0) {
            setWithdrawalReminder("*Link an account first")
        } else {
            setWithdrawalReminder("*Insufficient Balance")
        }

    }

    const onWithdrawSelect = (event) => {
        setWithdrawalAccount(currentUser.linkedAccounts[event.target.value])
    }
    
    

    return(
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{withdrawalReminder}</p>
                </div>
                <div>
                    <label for="account">Choose account to transfer money to:</label>
                    <select id="account" name="acount" onChange={event => onWithdrawSelect(event)} >
                        {linkedAccountsToDisplay.map((element, index) => (
                            <option key={index} value={index}>{element.bank}: {element.accountNumber}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="accnumber">Amount (₱)</label>
                    <input ref={withdrawAmountData} type="number" placeholder="100.00"></input>
                </div>
                <div>
                    <label for="accnumber">Notes</label>
                    <input type="text" placeholder="e.g for Payment to John Doe"></input>
                </div>
            </div>
            <div id="popupButtons">
                <button id="cancelButton" onClick={onWithdrawCancel}>Cancel</button>
                <button id="submitButton" onClick={onWithdrawSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default Withdraw