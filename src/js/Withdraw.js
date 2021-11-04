import { useRef, useState } from "react/cjs/react.development"


function Withdraw(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const withdrawAmountData = useRef(0)
    const [withdrawalReminder, setWithdrawalReminder] = useState("")
    const [withdrawAccountChosen, setWithdrawAccountChosen] = useState(0)

    const onWithdrawCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setWithdrawalReminder("")
        console.log(withdrawAccountChosen)

    }

    const onWithdrawSubmit = (event) => {
        event.preventDefault()
        let withdrawalAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet

        if(withdrawalAmount <= currentBalance && linkedAccounts.length !== 0){
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance-withdrawalAmount
            })
            setWithdrawalReminder("")
            let record = {
                runningBalance: currentBalance-withdrawalAmount,
                transactionType: "withdrawal",
                Amount: withdrawalAmount 
            }
            setTransaction([...transaction, record])

        } else if (linkedAccounts.length === 0) {
            setWithdrawalReminder("*Link an account first")
        } else {
            setWithdrawalReminder("*Insufficient Balance")
        }

    }

    return(
        <form className="popup"> 
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
                    <label for="account">Choose account to transfer money to:</label>
                    <select id="account" name="acount" selected={withdrawAccountChosen} onSelectedChange={setWithdrawAccountChosen}>
                        {/* <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option> */}
                        {linkedAccounts.map((element, index) => (
                            <option key={index} value={element.accountNumber}>{element.bank}: {element.accountNumber}</option>
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