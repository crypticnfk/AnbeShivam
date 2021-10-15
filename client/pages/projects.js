import { Context } from '../context/state';
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

    useEffect(async() => {
        if(web3) {
            await loadWeb3();
            const isConnected = await loadBlockchainData();
            setConnected(isConnected);
            const projectNames = await getProjectNames();
            setProjects(projectNames);
            const isInvestor = await checkInvestor();
            if(!isInvestor) {
                window.location.href = "/";
            }
            setMaticusd(await fetchLatestPrice());
        }
    },[web3]);

    const getProject = async(event) => {
        returnContent(event.target.value)
        .then(result => {
            if(result) {
                chooseProject(result);
                setModalShow(true);
            }
        })
    }

    const investInProject = async(amount) => {
        const metadata = {
            name: "AnbeShivam Investor - Project "+chosenProject.name,
            description: "Certificate of Investment in project "+chosenProject.name+" on the AnbeShivam Protocol",
            image: "https://ipfs.infura.io/ipfs/QmY9LjfT4z3A1vwxaRPTaQ4DPhwfgJmzTaJsa7N1RdSgu9"
        }
        const metadataString = JSON.stringify(metadata);
        await investFunds(chosenProject.id, metadataString, amount);
    }

    if(connected) {
        return(
            <>
            <div>
            <br/><br/>     
            {projects.length == 0 &&
                <h1>No Projects</h1>
            }     
            {projects.length > 0 &&
            <div>
                <h1>Projects</h1>
            {projects.map((project, key) => (
                <div>
                    <h4>{project}</h4>
                    <button id={key} className="w3-button w3-black w3-padding-small w3-small w3-margin-top" value={key} onClick={getProject}>View</button>
                    <br/>
                </div>
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
        return(
            <div>
                <br/><br/>
                <h1>Not Connected</h1>
            </div>
        );
    }
}

export default Projects;
