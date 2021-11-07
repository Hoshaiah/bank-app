function ConfirmWithdaw (props) {
    const {setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setStepTwoWithdraw, stepTwoWithdraw, withdrawAmountData, withdrawalAccount} = props
    
    const onWithdrawStepTwoCancel = () => {
        setStepTwoWithdraw("hidden")
    }
    const onWithdrawStepTwoConfirm = () => {
        let withdrawalAmount = Number(withdrawAmountData.current.value);
        let currentBalance = currentUser.wallet
        let newDate = new Date()
        let dateOfTransaction = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`

        setOverlayVisibility("hidden")
        setCurrentUser ({
            ...currentUser,
            wallet: currentBalance-withdrawalAmount
        })
        let record = {
            runningBalance: currentBalance-withdrawalAmount,
            transactionType: "Withdrawal",
            Amount: withdrawalAmount,
            otherAccount: withdrawalAccount,
            dateOfTransaction: dateOfTransaction
        }
        setTransaction([...currentUser.transactions, record])
        setStepTwoWithdraw("hidden")
        withdrawAmountData.current.value = ""

    }
    if(stepTwoWithdraw ==="visible"){
        return (
            <div className ={`popupStepTwo ${stepTwoWithdraw}`}>
                <h1>Are these details correct?</h1>
                <div class = "popupStepTwoInfo">
                    <h2>Withdraw Money From</h2>
                    <p> Hwallet: {currentUser.accountNumber}</p>
                    <h2>Amount to Withdraw</h2>
                    <p>₱ {withdrawAmountData.current.value}</p>
                    <h2>Withdrawal Fee</h2>
                    <p> ₱ 0</p>
                    <h2>Total Amount to be deducted</h2>
                    <p> ₱ {withdrawAmountData.current.value}</p>
                    <h2>Withdraw Money to</h2>
                    <p> {withdrawalAccount.bank}: {withdrawalAccount.accountNumber}</p>
                    <button onClick={onWithdrawStepTwoConfirm} type="submit" value="confirm">Confirm</button>
                    <button onClick={onWithdrawStepTwoCancel} type="submit" value="back">Back</button>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default ConfirmWithdaw