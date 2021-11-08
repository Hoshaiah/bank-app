function ConfirmSend (props) {
    const {setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, setStepTwoSend, stepTwoSend, sendAmountData, sendAccountData, usedAccountNumbers, users, setUsers} = props
    
    const onSendStepTwoCancel = () => {
        setStepTwoSend("hidden")
    }
    const onSendStepTwoConfirm = (event) => {
        let sendAmount = Number(sendAmountData.current.value);
        let sendAccount = sendAccountData.current.value;
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`

        event.preventDefault()
        setOverlayVisibility("hidden")
        setCurrentUser ({
            ...currentUser,
            wallet: currentBalance-sendAmount
        })
        let record = {
            runningBalance: currentBalance-sendAmount,
            transactionType: "Send",
            Amount: sendAmount,
            otherAccount: {
                bank: "Hwallet",
                accountNumber: sendAccount
            },
            dateOfTransaction: dateOfTransaction
        }
        setTransaction([...transaction, record])
        //changing data of recipient
        let usernameRecipient = usedAccountNumbers[sendAccount]
        let objectRecipient = users[usernameRecipient]
        let currentWalletRecipient = objectRecipient.wallet
        let currentTransactionsRecipient = objectRecipient.transactions
        let newRecordRecipient = {
            runningBalance: currentWalletRecipient+sendAmount,
            transactionType: "Received",
            Amount: sendAmount,
            otherAccount: {
                bank: "Hwallet",
                accountNumber: currentUser.accountNumber
            },
            dateOfTransaction: dateOfTransaction
        }
        setUsers({
            ...users,
            [usernameRecipient] : {
                ...objectRecipient,
                "wallet": Number(currentWalletRecipient)+Number(sendAmount),
                "transactions": [
                    ...currentTransactionsRecipient,
                    newRecordRecipient
                ]
            }
        })
        setStepTwoSend("hidden")
        sendAccountData.current.value = ""
        sendAmountData.current.value = ""
    }
    if(stepTwoSend === "visible"){
        return (
            <div className ={`popupStepTwo ${stepTwoSend}`}>
                <h1>Are these details correct?</h1>
                <div class = "popupStepTwoInfo">
                    <h2>Send Money From</h2>
                    <p> Hwallet: {currentUser.accountNumber}</p>
                    <h2>Amount to Send</h2>
                    <p>₱ {sendAmountData.current.value}</p>
                    <h2>Send Fee</h2>
                    <p> ₱ 0</p>
                    <h2>Total Amount to be deducted</h2>
                    <p> ₱ {sendAmountData.current.value}</p>
                    <h2>Send Money to </h2>
                    <p> Hwallet: {sendAccountData.current.value}</p>
                    <div className="confirmButtons">
                        <button  className="confirmConfirm" onClick={onSendStepTwoConfirm} type="submit" value="confirm">Confirm</button>
                        <button  className="confirmBack"  onClick={onSendStepTwoCancel} type="submit" value="back">Back</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default ConfirmSend