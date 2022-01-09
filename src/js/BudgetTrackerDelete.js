
function BudgetTrackerDelete(props){
    const { currentDeleteOption, dataIndex, onDeleteButton} = props

    if (currentDeleteOption===dataIndex){
        return(
            <div>
                <div data-index={dataIndex} onClick={e => onDeleteButton(e)}>
                    delete
                </div>
            </div>
        )
    } else {
        return null
    }

}

export default BudgetTrackerDelete