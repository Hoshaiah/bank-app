

function Employee(props){
    const {isEmployeePage, setIsEmployeePage, currentUser, setCurrentUser, setUsers, users} = props

    let user = [{
        username: "hoshaiah",
        firstName: "Hosh",
        lastName: "Domingo",
        password: "123",
        wallet: Number(0),
        transactions: [],
        linkedAccounts: []
    }]
    if (isEmployeePage){
        return (
            <>
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
                {user.map((element,index) => (
                    <div class="userRow">
                        <row>{element.username}</row>
                        <row>{element.firstName}</row>
                        <row>{element.lastName}</row>
                    </div>
                ))}
            </div>
            </>
        )
    }
}

export default Employee