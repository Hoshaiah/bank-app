import EmployeeDeposit from "./EmployeeDeposit"
import EmployeeTransfer from "./EmployeeTransfer"
import EmployeeWithdraw from "./EmployeeWithdraw"


function EmployeePopup (props){
    const {setUsers, users, popupAction, setPopupAction, usedAccountNumbers} = props


    if(popupAction==="withdraw"){
        return(
            <EmployeeWithdraw
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
            />
        )
    } else if(popupAction==="deposit"){
        return (
            <EmployeeDeposit
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
            />
        )
    } else if(popupAction ==="transfer"){
        return(<EmployeeTransfer
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
            />
        )
    } else {
        return null
    }
}

export default EmployeePopup