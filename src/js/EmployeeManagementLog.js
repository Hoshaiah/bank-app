function EmployeeManagementLog(props){
    const {adminRecords, setAdminRecords} = props

    if (adminRecords.managementLog){
        return (
            <div id="employeeUserManagementLog">
                <h1>User Management Log</h1>
                <div id="employeeManagementLogHeader">
                    <div>Log Type</div>
                    <div>Account Number</div>
                    <div>UserName</div>
                    <div>Date</div>
                    <div>Edited Previous Info</div>
                    <div>Edited New Info</div>
                </div>
                {adminRecords.managementLog.map(element => (
                    <div class="employeeLogs">
                        <div class="employeeLog">{element.action}</div>
                        <div class="employeeLog">{element.username}</div>
                        <div class="employeeLog">{element.accountNumber}</div>
                        <div class="employeeLog">{element.date}</div>
                        <div class="employeeLog">{element.editFrom}</div>
                        <div class="employeeLog">{element.editTo}</div>
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default EmployeeManagementLog