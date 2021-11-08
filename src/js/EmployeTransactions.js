 
 function EmployeeTransactions(props){
    const {adminRecords, setAdminRecords} = props

    if (adminRecords.transactions){
        return(
            <div>
                {adminRecords.transactions.map(element => (
                    <div>
                        <div>{element.from}</div>
                        <div>{element.to}</div>
                        <div>{element.transactionType}</div>
                        <div>{element.Amount}</div>
                        <div>{element.dateOfTransaction}</div>
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
 }

 export default EmployeeTransactions