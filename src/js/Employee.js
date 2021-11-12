
import { useState } from "react"
import EmployeePopup from "./EmployeePopup"
import settings from '../img/settings.png';
import logo from '../logo.svg';
import EmployeeMainPopup from "./EmployeeMainPopup"
import Footer from "./Footer";


function Employee(props){
    const {isEmployeePage, setIsEmployeePage, currentUser, setCurrentUser, setUsers, users, setIsLoginPage, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails, adminRecords, setAdminRecords} = props
    const [overlayVisiblity, setOverlayVisibility] = useState("hidden")
    const [popupAction, setPopupAction] = useState("addUser")
    const [infoPopupAction, setInfoPopupAction] = useState("allUsers")
    const [tabState, setTabState] = useState({
        addUser: "active",
    })
    const [infoTabState, setInfoTabState] = useState({
        allUsers: "active"
    })


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
        setTabState({
            "withdraw": "active"
        })
    }

    const onDepositClick = () => {
        setPopupAction("deposit")
        setTabState({
            "deposit": "active"
        })
    }

    const onTransferClick = () => {
        setPopupAction("transfer")
        setTabState({
            "transfer": "active"
        })
    }
    const onAddUserClick = () => {
        setPopupAction("addUser")
        setTabState({
            "addUser": "active"
        })
    }

    const onDeleteUserClick = () => {
        setPopupAction("deleteUser")
        setTabState({
            "deleteUser": "active"
        })
    }

    const onEditUserClick = () => {
        setPopupAction("editUser")
        setTabState({
            "editUser": "active"
        })
    }

    const onAllUsersClick = () => {
        setInfoPopupAction("allUsers")
        setInfoTabState({
            "allUsers": "active"
        })
    }

    const onTransactionsLogClick = () => {
        setInfoPopupAction("transactionsLog")
        setInfoTabState({
            "transactionsLog": "active"
        })
    }

    const onUserManagementLogClick = () => {
        setInfoPopupAction("userManagementLog")
        setInfoTabState({
            "userManagementLog": "active"
        })
    }

    if (isEmployeePage){
        return (
            <div id="EmployeePage">
                <nav id="dashboardNav"> 
                <div id="visibleNav">
                    <ul id="gennav">
                    <img src={logo} className="App-logo" alt="logo" />
                    <li className="hwalletName">Hwallet</li>
                    </ul>
                    <ul id="lognav">
                        <li><img id="settings" src={settings} alt="" ></img></li>
                        <li onClick={onExit} id="logout">Log Out</li>
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
                        <h1 id="employeeDashboardCaption">DashBoard</h1>
                        <div id="employeeActions">
                                <button className={tabState.addUser} onClick={onAddUserClick} id="addUserButton">+ Add User</button>
                                <button className={tabState.deleteUser} onClick={onDeleteUserClick} id="addUserButton">+ Delete User</button>
                                <button className={tabState.editUser} onClick={onEditUserClick} id="addUserButton"> \ Edit User</button>
                                <button className={tabState.withdraw} onClick={onWithdrawClick}>{"<"} Withdraw</button>
                                <button className={tabState.deposit} onClick={onDepositClick}>{">"} Deposit</button>
                                <button className={tabState.transfer} onClick={onTransferClick}>{"><"} Transfer</button>
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
                            <button className={infoTabState.allUsers} onClick={onAllUsersClick}>All Users</button>
                            <button className={infoTabState.transactionsLog} onClick={onTransactionsLogClick}>Transactions Log </button>
                            <button className={infoTabState.userManagementLog} onClick={onUserManagementLogClick}>User Management Log</button>
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
                </main>
                <Footer/>
            </div>
        ) 
    } else {
        return (
            null
        )
    }
}

export default Employee