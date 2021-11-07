function ConfirmDeposit (props) {
    const {setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setStepTwoDeposit, stepTwoDeposit, depositAmountData, depositAccount} = props
    
    const onDepositStepTwoCancel = () => {
        setStepTwoDeposit("hidden")
    }
    const onDepositStepTwoConfirm = () => {
        let depositAmount = Number(depositAmountData.current.value);
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`

        setOverlayVisibility("hidden")
        setCurrentUser ({
            ...currentUser,
            wallet: currentBalance+depositAmount
        })
        let record = {
            runningBalance: currentBalance+depositAmount,
            transactionType: "Deposit",
            Amount: depositAmount,
            otherAccount: depositAccount,
            dateOfTransaction: dateOfTransaction
        }
        setTransaction([...currentUser.transactions, record])
        setStepTwoDeposit("hidden")
        depositAmountData.current.value = ""
    }
    if(stepTwoDeposit ==="visible"){
        return (
            <div className ={`popupStepTwo ${stepTwoDeposit}`}>
                <h1>Are these details correct?</h1>
                <div class = "popupStepTwoInfo">
                    <h2>Deposit Money From</h2>
                    <p> Hwallet: {currentUser.accountNumber}</p>
                    <h2>Amount to Deposit</h2>
                    <p>₱ {depositAmountData.current.value}</p>
                    <h2>Deposit Fee</h2>
                    <p> ₱ 0</p>
                    <h2>Total Amount to be added</h2>
                    <p> ₱ {depositAmountData.current.value}</p>
                    <h2>Deposit Money to</h2>
                    <p> {depositAccount.bank}: {depositAccount.accountNumber}</p>
                    <button onClick={onDepositStepTwoConfirm} type="submit" value="confirm">Confirm</button>
                    <button onClick={onDepositStepTwoCancel} type="submit" value="back">Back</button>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default ConfirmDeposit