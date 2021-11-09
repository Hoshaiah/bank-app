import EmployeeDeposit from "./EmployeeDeposit"
import EmployeeTransfer from "./EmployeeTransfer"
import EmployeeWithdraw from "./EmployeeWithdraw"
import AddUser from "./AddUser"
import DeleteUser from "./DeleteUser"

function EmployeePopup (props){
    const {setUsers, users, popupAction, setPopupAction, setOverlayVisibility, usedAccountNumbers, adminRecords, setAdminRecords, setUsedAccountNumbers,usedEmails, setUsedEmails} = props


    if(popupAction==="withdraw"){
        return(
            <EmployeeWithdraw
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setPopupAction = {setPopupAction}
                setOverlayVisibility = {setOverlayVisibility}
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
        )
    } else if(popupAction==="deposit"){
        return (
            <EmployeeDeposit
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setPopupAction = {setPopupAction}
                setOverlayVisibility = {setOverlayVisibility}
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
        )
    } else if(popupAction ==="transfer"){
        return(<EmployeeTransfer
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setPopupAction = {setPopupAction}
                setOverlayVisibility = {setOverlayVisibility}
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
        )
    } else if(popupAction ==="addUser"){
        return(<AddUser
            users = {users}
            setUsers = {setUsers}
            usedAccountNumbers = {usedAccountNumbers}
            setUsedAccountNumbers = {setUsedAccountNumbers}
            usedEmails = {usedEmails}
            setUsedEmails = {setUsedEmails}
            adminRecords = {adminRecords}
            setAdminRecords = {setAdminRecords}
            setPopupAction = {setPopupAction}

        />
        )
    } else if(popupAction ==="deleteUser"){
        return(<DeleteUser
            users = {users}
            setUsers = {setUsers}
            usedAccountNumbers = {usedAccountNumbers}
            setUsedAccountNumbers = {setUsedAccountNumbers}
            usedEmails = {usedEmails}
            setUsedEmails = {setUsedEmails}
            adminRecords = {adminRecords}
            setAdminRecords = {setAdminRecords}
            setPopupAction = {setPopupAction}
        />
        )
    } else {
        return null
    }
}

export default EmployeePopup