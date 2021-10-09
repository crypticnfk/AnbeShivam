import { useEffect, useState } from 'react';
import { useAppContext } from '../context/state';
import { getAccountAddress, loadBlockchainData, getGODSBalance, loadWeb3 } from "../utils/web3-utils";
import { fetchLatestPrice } from '../utils/priceFeed';

function Header() {
    let appContext = useAppContext();

    useEffect(async() => {
        await loadWeb3();
        await loadBlockchainData();
        const account = await getAccountAddress();
        setAccount(account);
        const GODSbalance = await getGODSBalance();
        setBalance(GODSbalance);
    },[]);

    const [account, setAccount] = useState("Not detected");
    const [godsBalance, setBalance] = useState(0);

    return (
        <div className="w3-top">
            <div className="w3-bar w3-red w3-card w3-left-align w3-large">
                <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onClick="myFunction()" title="Toggle Navigation Menu"><i className="fa fa-bars" /></a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large w3-white">AnbeShivam</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Projects</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">NFTs</a>
                &nbsp;&nbsp;
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">{account.substring(0, 15) }{ account.length >= 10 && `.....` }</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">{ godsBalance.toString() } GODS</a>
            </div>
            
            {/* Navbar on small screens */}
            <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 4</a>
            </div>
        </div>
    );
}

export default Header