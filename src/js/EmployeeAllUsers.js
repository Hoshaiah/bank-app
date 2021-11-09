function AllUsers (props) {
    const {users} = props
    console.log(users)
    return (

        <div id ="allUserAccounts">
             <h1>Users</h1>
             <div id="userDataHeader">
                <div>Account Number</div>
                <div>Username</div>
                <div>First name</div>
                <div>Last name</div>
                <div>Email address</div>
                <div>Balance</div>
            </div>
            {Object.keys(users).map((key, index) => ( key=== "undefined" ? "" :
                <div class="userRow">
                    <div class="userRowData">{users[key].accountNumber}</div>
                    <div class="userRowData">{users[key].username}</div>
                    <div class="userRowData">{users[key].firstName}</div>
                    <div class="userRowData">{users[key].lastName}</div>
                    <div class="userRowData">{users[key].email}</div>
                    <div class="userRowData">₱ {users[key].wallet.toLocaleString()}</div>
                </div>
            ))}
        </div>
    )
}

export default AllUsers
