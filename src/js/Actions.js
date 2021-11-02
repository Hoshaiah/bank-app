import send from '../img/send.png';
import deposit from '../img/deposit.png';
import bank from '../img/bank.png';
import withdraw from '../img/withdraw.png';
import request from '../img/request.png';

function Actions(props) {
    const {setOverlayVisibility, setPopupName, setPopupAction } = props

    const onSendClick = () =>  {
        setPopupName("Send Money")
        setOverlayVisibility("visible")
        setPopupAction("Send")
      }
    
    const onWithdrawClick = () => {
        setPopupName("Withdraw from Wallet")
        setOverlayVisibility("visible")
        setPopupAction("Withdraw")
    }
    
    const onRequestClick = () =>  {
        setPopupName("Request from Another Account")
        setOverlayVisibility("visible")
        setPopupAction("Request")
    }
    
    const onLinkclick = () =>  {
        setPopupName("Link Bank Account")
        setOverlayVisibility("visible")
        setPopupAction("Link")
    }
    
    const onDepositClick = () =>  {
        setPopupName("Deposit to Wallet")
        setOverlayVisibility("visible")
        setPopupAction("Deposit")
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