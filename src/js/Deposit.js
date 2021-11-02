import { useRef, useState } from "react/cjs/react.development"

function Deposit(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser} = props
    const DepositAmountData = useRef(0)
    const [DepositReminder, setDepositReminder] = useState("")

    const onDepositCancel = () => {
        setOverlayVisibility("hidden")
        setDepositReminder("")
    }

    const onDepositSubmit = () => {
        let DepositalAmount = Number(DepositAmountData.current.value);
        let currentBalance = currentUser.wallet
        setOverlayVisibility("hidden")
        setCurrentUser ({
            ...currentUser,
            wallet: currentBalance + DepositalAmount
        }) 

    }


    return(
        <div className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{DepositReminder}</p>
                </div>
                <div>
                    <label for="accnumber">Deposit to Account</label>
                    <input type="text" placeholder="0999 999 999"></input>
                </div>
                <div>
                    <label for="accnumber">Amount (₱)</label>
                    <input ref={DepositAmountData} type="number" placeholder="100.00"></input>
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
        </div>
    )
}

export default Deposit