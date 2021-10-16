import { Context } from '../context/state';
import { 
    useState, 
    useEffect,
    useContext 
} from "react";
import { 
    loadWeb3, 
    loadBlockchainData,
    checkInvestor,
    getNFTs,
    getTokenURI
} from '../utils/web3-utils';
import { Card } from 'react-bootstrap';

function Nfts() {
    const [web3, setweb3] = useContext(Context);
    const [connected, setConnected] = useState(false);
    const [nfts, setNfts] = useState([]);

    useEffect(async() => {
        if(web3) {
            await loadWeb3();
            const isConnected = await loadBlockchainData();
            setConnected(isConnected);
            const isInvestor = await checkInvestor();
            if(!isInvestor) {
                window.location.href = "/";
            }
            const nfts = await getNFTs();
            let Nftms = [];
            for(var nft of nfts) {
                const mdata = await getNFTMetadata(nft.tokenID);
                mdata["tokenID"] = nft.tokenID;
                Nftms.push(mdata);
            }
            setNfts(Nftms);
            console.log(Nftms)
        }
    },[web3]);

    const getNFTMetadata = async(id) => {
        const metadataString = await getTokenURI(id);
        const metadata = JSON.parse(metadataString);
        return metadata;
    }

    if(connected) {
        return(
            <>
            <div>
            <br/><br/>     
            {nfts.length == 0 &&
                <h1>You do not own any AnbeShivam NFTs</h1>
            }     
            {nfts.length > 0 &&
                <div>
                    <h1>Your NFTs</h1>
                    <br/>
                </div>
            }
            {nfts.map((nft, key) => (
                <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" alt="Not Available" src={nft.image} />
                    <Card.Body>
                        <Card.Title>{nft.name}</Card.Title>
                        <Card.Text>Token ID: {nft.tokenID}<br/><br/>
                            {nft.description}
                        </Card.Text>
                    </Card.Body>
                    </Card>               
                    <br/><br/>
                </div>
             ))
            }
            </div>
            </>
        );
    } else {
        return(
            <div>
                <br/><br/>
                <h1>Not Connected</h1>
            </div>
        );
    }
}

export default Nfts;
