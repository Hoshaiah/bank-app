import AddUser from "./AddUser"


function Employee(props){
    const {isEmployeePage, setIsEmployeePage, currentUser, setCurrentUser, setUsers, users, setIsLoginPage} = props

    const onExit = () => {
        setIsEmployeePage(false)
        setIsLoginPage(true)
    }
    if (isEmployeePage){
        return (
            <>
            <h1 onClick={onExit}>Exit</h1>
            <div id="employeeAccountActions">
                <h1>Main</h1>
                <h1>Add User</h1>
                <h1>Delete User</h1>
            </div>
            <div id="employeeMoneyActions">
                <div id="employeeWithdraw">
                    Withdraw
                </div>
                <div id="employeeDeposit">
                    Deposit
                </div>
                <div id="employeeTransfer">
                    Transfer
                </div>
            </div>
            <div id ="allUserAccounts">
                {Object.keys(users).map((key, index) => ( users[key]=== undefined ? "" :
                    <div class="userRow">
                        <row>{users[key].username}</row>
                        <row>{users[key].firstName}</row>
                        <row>{users[key].lastName}</row>
                        <row>{users[key].wallet}</row>
                    </div>
                ))}
            </div>
            <AddUser
                users = {users}
                setUsers = {setUsers}
            />
            </>
        ) 
    } else {
        return (
            null
        )
    }
}

export default Employee