function EmployeeManagementLog(props){
    const {adminRecords, setAdminRecords} = props

    if (adminRecords.managementLog){
        return (
            <div>
                {adminRecords.managementLog.map(element => (
                    <div>
                        <div>{element.action}</div>
                        <div>{element.username}</div>
                        <div>{element.accountNumber}</div>
                        <div>{element.date}</div>
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default EmployeeManagementLog