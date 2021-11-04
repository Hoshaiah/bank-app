import {useEffect, useState} from "react"

function RecentActivities(props) {
    const {currentUser} = props
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
                    <p class ="transactionRunningBalance">Running Balance: {element.runningBalance}</p>
                    <p class ="transactionType">Transaction: {element.transactionType}</p>
                    <p class ="transactionAmount" >Amount: {element.Amount}</p>
                </div>
                ))}
            </div>
            <p onClick={onShowClick}>{showState}</p>
        </div>
    )
}

export default RecentActivities