import { useRef, useState } from "react/cjs/react.development"


function Send(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction} = props
    const sendAmountData = useRef(0)
    const sendAccountData = useRef(0)
    const sendBankData = useRef(0)
    const [sendReminder, setsendReminder] = useState("")

    const onSendCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setsendReminder("")
    }

    const onSendSubmit = (event) => {
        let sendAmount = Number(sendAmountData.current.value);
        let sendAccount = sendAccountData.current.value;
        let sendBank = sendBankData.current.value;
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDay()} ${newDate.toLocaleString('default', { month: 'short' })}`

        if(sendAmount <= currentBalance){
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance-sendAmount
            })
            setsendReminder("")
            let record = {
                runningBalance: currentBalance-sendAmount,
                transactionType: "Send",
                Amount: sendAmount,
                otherAccount: {
                    bank: sendBank,
                    accountNumber: sendAccount
                },
                dateOfTransaction: dateOfTransaction
            }
            setTransaction([...transaction, record])

        } else {
            setsendReminder("*Insufficient Balance")
        }

    }


    return(
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{sendReminder}</p>
                </div>
                {/* {popupInputs.map((element, index) => (
                    <div key={index}>
                        <label for="accnumber">{element[0]}</label>
                        <input type={element[1]} placeholder={element[2]}></input>
                    </div>
                ))} */}
                <div>
                    <label for="accnumber">Recipient Bank</label>
                    <input ref={sendBankData} type="text" placeholder="BDO"></input>
                </div>
                <div>
                    <label for="accnumber">Send to Account</label>
                    <input ref={sendAccountData} type="number" placeholder="0999 999 999"></input>
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
    )
}

export default Send