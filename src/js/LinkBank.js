import { useRef, useState, useEffect } from "react/cjs/react.development"


function LinkBank(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const linkedBank = useRef("")
    const linkedAccountNumber = useRef("")
    const linkedAccountUsername = useRef("")
    const linkedAccountPassword = useRef("")
    const [LinkReminder, setLinkReminder] = useState("")
    const bankChoices = ["BDO", "BPI" , "ChinaBank"]
    const [chosenBank, setChosenBank] = useState(bankChoices[0])

    const onLinkCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setLinkReminder("")
    }

    const onLinkSubmit = (event) => {
        let accNumber = linkedAccountNumber.current.value
        let username = linkedAccountUsername.current.value
        let password = linkedAccountPassword.current.value
        console.log({accNumber, linkedAccounts})
        if (accNumber.toLocaleString().length <6) {
            event.preventDefault()
            setLinkReminder("*Invalid Bank account number")
        } else if(username.length ===0){
            event.preventDefault()
            setLinkReminder("*Username is required")
        } else if(password.length ===0) {
            event.preventDefault()
            setLinkReminder("*Password is required")
        } else {
            event.preventDefault()
            setOverlayVisibility("hidden")
            setLinkReminder("")
            let record = {
                bank: chosenBank,
                accountNumber: linkedAccountNumber.current.value
            }
            setLinkedAccounts([...linkedAccounts, record])
        }
    }

    const onBankSelect = (event) => {
        setChosenBank(event.target.value)
    }


    return(
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div id ="linkBankReminder">
                    <p>{LinkReminder}</p>
                </div>
                <div>
                    <label for="linkBank">Bank</label>
                    <select id="linkBank" name="linkBank" onChange={(event=> onBankSelect(event))}>
                        {bankChoices.map((element, index) => (
                            <option key={index} value={element}>{element}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="linkAccount">Link to Account</label>
                    <input ref={linkedAccountNumber} id="linkAccount" type="number" placeholder="0999 999 999"></input>
                </div>
                <div>
                    <label for="linkUsername">Account Username</label>
                    <input ref={linkedAccountUsername} type="number" id="linkUsername" placeholder="JohnDoe321"></input>
                </div>
                <div>
                    <label for="linkPassword">Account Password</label>
                    <input ref={linkedAccountPassword} type="password" id="linkPassword" placeholder="******"></input>
                </div>
            </div>
            <div id="popupButtons">
                <button id="cancelButton" onClick={onLinkCancel}>Cancel</button>
                <button id="submitButton" onClick={onLinkSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default LinkBank