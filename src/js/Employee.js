import AddUser from "./AddUser"
import EmployeeWithdraw from "./EmployeeWithdraw"
import EmployeeDeposit from "./EmployeeDeposit"
import EmployeeTransfer from "./EmployeeTransfer"
import { useState } from "react"
import EmployeePopup from "./EmployeePopup"
import EmployeeTransactions from "./EmployeTransactions"
import EmployeeManagementLog from "./EmployeeManagementLog"

function Employee(props){
    const {isEmployeePage, setIsEmployeePage, currentUser, setCurrentUser, setUsers, users, setIsLoginPage, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails, adminRecords, setAdminRecords} = props
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupAction, setPopupAction] = useState("")

    const onExit = () => {
        setIsEmployeePage(false)
        setIsLoginPage(true)
    }

    const onDeleteUser = (user) =>{
        let usersCopy = {...users}
        delete usersCopy[user]
        setUsers(usersCopy)
        let usedAccountNumbersCopy = {...usedAccountNumbers}
        delete usedAccountNumbersCopy[users[user].accountNumber]
        setUsedAccountNumbers(usedAccountNumbersCopy)

        let previousLog = []
        let newDate = new Date()
        if (adminRecords.managementLog) {
            previousLog = adminRecords.managementLog
        }
        setAdminRecords({
            ...adminRecords,
            managementLog : [
                ...previousLog,
                {  
                    action: "Deleted User",
                    username: user,
                    accountNumber: users[user].accountNumber,
                    date: `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })}`
                }
            ]
        })

    }

    const onWithdrawClick = () =>{
        setOverlayVisibility("visible")
        setPopupAction("withdraw")
    }

    const onDepositClick = () => {
        setOverlayVisibility("visible")
        setPopupAction("deposit")
    }

    const onTransferClick = () => {
        setOverlayVisibility("visible")
        setPopupAction("transfer")
    }

    if (isEmployeePage){
        return (
            <>
            <h1 onClick={onExit}>Exit</h1>
            <div id="employeeAccountActions">
                <h1>Main</h1>
                <h1>Add User</h1>
            </div>
            <div id="employeeMoneyActions">
                <div id="employeeWithdraw" >
                    <h2 onClick={onWithdrawClick}>Withdraw</h2>
                </div>
                <div id="employeeDeposit">
                    <h2 onClick={onTransferClick}>Transfer</h2>
                </div>
                <div id="employeeTransfer">
                    <h2 onClick={onDepositClick}>Deposit</h2>
                </div>
            </div>
            <div id ="allUserAccounts">
                {Object.keys(users).map((key, index) => ( key=== "undefined" ? "" :
                    <div class="userRow">
                        <row>{users[key].accountNumber}</row>
                        <row>{users[key].username}</row>
                        <row>{users[key].firstName}</row>
                        <row>{users[key].lastName}</row>
                        <row>{users[key].email}</row>
                        <row>{users[key].wallet}</row>
                        <row onClick={()=> onDeleteUser(key)}>Delete</row>
                    </div>
                ))}
            </div>
            <AddUser
                users = {users}
                setUsers = {setUsers}
                usedAccountNumbers = {usedAccountNumbers}
                setUsedAccountNumbers = {setUsedAccountNumbers}
                usedEmails = {usedEmails}
                setUsedEmails = {setUsedEmails}
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />
            <EmployeeTransactions
                adminRecords = {adminRecords}
                setAdminRecords = {setAdminRecords}
            />

            <div>
                <h1>User Management Log</h1>
                <EmployeeManagementLog
                    adminRecords = {adminRecords}
                    setAdminRecords = {setAdminRecords}
                />

            </div>
            <div className={overlayVisiblity} id="employeeOverlay" >
                <EmployeePopup
                    setUsers = {setUsers}
                    users = {users}
                    popupAction = {popupAction}
                    setPopupAction = {setPopupAction}
                    setOverlayVisibility = {setOverlayVisibility}
                    usedAccountNumbers = {usedAccountNumbers}
                    adminRecords = {adminRecords}
                    setAdminRecords = {setAdminRecords}
                />
            </div>
            </>
        ) 
    } else {
        return (
            null
        )
    }
}

export default Employee