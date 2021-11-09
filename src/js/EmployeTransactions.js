 
 function EmployeeTransactions(props){
    const {adminRecords, setAdminRecords} = props
    if (adminRecords.transactions){
        return(
            <div id = "employeeTransactionLog">
                <h1>Transactions</h1>
                <div id="employeeTransactionHeader">
                    <div>Transaction Type</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Date</div>
                    <div>Amount</div>
                </div>
                {adminRecords.transactions.map(element => (
                    <div class="employeeTransaction">
                        <div class="employeeTransactionRow">{element.transactionType}</div>
                        <div class="employeeTransactionRow">{element.from}</div>
                        <div class="employeeTransactionRow">{element.to}</div>
                        <div class="employeeTransactionRow">{element.dateOfTransaction}</div>
                        <div class="employeeTransactionRow">₱ {Number(element.Amount).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
 }

 export default EmployeeTransactions