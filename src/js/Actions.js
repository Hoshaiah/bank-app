import send from '../img/send.png';
import deposit from '../img/deposit.png';
import bank from '../img/bank.png';
import withdraw from '../img/withdraw.png';
import request from '../img/request.png';

function Actions(props) {
    const {setOverlayVisibility, setPopupInputs,setPopupName } = props

    const onSendClick = () =>  {
        setPopupName("Send Money")
        setOverlayVisibility("visible")
        setPopupInputs([
            ["Send to Account","text","0917 999 999"],
            ["Amount","number","P100.00"],
            ["Notes","text","e.g for Payment to John Doe"]
        ])
      }
    
    const onWithdrawClick = () => {
        setPopupName("Withdraw from Wallet")
        setOverlayVisibility("visible")
        setPopupInputs([
            ["From Bank Account","text","BPI"],
            ["Move to Account","text","0000 0000 0000"],
            ["Amount","number","P100.00"],
        ])
    }
    
    const onRequestClick = () =>  {
        setPopupName("Request from Another Account")
        setOverlayVisibility("visible")
        setPopupInputs([
            ["Request from","text","0999 999 9999"],
            ["Amount","number","P100.00"],
            ["Notes","text","e.g. for refund of item"]
        ])
    }
    
    const onLinkclick = () =>  {
        setPopupName("Link Bank Account")
        setOverlayVisibility("visible")
        setPopupInputs([
            ["Bank","text","BPI"],
            ["Account Number","number","0000 0000 0000"],
        ])
    }
    
    const onDepositClick = () =>  {
        setPopupName("Deposit to Wallet")
        setOverlayVisibility("visible")
        setPopupInputs([
            ["From Bank Account","text","BPI"],
            ["Move to Account","text","0000 0000 0000"],
            ["Amount","number","P100.00"],
        ])
    }
    

    return (
        <div id= "actions">
            <div id="send" onClick= {onSendClick}> <div id="senddiv"> <img src={send} alt=""></img> </div>Send</div>
            <div id="request" onClick= {onRequestClick}> <div id="requestdiv"> <img src={request} alt=""></img> </div> Request</div>
            <div id="link" onClick= {onLinkclick}> <div id="bankdiv"> <img src={bank} alt=""></img> </div>Link Bank</div>
            <div id="withdraw" onClick= {onWithdrawClick}> <div id="withdrawdiv"> <img src={withdraw} alt=""></img> </div> Withdraw</div>
            <div id="deposit" onClick= {onDepositClick}> <div id="depositdiv"> <img src={deposit} alt=""></img> </div> Deposit</div>
        </div>
    )
}

export default Actions