import { useRef, useState } from "react/cjs/react.development"
import ConfirmSend from "./ConfirmSend"

function Send(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, usedAccountNumbers, setUsedAccountNumbers, users, setUsers } = props
    const sendAmountData = useRef(0)
    const sendAccountData = useRef(0)
    const [sendReminder, setsendReminder] = useState("")
    const [stepTwoSend, setStepTwoSend] = useState("hidden")

    const onSendCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setsendReminder("")
    }

    const onSendSubmit = (event) => {
        let sendAmount = Number(sendAmountData.current.value);
        let sendAccount = sendAccountData.current.value;
        let currentBalance = currentUser.wallet
        
        if(sendAmount > currentBalance || sendAmount < 0){
            event.preventDefault()
            setsendReminder("*Insufficient Balance")
        } else if(!(sendAccount in usedAccountNumbers)) {
            event.preventDefault()
            setsendReminder("*Not a valid Hwallet Account")
        } else if(currentUser.accountNumber.toLocaleString() === sendAccount.toLocaleString()) {
            event.preventDefault()
            setsendReminder("*Recipient account cannot be this account")
        } else if(sendAmount==="" || sendAmount===0) {
            event.preventDefault()
            setsendReminder("*Amount cannot be 0 or empty")
        } else {
            event.preventDefault()
            setsendReminder("")
            setStepTwoSend("visible")
            console.log(stepTwoSend)
        }
    }


    return(
        <>
            <form className="popup"> 
                <h1>{popupName}</h1>
                <div id="popupInputs">
                    <div>
                        <p>{sendReminder}</p>
                    </div>
                    <div>
                        <label for="accnumber">Send to Another Hwallet User</label>
                        <input ref={sendAccountData} type="number" placeholder="009999"></input>
                    </div>
                    <div>
                        <label for="accnumber">Amount (₱)</label>
                        <input ref={sendAmountData} type="number" placeholder="100.00"></input>
                    </div>
                    <div>
                        <label for="accnumber">Notes</label>
                        <input type="text" placeholder="e.g for Payment to John Doe"></input>
                    </div>
                </div>
                <div id="popupButtons">
                    <button id="cancelButton" onClick={onSendCancel}>Cancel</button>
                    <button id="submitButton" onClick={onSendSubmit}>Submit</button>
                </div>
            </form>
            <ConfirmSend
                setOverlayVisibility = {setOverlayVisibility}
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                transaction = {transaction}
                setTransaction = {setTransaction}
                setStepTwoSend = {setStepTwoSend}
                stepTwoSend = {stepTwoSend}
                sendAmountData = {sendAmountData}
                sendAccountData = {sendAccountData}
                usedAccountNumbers = {usedAccountNumbers}
                users = {users}
                setUsers = {setUsers}

            />
        </>
    )
}

export default Send