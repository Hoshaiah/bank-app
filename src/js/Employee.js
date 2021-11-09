import AddUser from "./AddUser"
import { useState } from "react"
import EmployeePopup from "./EmployeePopup"
import EmployeeTransactions from "./EmployeTransactions"
import EmployeeManagementLog from "./EmployeeManagementLog"
import settings from '../img/settings.png';
import logo from '../logo.svg';
import EmployeeMainPopup from "./EmployeeMainPopup"


function Employee(props){
    const {isEmployeePage, setIsEmployeePage, currentUser, setCurrentUser, setUsers, users, setIsLoginPage, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails, adminRecords, setAdminRecords} = props
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupAction, setPopupAction] = useState("")
    const [infoPopupAction, setInfoPopupAction] = useState("")

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
        setPopupAction("withdraw")
    }

    const onDepositClick = () => {
        setPopupAction("deposit")
    }

    const onTransferClick = () => {
        setPopupAction("transfer")
    }
    const onAddUserClick = () => {
        setPopupAction("addUser")
    }

    const onDeleteUserClick = () => {
        setPopupAction("deleteUser")
    }

    const onEditUserClick = () => {
        setPopupAction("editUser")
    }

    const onAllUsersClick = () => {
        setInfoPopupAction("allUsers")
    }

    const onTransactionsLogClick = () => {
        setInfoPopupAction("transactionsLog")
    }

    const onUserManagementLogClick = () => {
        setInfoPopupAction("userManagementLog")
    }

    if (isEmployeePage){
        return (
            <div id="EmployeePage">
                <nav id="dashboardNav"> 
                <div id="visibleNav">
                    <ul id="gennav">
                    <img src={logo} className="App-logo" alt="logo" />
                    <li id="dashboard">Dashboard</li>
                    <li>Wallet</li>
                    <li>Activity</li>
                    <li>Help</li>
                    </ul>
                    <ul id="lognav">
                        <li><img id="settings" src={settings} alt="" ></img></li>
                        <li id="logout">Log Out</li>
                    </ul>
                </div>
                </nav>
                {/* <nav id="employeeNavigationPane">
                    <ul>
                        <li>Main</li>
                        <li>Transactions Log</li>
                        <li>User Management Log</li>
                    </ul>
                </nav> */}
                <main id="employeeMain">
                    <div id="employeeMainTop">
                        <h1 onClick={onExit}>DashBoard</h1>
                        <div id="employeeActions">
                                <button onClick={onWithdrawClick}>{"<"} Withdraw</button>
                                <button onClick={onDepositClick}>{">"} Deposit</button>
                                <button onClick={onTransferClick}>{"><"} Transfer</button>
                                <button onClick={onAddUserClick} id="addUserButton">+ Add User</button>
                                <button onClick={onDeleteUserClick} id="addUserButton">+ Delete User</button>
                                <button onClick={onEditUserClick} id="addUserButton"> \ Edit User</button>
                        </div>
                        <div id="employeePopupPane" >
                            <EmployeePopup
                                setUsers = {setUsers}
                                users = {users}
                                popupAction = {popupAction}
                                setPopupAction = {setPopupAction}
                                setOverlayVisibility = {setOverlayVisibility}
                                usedAccountNumbers = {usedAccountNumbers}
                                adminRecords = {adminRecords}
                                setAdminRecords = {setAdminRecords}
                                setUsedAccountNumbers = {setUsedAccountNumbers}
                                usedEmails = {usedEmails}
                                setUsedEmails = {setUsedEmails}
                            />
                        </div>
                    </div>
                    <div id="employeeMainBottom">
                        <div id="employeeTabs">
                            <button onClick={onAllUsersClick}>All Users</button>
                            <button onClick={onTransactionsLogClick}>Transactions Log </button>
                            <button onClick={onUserManagementLogClick}>User Management Log</button>
                        </div>
                        <div id="employeeMainPopup">
                            <EmployeeMainPopup
                                infoPopupAction = {infoPopupAction}
                                setInfoPopupAction = {setInfoPopupAction}
                                users = {users} 
                                adminRecords = {adminRecords}
                                setAdminRecords = {setAdminRecords}
                            />
                        </div>

                    </div>



                    {/* <EmployeeTransactions
                        adminRecords = {adminRecords}
                        setAdminRecords = {setAdminRecords}
                    />

                    <div>
                        <h1>User Management Log</h1>
                        <EmployeeManagementLog
                            adminRecords = {adminRecords}
                            setAdminRecords = {setAdminRecords}
                        />

                    </div> */}
                </main>
            </div>
        ) 
    } else {
        return (
            null
        )
    }
}

export default Employee