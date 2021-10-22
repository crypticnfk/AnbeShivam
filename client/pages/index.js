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
              <h1>Overview</h1>
              <h5 className="w3-padding-32">AnbeShivam works as a decentralized and completely transparent project funding platform which allows only accredited investors to access the platform content</h5>
              <br/>
              <img src='https://bafkreid67fadbf2tsamv56rajryljl75devicxcra2y3hac7lerohnm5fm.ipfs.dweb.link/' alt="AnbeShivam flow" width="800" height="400" />
              <br/><br/>
              <p className="w3-text-grey">Only wallets having a minimum balance (currently 2 MATIC) are allowed access to the AnbeShivam platform.
              Here, the investors can view pitches and other content related to the listed projects and send funds towards the project.
              <br/>
              The platform then rewards investors with $GODS and exclusive AnbeShivam NFTs in return. <br/> 
              Accounts owning AnbeShivam NFTs are also whitelisted and subsequently become eligible to gain access to the platform, even without having
              to meet the minimum balance criterion.</p>
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
              <h1>Investment Process</h1>
              <br/>
              <img src='https://bafkreibddmgu66zumxeqj4wyrvdyqruyr5rvpeo7vudekxhtyzzwtsckbq.ipfs.dweb.link/' alt="AnbeShivam flow" width="700" height="150" />
              <br/><br/>
              <h5 className="w3-padding-32">Investors can access pitch content on the platform and each time and event will be emitted while doing so. This 
              will act as proof of the content being accessed. On pledging or sending funds towards a project, the investor receives an equivalent amount of 
              $GODS and an AnbeShivam NFT in return. The NFT also acts an investor badge, signifying their involvment as an investor on the AnbeShivam protocol.</h5>
              <br/>
              {/* <p className="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p> */}
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