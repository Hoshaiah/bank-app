import { useRef, useState, useEffect } from "react/cjs/react.development"
import ConfirmWithdaw from "./ConfirmWithdraw"

function Withdraw(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const withdrawAmountData = useRef(0)
    const [withdrawalReminder, setWithdrawalReminder] = useState("")
    const [linkedAccountsToDisplay, setLinkedAccountsToDisplay] = useState(currentUser.linkedAccounts)
    const [stepTwoWithdraw, setStepTwoWithdraw] = useState("hidden")


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

    // const onWithdrawSubmit = (event) => {
    //     event.preventDefault()
    //     setStepTwo(true)
    // } 

    const onWithdrawSubmit = (event) => {
        event.preventDefault()
        let withdrawalAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet

        if(withdrawalAmount > currentBalance){
            setWithdrawalReminder("*Insufficient Balance")
        } else if(withdrawalAmount===0 || withdrawalAmount ===""){
            setWithdrawalReminder("*Amount cannot be zero or unfilled")
        } else if (linkedAccounts.length === 0) {
            setWithdrawalReminder("*Link an account first")
        } else {
            setWithdrawalReminder("")
            setStepTwoWithdraw("visible")
        }
    }

    const onWithdrawSelect = (event) => {
        setWithdrawalAccount(currentUser.linkedAccounts[event.target.value])
    }
    console.log(withdrawalAccount)

    return(
    <>
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
        <ConfirmWithdaw
            setOverlayVisibility = {setOverlayVisibility}
            setCurrentUser = {setCurrentUser}
            currentUser = {currentUser}
            transaction = {transaction}
            setTransaction = {setTransaction}
            linkedAccounts = {linkedAccounts}
            setStepTwoWithdraw = {setStepTwoWithdraw}
            stepTwoWithdraw = {stepTwoWithdraw}
            withdrawAmountData = {withdrawAmountData}
            withdrawalAccount = {withdrawalAccount}
        />
    </>
    )
}

export default Withdraw