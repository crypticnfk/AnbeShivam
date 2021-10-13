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
    checkInvestor
} from '../utils/web3-utils';

function Projects() {
    const [web3, setweb3] = useContext(Context);
    const [connected, setConnected] = useState(false);
    const [projects, setProjects] = useState([]);

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
        }
    },[web3]);

    if(connected) {
        return(
            <div>
            <br/><br/>
                <h1>Projects</h1>
            {projects.map((project, key) => (
                <h4>{project}</h4>
            ))}
            </div>
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
