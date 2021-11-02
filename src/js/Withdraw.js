import { useRef, useState } from "react/cjs/react.development"


function Withdraw(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser} = props
    const withdrawAmountData = useRef(0)
    const [withdrawalReminder, setWithdrawalReminder] = useState("")

    const onWithdrawCancel = () => {
        setOverlayVisibility("hidden")
        setWithdrawalReminder("")
    }

    const onWithdrawSubmit = () => {
        let withdrawalAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet

        if(withdrawalAmount <= currentBalance){
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance-withdrawalAmount
            })
            setWithdrawalReminder("")
        } else {
            setWithdrawalReminder("*Insufficient Balance")
        }

    }


    return(
        <div className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{withdrawalReminder}</p>
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
                <button id="cancelButton" onClick={onWithdrawCancel}>Cancel</button>
                <button id="submitButton" onClick={onWithdrawSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Withdraw