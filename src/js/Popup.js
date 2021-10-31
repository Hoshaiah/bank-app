function Popup (props){
    const {onCancelClick, onSubmitClick, popupName, popupInputs} = props

    // let inputs = []
    // for (let i = 0; i< popupInputs.length; i ++){
    //     inputs.push(
    //         <label for=""> {popupInputs[i][0]}</label>
    //         <input type="text" id="accnumber"></input>
    //     )
    // } 
    return(
        <div className="popup"> 
            <h1>{popupName}</h1>
            <div id="popupInputs">
                {popupInputs.map((element, index) => (
                    <div key={index}>
                        <label for="accnumber">{element[0]}</label>
                        <input type={element[1]} id="accnumber" placeholder={element[2]}></input>
                    </div>
                ))}
            </div>
            <div id="popupButtons">
                <button id="cancelButton" onClick={onCancelClick}>Cancel</button>
                <button id="submitButton" onClick={onSubmitClick}>Submit</button>
            </div>
        </div>
    )
}

export default Popup;