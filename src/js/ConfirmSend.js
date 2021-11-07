function Confirm (props) {
    const {setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setStepTwo, stepTwo, withdrawAmountData, withdrawalAccount} = props
    
    const onWithdrawStepTwoCancel = () => {
        setStepTwo("hidden")
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
        setTransaction([...transaction, record])
        setStepTwo("hidden")
    }

    return (
        <div className ={`popupStepTwo ${stepTwo}`}>
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
}
export default Confirm