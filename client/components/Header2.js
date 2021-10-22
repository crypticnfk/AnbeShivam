import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/dist/client/link'
import { Context } from '../context/state';
import {
    useEffect,
    useState,
    useContext
} from 'react';
import {
    loadWeb3,
    connectAccount,
    loadBlockchainData,
    getAccountAddress,
    getGODSBalance,
    getNetwork
} from "../utils/web3-utils";


export default function Header2() {
    const [web3, setweb3] = useContext(Context);

    useEffect(async () => {
        if (web3) {
            await loadWeb3();
            const networkLoaded = await loadBlockchainData();
            if (networkLoaded) {
                const account = await getAccountAddress();
                setAccount(account);
                const GODSbalance = await getGODSBalance();
                setBalance(GODSbalance);
                const networkName = await getNetwork();
                setNetwork(networkName);
            }
        }
    }, [web3]);

    const [account, setAccount] = useState("Not Connected");
    const [godsBalance, setBalance] = useState(0);
    const [networkName, setNetwork] = useState("Unidentified Network");

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">AnbeShivam</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/projects"><Nav.Link href="#features">Projects</Nav.Link></Link>
                        <Link href="/nfts"><Nav.Link href="#pricing">My NFT'S</Nav.Link></Link>
                        <Link href="/add"><Nav.Link href="#pricing">Add Project</Nav.Link></Link>
                    </Nav>
                    <Nav>
                        {
                            account=="Not Connected" &&
                            <Nav><Button onClick={connectAccount}>Connect Wallet</Button></Nav>
                        }
                        {
                            account!="Not Connected" &&
                            <Nav.Link href="#deets">{ account.substring(0, 15) }{ account.length >= 10 && `.....` }</Nav.Link>
                        }
                        <Nav.Link href="#deets">{ godsBalance.toString() } GODS</Nav.Link>
                        <Nav.Link href="#deets">{ networkName }</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
