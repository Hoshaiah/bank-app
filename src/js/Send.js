import { useRef, useState } from "react/cjs/react.development"


function Send(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction} = props
    const withdrawAmountData = useRef(0)
    const [sendReminder, setsendReminder] = useState("")

    const onSendCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setsendReminder("")
    }

    const onSendSubmit = (event) => {
        event.preventDefault()
        let sendAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet

        if(sendAmount <= currentBalance){
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance-sendAmount
            })
            setsendReminder("")
            let record = {
                runningBalance: currentBalance-sendAmount,
                transactionType: "send",
                Amount: sendAmount 
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
                    <label for="accnumber">Send to Account</label>
                    <input type="text" placeholder="0999 999 999"></input>
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
                <button id="cancelButton" onClick={onSendCancel}>Cancel</button>
                <button id="submitButton" onClick={onSendSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default Send