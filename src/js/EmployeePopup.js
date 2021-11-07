import EmployeeDeposit from "./EmployeeDeposit"
import EmployeeTransfer from "./EmployeeTransfer"
import EmployeeWithdraw from "./EmployeeWithdraw"


function EmployeePopup (props){
    const {setUsers, users, popupAction, setPopupAction, setOverlayVisibility, usedAccountNumbers} = props


    if(popupAction==="withdraw"){
        return(
            <EmployeeWithdraw
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setPopupAction = {setPopupAction}
                setOverlayVisibility = {setOverlayVisibility}
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
            />
        )
    } else if(popupAction ==="transfer"){
        return(<EmployeeTransfer
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setPopupAction = {setPopupAction}
                setOverlayVisibility = {setOverlayVisibility}
            />
        )
    } else {
        return null
    }
}

export default EmployeePopup