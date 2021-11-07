import {useEffect, useState} from "react"

function RecentActivities(props) {
    const {currentUser, linkedAccounts, setLinkedAccounts} = props
    const [showState, setShowState] = useState("Show More")

    function getLastTransactions(quantity){
        let lastTransactions = []
        for (let i = currentUser.transactions.length-1; i>= currentUser.transactions.length-quantity && i>=0; i--){
            lastTransactions.push(currentUser.transactions[i])
        }
        return lastTransactions
    }
    const [toDisplay, setToDisplay] = useState(getLastTransactions(5))

    const onShowClick  = () => {
        if (showState ==="Show More") {
            setShowState("Show Less")
            setToDisplay(getLastTransactions(10))

        } else {
            setShowState("Show More")
            setToDisplay(getLastTransactions(5))
            }
        }

    useEffect(()=>{
        onShowClick()
    },[currentUser])
    


    return (
        <div id="recentActivity">
            <h1>Recent Activity</h1>
            <div id ="recentActivites">
                {toDisplay.map((element,index)=>(
                <div class="transactionRecord" key={index}>
                    <div class="transactionTop">
                        <p class ="transactionAccount">{`${element.otherAccount.bank} ${element.otherAccount.accountNumber}`}</p>
                        <p class ="transactionDate">{element.dateOfTransaction}</p>
                        <p class ="transactionType">{element.transactionType}</p>
                    </div>
                    <div class="transactionBottom">
                        <p class ="transactionRunningBalance">{`Running Balance: ₱ ${Number(element.runningBalance).toLocaleString()}`}</p>
                        <p class ="transactionAmount" >{`₱ ${element.transactionType==="Withdrawal" || element.transactionType==="Send"  ? "-" : ""} ${Number(element.Amount).toLocaleString()}`}</p>
                    </div>
                </div>
                ))}
            </div>
            <p onClick={onShowClick}>{showState}</p>
        </div>
    )
}

export default RecentActivities