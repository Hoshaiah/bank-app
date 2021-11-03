import Deposit from "./Deposit";
import Send from "./Send";
import Withdraw from "./Withdraw";


function Popup (props){
    const {popupName, popupAction, setOverlayVisibility, setCurrentUser, currentUser, transaction, setTransaction} = props

    if (popupAction==="Withdraw"){
        return(
            <Withdraw
                popupName = {popupName}
                setOverlayVisibility = {setOverlayVisibility}
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                transaction = {transaction}
                setTransaction = {setTransaction}
            />
        )
    } else if (popupAction === "Deposit") {
        return(
            <Deposit
                popupName = {popupName}
                setOverlayVisibility = {setOverlayVisibility}
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                transaction = {transaction}
                setTransaction = {setTransaction}
            />
        )
    } else if (popupAction === "Send") {
        return(
            <Send
                popupName = {popupName}
                setOverlayVisibility = {setOverlayVisibility}
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                transaction = {transaction}
                setTransaction = {setTransaction}
            />
        )
    } else {
        return <></>
    }


}

export default Popup;