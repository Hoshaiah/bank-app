import { useRef, useState, useEffect } from "react/cjs/react.development"
import ConfirmDeposit from "./ConfirmDeposit"

function Deposit(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const depositAmountData = useRef(0)
    const [depositReminder, setDepositReminder] = useState("")
    const [linkedAccountsToDisplay, setLinkedAccountsToDisplay] = useState(currentUser.linkedAccounts)
    const [stepTwoDeposit, setStepTwoDeposit] = useState("hidden")


    let widthdrawAccountDefault = ""
    if (currentUser.linkedAccounts.length>0){
        widthdrawAccountDefault = currentUser.linkedAccounts[0]
    }
    const [depositAccount, setDepositAccount] = useState(widthdrawAccountDefault)

    useEffect (() => {
        setLinkedAccountsToDisplay(currentUser.linkedAccounts)
    },[currentUser])

    const onDepositCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setDepositReminder("")
    }

    const onDepositSubmit = (event) => {
        event.preventDefault()
        let depositAmount = Number(depositAmountData.current.value);
        let currentBalance = currentUser.wallet

        if(depositAmount===0 || depositAmount ===""){
            setDepositReminder("*Amount cannot be zero or unfilled")
        } else if (currentUser.linkedAccounts.length === 0) {
            setDepositReminder("*Link an account first")
        } else {
            setDepositReminder("")
            setStepTwoDeposit("visible")
        }
    }

    const onDepositSelect = (event) => {
        setDepositAccount(currentUser.linkedAccounts[event.target.value])
    }

    return(
    <>
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{depositReminder}</p>
                </div>
                <div>
                    <label for="account">Choose account to transfer money to:</label>
                    <select id="account" name="acount" onChange={event => onDepositSelect(event)} >
                        {linkedAccountsToDisplay.map((element, index) => (
                            <option key={index} value={index}>{element.bank}: {element.accountNumber}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="accnumber">Amount (₱)</label>
                    <input ref={depositAmountData} type="number" placeholder="100.00"></input>
                </div>
                <div>
                    <label for="accnumber">Notes</label>
                    <input type="text" placeholder="e.g for Payment to John Doe"></input>
                </div>
            </div>
            <div id="popupButtons">
                <button id="cancelButton" onClick={onDepositCancel}>Cancel</button>
                <button id="submitButton" onClick={onDepositSubmit}>Submit</button>
            </div>
        </form>
        <ConfirmDeposit
            setOverlayVisibility = {setOverlayVisibility}
            setCurrentUser = {setCurrentUser}
            currentUser = {currentUser}
            transaction = {transaction}
            setTransaction = {setTransaction}
            linkedAccounts = {linkedAccounts}
            setStepTwoDeposit = {setStepTwoDeposit}
            stepTwoDeposit = {stepTwoDeposit}
            depositAmountData = {depositAmountData}
            depositAccount = {depositAccount}
        />
    </>
    )
}

export default Deposit