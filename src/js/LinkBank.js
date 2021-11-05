import { useRef, useState, useEffect } from "react/cjs/react.development"


function LinkBank(props){
    const {popupName, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction, linkedAccounts, setLinkedAccounts} = props
    const linkedBank = useRef("")
    const linkedAccountNumber = useRef("")
    const [LinkReminder, setLinkReminder] = useState("")

    const onLinkCancel = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setLinkReminder("")
    }

    const onLinkSubmit = (event) => {
        event.preventDefault()
        setOverlayVisibility("hidden")
        setLinkReminder("")
        console.log(linkedAccounts)
        let record = {
            bank: linkedBank.current.value,
            accountNumber: linkedAccountNumber.current.value
        }
        setLinkedAccounts([...linkedAccounts, record])
    }


    return(
        <form className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                <div>
                    <p>{LinkReminder}</p>
                </div>
                {/* {popupInputs.map((element, index) => (
                    <div key={index}>
                        <label for="accnumber">{element[0]}</label>
                        <input type={element[1]} placeholder={element[2]}></input>
                    </div>
                ))} */}
                <div>
                    <label for="linkBank">Bank</label>
                    <input ref={linkedBank} id="linkBank" type="text" placeholder="BDO"></input>
                </div>
                <div>
                    <label for="linkAccount">Link to Account</label>
                    <input ref={linkedAccountNumber} id="linkAccount" type="number" placeholder="0999 999 999"></input>
                </div>
                <div>
                    <label for="linkUsername">Account Username</label>
                    <input type="number" id="linkUsername" placeholder="JohnDoe321"></input>
                </div>
                <div>
                    <label for="linkPassword">Account Password</label>
                    <input type="password" id="linkPassword" placeholder="******"></input>
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