import { 
  useEffect, 
  useState, 
  useContext 
} from 'react';
import { Context } from '../context/state';
import { 
  loadWeb3, 
  loadBlockchainData, 
  checkInvestor
} from '../utils/web3-utils';
import { AtomSpinner } from 'react-epic-spinners';
import styles from '../styles/Home.module.css';

function Home() {
  const [web3, setWeb3] = useContext(Context); 

  useEffect(async() => {
    if(web3) {
      setLoading(true);
      await loadWeb3();
      const isConnected = await loadBlockchainData();
      setConnected(isConnected);
      setLoading(false);
    }
  },[web3]);

  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkUser = async() => {
    if(!connected) {
      window.alert("Please connect your wallet first and use Polygon or Mumbai Network");
    } else {
      const isInvestor = await checkInvestor();
      if(isInvestor) {
        window.alert("Welcome to AnbeShivam");
        window.location.href = "/projects";
      } else {
        window.alert("Sorry, You do not meet the requirements to access the platform");
      }
    }
  }

  if (loading) {
    return (
      <div className="spinner">
        <AtomSpinner color="lightblue" size="150"/>
      </div>
    );
  } else {
    return (
      
      <div className={styles.main}>
        <div className="w3-container w3-red w3-center" style={{ padding: '128px 16px' }}>
          <h1 className="w3-margin w3-jumbo">AnbeShivam</h1>
          <p className="w3-xlarge">Project Funding, Simplified and Decentralized</p>
          <button className="w3-button w3-black w3-padding-large w3-large w3-margin-top" onClick={checkUser}>Enter App</button>
        </div>
        {/* First Grid */}
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1>Lorem Ipsum</h1>
              <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
              <p className="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="w3-third w3-center">
              <i className="fa fa-anchor w3-padding-64 w3-text-red" />
            </div>
          </div>
        </div>
        {/* Second Grid */}
        <div className="w3-row-padding w3-light-grey w3-padding-64">
          <div className="w3-content">
            <div className="w3-third w3-center">
              <i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right" />
            </div>
            <div className="w3-twothird">
              <h1>Lorem Ipsum</h1>
              <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
              <p className="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          
        </div>
      </div>

    );
  }
}

export default Home;