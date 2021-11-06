import { useEffect, useRef, useState } from "react/cjs/react.development"

function Deposit(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const DepositAmountData = useRef(0)
    const [DepositReminder, setDepositReminder] = useState("")
    const [linkedAccountsToDisplayDeposit, setLinkedAccountsToDisplayDeposit] = useState(currentUser.linkedAccounts)


    let depositDefault = ""
    if (currentUser.linkedAccounts.length > 0){
        depositDefault = currentUser.linkedAccounts[0]
    }
    const [depositRecipient, setDepositAccount] = useState(depositDefault)

    useEffect ( () => {
        setLinkedAccountsToDisplayDeposit(currentUser.linkedAccounts)
    },[currentUser])

    const onDepositCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setDepositReminder("")

    }

    const onDepositSubmit = (event) => {
        event.preventDefault()
        let DepositalAmount = Number(DepositAmountData.current.value);
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDay()} ${newDate.toLocaleString('default', { month: 'short' })}`


        if (linkedAccounts.length !== 0) {
            setOverlayVisibility("hidden")
            setCurrentUser ({
                ...currentUser,
                wallet: currentBalance + DepositalAmount
            })
            let record = {
                runningBalance: currentBalance+ DepositalAmount,
                transactionType: "Deposit",
                Amount: DepositalAmount,
                otherAccount: depositRecipient,
                dateOfTransaction: dateOfTransaction
            }
            setTransaction([...transaction, record])
        } else {
            setDepositReminder("*Link account first")
        }

    }

    const onDepositSelect = (event) => {
        setDepositAccount(currentUser.linkedAccounts[event.target.value])
    }

    return(
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{DepositReminder}</p>
                </div>
                <div>
                    <label for="account">Choose account to transfer money to:</label>
                    <select id="account" name="acount" onChange={(event=> onDepositSelect(event))}>
                        {/* <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option> */}
                        {linkedAccountsToDisplayDeposit.map((element, index) => (
                            <option key={index} value={index}>{element.bank}: {element.accountNumber}</option>
                        ))}
                    </select>
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
        </form>
    )
}

export default Deposit