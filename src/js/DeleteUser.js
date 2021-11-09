import { useState } from "react"
import { useRef } from "react/cjs/react.development"




function DeleteUser(props) {
    const {users, setUsers, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails, adminRecords, setAdminRecords, setPopupAction} = props

    const [deleteUserReminder, setDeleteUserReminder] = useState("")
    const deleteUsername = useRef("")
    const deleteFirstName = useRef("")
    const deleteLastName = useRef("")
    const deleteEmail = useRef("")
    const onAccountNumberChange = (accountNumber) => {
        function emptyInputs() {
            deleteLastName.current.value = ""
            deleteFirstName.current.value = ""
            deleteUsername.current.value = ""
            deleteEmail.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                let username = usedAccountNumbers[accountNumber]
                deleteLastName.current.value = users[username].lastName
                deleteFirstName.current.value = users[username].firstName
                deleteUsername.current.value = users[username].username
                deleteEmail.current.value = users[username].email

            } else {
                emptyInputs()
            }

        } else{
            emptyInputs()
        }
    }

    const onCancel =(event) => {
        event.preventDefault()
        setPopupAction("")
        setDeleteUserReminder("")
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let username = deleteUsername.current.value
        let email = deleteEmail.current.value
        if (username.length === 0){
            event.preventDefault()
            setDeleteUserReminder("*Account Number is invalid")
        } else {
            let previousLog = []
            let newDate = new Date()
            let accountNumber = users[username].accountNumber
            if (adminRecords.managementLog) {
                previousLog = adminRecords.managementLog
            }
            setAdminRecords({
                ...adminRecords,
                managementLog : [
                    ...previousLog,
                    {  
                        action: "Delete",
                        username: username,
                        accountNumber: accountNumber,
                        date: `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
                        editFrom: "NA",
                        editTo:"NA"
                    }
                ]
            })

            let usersCopy = users
            delete usersCopy[username]
            setUsers({
                ...usersCopy
            })
            setPopupAction("")

            let usedAccountNumbersCopy = usedAccountNumbers
            delete usedAccountNumbersCopy[accountNumber]
            setUsedAccountNumbers({
                ...usedAccountNumbersCopy
            })

            let usedEmailsCopy = usedEmails
            delete usedEmailsCopy[email]
            setUsedEmails({
                ...usedEmailsCopy
            })
        }

    }

    return (
        <div>
            <div id="deleteUserHeader">
                <button id="deleteUserX" onClick={e => onCancel(e)}type="submit">X</button>
                <h1>Delete User</h1>
                <p id="deleteUserReminder">{deleteUserReminder}</p>
            </div>
        <form id="deleteUser">
            <div id="deleteUserInputs">
                <label for="depositAccountNumber"></label>
                <input onChange={event => onAccountNumberChange(event.target.value)} type="text" id="depositAccountNumber" placeholder="Account Number"></input>
                <button onClick={e => onSubmit(e)}type="submit">Delete</button>
            </div>
            <div id="deleteUserInfo">
                <label for="deleteUsername"></label>
                <input ref = {deleteUsername} type="text" id="deleteUsername" placeholder="Username" readOnly></input>
                <label for="deleteFirstName"></label>
                <input ref = {deleteFirstName} type="text" id="deleteFirstName" placeholder="First Name" readOnly></input>
                <label for="depositAmount"></label>
                <input ref = {deleteLastName} type="text" id="deleteLastName" placeholder="Last Name" readOnly></input>
                <label for="depositAmount"></label>
                <input ref = {deleteEmail} type="text" id="deleteEmail" placeholder="Email" readOnly></input>
            </div>
        </form>
        </div>
    )
}

export default DeleteUser