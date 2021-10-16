import styles from '../styles/Projects.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../context/state';
import React from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {
    useState,
    useEffect,
    useContext
} from "react";
import {
    loadWeb3,
    loadBlockchainData,
    getProjectNames,
    returnContent,
    checkInvestor,
    investFunds,
    fetchLatestPrice
} from '../utils/web3-utils';
import ProjectModal from '../components/modal';

function Projects() {
    const [web3, setweb3] = useContext(Context);
    const [connected, setConnected] = useState(false);
    const [projects, setProjects] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [chosenProject, chooseProject] = useState(null);
    const [maticusd, setMaticusd] = useState(0);

    useEffect(async () => {
        if (web3) {
            await loadWeb3();
            const isConnected = await loadBlockchainData();
            setConnected(isConnected);
            const projectNames = await getProjectNames();
            setProjects(projectNames);
            const isInvestor = await checkInvestor();
            if (!isInvestor) {
                window.location.href = "/";
            }
            setMaticusd(await fetchLatestPrice());
        }
    }, [web3]);

    const getProject = async (event) => {
        returnContent(event.target.value)
            .then(result => {
                if (result) {
                    chooseProject(result);
                    setModalShow(true);
                }
            })
    }

    const investInProject = async (amount) => {
        const metadata = {
            name: "AnbeShivam Investor - Project " + chosenProject.name,
            description: "Certificate of Investment in project " + chosenProject.name + " on the AnbeShivam Protocol",
            image: "https://ipfs.infura.io/ipfs/QmUA8rokQCEgF67K37Gmbeuq4SN9VEviSVtQxuUzNKZAN3"
        }
        const metadataString = JSON.stringify(metadata);
        await investFunds(chosenProject.id, metadataString, amount);
    }

    if (connected) {
        return (
            <>
                <div className="col-md-6 offset-md-3 mt-5">
                    <br /><br />
                    {projects.length == 0 &&
                        <h1 className={styles.heading}>No Projects to display</h1>
                    }
                    {projects.length > 0 &&
                        <div>
                            <div className="st-heading">
                            <h1 className>Projects</h1>
                            </div>
                            {projects.map((project, key) => (

                                <Card>
                                    <Card.Header>{project}</Card.Header>
                                    <Card.Body>
                                        <Button id={key} value={key} variant="primary" onClick={getProject}>View Details</Button>
                                    </Card.Body>
                                </Card>
                                

                            ))
                            }
                            <ProjectModal
                                show={modalShow}
                                maticusd={maticusd}
                                project={chosenProject}
                                investInProject={(amount) => investInProject(amount)}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    }
                </div>
            </>
        );
    } else {
        return (
            <div>
                <br /><br />
                <h1>Not Connected</h1>
            </div>
        );
    }
}

export default Projects;
