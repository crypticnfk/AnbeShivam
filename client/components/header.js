import { Context } from '../context/state';
import Link from 'next/link';
import { 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import { 
    loadWeb3, 
    loadBlockchainData, 
    getAccountAddress, 
    getGODSBalance,
    getNetwork
} from "../utils/web3-utils";

function Header() {
    const [web3, setweb3] = useContext(Context);

    useEffect(async() => {
        if(web3) {
            await loadWeb3();
            const networkLoaded = await loadBlockchainData();
            if(networkLoaded) {
                const account = await getAccountAddress();
                setAccount(account);
                const GODSbalance = await getGODSBalance();
                setBalance(GODSbalance);
                const networkName = await getNetwork();
                setNetwork(networkName);
            }
        }
    },[web3]);

    const [account, setAccount] = useState("Not Connected");
    const [godsBalance, setBalance] = useState(0);
    const [networkName, setNetwork] = useState("Unidentified Network");

    return (
        <div className="w3-top">
            <div className="w3-bar w3-red w3-card w3-left-align w3-large">
                <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onClick="myFunction()" title="Toggle Navigation Menu"><i className="fa fa-bars" /></a>
                <a href="/" className="w3-bar-item w3-button w3-padding-large w3-white">AnbeShivam</a>
               <Link href="/projects"><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Projecs</a></Link>
                <Link href = "/nfts"><a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">MY NFTs</a></Link>
                <Link href = "/add"><a  className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">ADD NFTs</a></Link>
                &nbsp;&nbsp;
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">{ account.substring(0, 15) }{ account.length >= 10 && `.....` }</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">{ godsBalance.toString() } GODS</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">{ networkName }</a>
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

export default Header;