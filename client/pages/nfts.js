import React from 'react'
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
import { AtomSpinner } from 'react-epic-spinners';
import styles from '../styles/Nfts.module.css'

function Nfts() {
    const [web3, setweb3] = useContext(Context);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nfts, setNfts] = useState([]);

    useEffect(async () => {
        if (web3) {
            setLoading(true);
            await loadWeb3();
            const isConnected = await loadBlockchainData();
            setConnected(isConnected);
            const isInvestor = await checkInvestor();
            if (!isInvestor) {
                window.location.href = "/";
            }
            const nfts = await getNFTs();
            let Nftms = [];
            for (var nft of nfts) {
                const mdata = await getNFTMetadata(nft.tokenID);
                mdata["tokenID"] = nft.tokenID;
                Nftms.push(mdata);
            }
            setNfts(Nftms);
            setLoading(false);
        }
    }, [web3]);

    const getNFTMetadata = async (id) => {
        const uri = await getTokenURI(id);
        let resp = await fetch(uri);
        let metadata = await resp.json();
        return metadata;
    }

    if (connected) {
        if (loading) {
            return (
              <div className="spinner">
                <AtomSpinner color="lightblue" size="150"/>
              </div>
            );
        } else {
        return (
                <div>
                    <br /><br />
                    {nfts.length == 0 &&
                        <div className="st-heading">
                        <h1 >You do not own any AnbeShivam NFTs</h1>
                        </div>
                    }
                    {nfts.length > 0 &&
                        <div className="st-heading">
                            <h1>Your NFTs</h1>
                            <br />
                        </div>
                    }
                      <div className={styles.band}>
                        {nfts.map((nft, key) => (

                                <Card style={{ width: '18rem' }} className={styles}>
                                    <Card.Img variant="top" alt="Not Available" src={nft.image} />
                                    <Card.Body>
                                        <Card.Title>{nft.name}</Card.Title>
                                        <Card.Text>Token ID: {nft.tokenID}<br /><br />
                                            {nft.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                
                        ))
                        }
                        
                    </div>
                </div>

        );
        }
    } else {
        return (
            <div>
                <br /><br />
                <div className="st-heading">
                <h1>Not Connected</h1>
                </div>
            </div>
        );
    }
}

export default Nfts;
