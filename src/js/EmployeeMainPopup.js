import EmployeeAllUsers from "./EmployeeAllUsers"
import EmployeeTransactions from "./EmployeTransactions"
import EmployeeManagementLog from "./EmployeeManagementLog"

function EmployeeMainPopup(props) {
    const {infoPopupAction, setInfoPopupActions, users, adminRecords, setAdminRecords} = props


    if (infoPopupAction === "allUsers") {
        return(
            <EmployeeAllUsers
                users = {users}
            />
        )
    } else if (infoPopupAction === "transactionsLog") {
        return (
            <EmployeeTransactions
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
        )
    } else if (infoPopupAction === "userManagementLog") {
        return (
            <EmployeeManagementLog
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
        )
    }else {
        return null
    }
}

export default EmployeeMainPopup