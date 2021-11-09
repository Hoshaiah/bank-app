import { useEffect, useState } from "react/cjs/react.development"
import ConfirmDeposit from "./ConfirmDeposit"

function BudgetTracker(props) {
    const {setCurrentUser, currentUser} = props
    const [counter, setCounter ] = useState(currentUser.username)
    const [expectedCash, setExpectedCash] = useState(currentUser.wallet)


    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // function generateExpenseKey() {
    //     let key = 0
    //     let cont = true
    //     let keys = Object.keys(currentUser.expenses)
    //     let highest = keys[keys.length-1]
    //     for (let i=0; cont; i++){
    //         key = getRandomInt(1,10000)
    //         if (!(key in currentUser.expenses)){
    //             cont= false
    //         }
    //     }
    //     return highest +1
    // }

    function updateExpectedCash(){
        let expensesTotal = 0
        Object.keys(currentUser.expenses).forEach(key=>(
            expensesTotal += Number(currentUser.expenses[key]["amount"])
        ))
        setExpectedCash(currentUser.wallet - expensesTotal)
    }

    useEffect(()=>{
        updateExpectedCash()
    },[currentUser.expenses, currentUser.wallet])

    const onAddExpense = () => {
        let previousExpenses = currentUser.expenses
        setCurrentUser({
            ...currentUser,
            expenses: {
                ...previousExpenses,
                [counter + 1]: {
                    expense: "",
                    amount: "",
                }
            }
        })

        setCounter(counter+1)
    }

    const onInputChange = (event)=>{
        let index = event.target.attributes["data-index"].value
        let type = event.target.attributes["data-type"].value
        let value = event.target.value
        let previousExpenses = currentUser.expenses
        let previousRecord = currentUser.expenses[index]
        setCurrentUser({
            ...currentUser,
            expenses: {
                ...previousExpenses,
                [index]: {
                    ...previousRecord,
                    [type]: value
                }
            }
        })
    }

    const onDeleteButton = (event) => {
        let index = event.target.attributes["data-index"].value
        let expensesCopy = currentUser.expenses
        delete expensesCopy[index]
        setCurrentUser({
            ...currentUser,
            expenses: expensesCopy
        })
        updateExpectedCash()
    }

    const onShowExpenses = () => {
        console.log(currentUser.expenses)
    }
    return (
        <div id="budgetTrackerPane">
            <h1 onClick={onShowExpenses}>Budget Tracker</h1>
            <div>
                <h2>Expected Remaining Cash</h2>
                <h2>₱{expectedCash.toLocaleString()}</h2>
            </div>
            <div>
                {Object.keys(currentUser.expenses).map((element, index)=>(
                    <div key={index}>
                        <input data-index={element} data-type="expense" value={currentUser.expenses[element]["expense"]} onChange={e => onInputChange(e)} type="text" placeholder="Expense Name"></input>
                        <input data-index={element} data-type="amount" value={currentUser.expenses[element]["amount"]} onChange={e => onInputChange(e)} type="number" placeholder="Expense Amount"></input>
                        <button data-index={element} onClick={e => onDeleteButton(e)}>Delete</button>
                    </div>
                    ))}
                <button id="addExpense" onClick={onAddExpense} id="addExpense"> Add Expense</button>
            </div>
        </div>
    )  
}

export default BudgetTracker