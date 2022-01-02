import { useEffect, useState } from "react"

function BudgetTracker(props) {
    const {setCurrentUser, currentUser} = props
    const [counter, setCounter ] = useState(currentUser.username)
    const [expectedCash, setExpectedCash] = useState(currentUser.wallet)


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
                    <div className="budgetItem" key={index}>
                        <input data-index={element} data-type="expense" value={currentUser.expenses[element]["expense"]} onChange={e => onInputChange(e)} type="text" placeholder="Expense Name"></input>
                        <input data-index={element} data-type="amount" value={currentUser.expenses[element]["amount"]} onChange={e => onInputChange(e)} type="number" placeholder="Expense Amount"></input>
                        <button className="deleteButton" data-index={element} onClick={e => onDeleteButton(e)}>
                        </button>
                    </div>
                    ))}
                <button id="addExpense" onClick={onAddExpense} id="addExpense"> Add Expense</button>
            </div>
        </div>
    )  
}

export default BudgetTracker