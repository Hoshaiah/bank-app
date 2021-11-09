import { useState } from "react"
import { useRef } from "react/cjs/react.development"




function EditUser(props) {
    const {users, setUsers, usedAccountNumbers, setUsedAccountNumbers, usedEmails, setUsedEmails, adminRecords, setAdminRecords, setPopupAction} = props

    const [editUserReminder, setEditUserReminder] = useState("")
    const editUsername = useRef("")
    const editFirstName = useRef("")
    const editLastName = useRef("")
    const editEmail = useRef("")
    const editPassword = useRef("")
    const newEditFirstName = useRef("")
    const newEditLastName = useRef("")
    const newEditEmail = useRef("")
    const newEditPassword = useRef("")
    const onAccountNumberChange = (accountNumber) => {
        function emptyInputs() {
            editLastName.current.value = ""
            editFirstName.current.value = ""
            editUsername.current.value = ""
            editEmail.current.value = ""
        }

        if(accountNumber.length ===6){
            if(accountNumber in usedAccountNumbers) {
                console.log(usedAccountNumbers)
                let username = usedAccountNumbers[accountNumber]
                console.log(users[username])
                editLastName.current.value = users[username].lastName
                editFirstName.current.value = users[username].firstName
                editUsername.current.value = users[username].username
                editEmail.current.value = users[username].email
                editPassword.current.value = users[username].password

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
        setEditUserReminder("")
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let username = editUsername.current.value
        let oldEmail = users[username].email
        let userdata = users[username]
        let email = editEmail.current.value
        let lastName = editLastName.current.value
        let firstName = editFirstName.current.value
        let password = editPassword.current.value

        if (username.length === 0){
            event.preventDefault()
            setEditUserReminder("*Account Number is invalid")
        } else if(oldEmail !== email && email in usedEmails){
            setEditUserReminder("*Email is already taken")
        } else {
            setUsers({
                ...users,
                [username]: {
                    ...userdata,
                    email: email,
                    lastName: lastName,
                    firstName: firstName,
                    password: password
                }
            })
            setPopupAction("")
        }
    }

    return (
        <div>
        <form id="editUser">
            <div id="editUserHeader">
                <h1>Edit User</h1>
                <div><p>{editUserReminder}</p></div>
            </div>
            <div id="editUserX">
                <button onClick={e => onCancel(e)}type="submit">X</button>
            </div>
            <div id="editUserInputs">
                <label for="depositAccountNumber"></label>
                <input onChange={event => onAccountNumberChange(event.target.value)} type="text" id="depositAccountNumber" placeholder="Account Number"></input>
                <button onClick={e => onSubmit(e)}type="submit">Submit</button>
            </div>
            <div id="editUserInfo">
                <label for="editUsername"></label>
                <input ref = {editUsername} type="text" id="editUsername" placeholder="Username" readOnly></input>
                <label for="editEmail"></label>
                <input ref = {editEmail} type="text" id="editEmail" placeholder="Email" ></input>
                <label for="editFirstName"></label>
                <input ref = {editFirstName} type="text" id="editFirstName" placeholder="First Name" ></input>
                <label for="editLastName"></label>
                <input ref = {editLastName} type="text" id="editLastName" placeholder="Last Name" ></input>
                <label for="editPassword"></label>
                <input ref = {editPassword} type="text" id="editPassword" placeholder="Password" ></input>
            </div>
            {/* <div id="depositNewInfo">
                <h2>New</h2>
                <label for="newEditEmail"></label>
                <input ref = {newEditEmail} type="text" id="newEditEmail" placeholder="New Email" ></input>
                <label for="editFirstName"></label>
                <input ref = {newEditFirstName} type="text" id="newEditFirstName" placeholder="New First Name" ></input>
                <label for="editLastName"></label>
                <input ref = {newEditLastName} type="text" id="newEditLastName" placeholder="New Last Name" ></input>
                <input ref = {newEditPassword} type="text" id="newEditPassword" placeholder="New Password" ></input>
            </div> */}
        </form>
        </div>
    )
}

export default EditUser