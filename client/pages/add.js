import { useState, useEffect } from "react";
import styles from '../styles/AddContent.module.css'
import { create } from 'ipfs-http-client';
import { loadWeb3, loadBlockchainData, addContent } from '../utils/web3-utils';

const client = create('https://ipfs.infura.io:5001/api/v0')

function AddContent() {

    useEffect(async() => {
        const isConnected = await loadWeb3();
        setConnected(isConnected);
        if(isConnected) {
            await loadBlockchainData();
        }
    },[]);

    const [connected, setConnected] = useState(false);
    const [inputs, setInputs] = useState({});
    const [file, updateFile] = useState(``);
    const [url, updateUrl] = useState(``);

    const handleChange = (event) => {        
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleFile = (event) =>{   
        updateFile(event.target.files[0]);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const added = await client.add(file);
            const pathUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
            console.log(pathUrl)
            updateUrl(pathUrl)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
        await addContent(inputs.name, url);
    }

    if(connected) {
        return (
            <div className="col-md-6 offset-md-3 mt-5">

                <h1 className={styles.heading}>Add a New Project</h1>
                <form acceptCharset="UTF-8" method="POST" onSubmit={handleSubmit} target="_blank" className={styles.addMain}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Project Name</label>
                        <input type="text" name="name" className="form-control" id="exampleInputName" placeholder="Enter Project Name" required="required" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Content Type</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="platform" required="required" onChange={handleChange}>
                            <option>Image</option>
                            <option>Video</option>
                            <option>Audio</option>
                        </select>
                    </div>
                    <hr />
                    <div className="form-group mt-3">
                        <label className="mr-2">Upload Project Content: </label>
                        &nbsp;&nbsp;    
                        <input type="file" name="file" onChange={handleFile} />
                    </div>
                    <hr />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
        } else {
            return(
                <div className="col-md-6 offset-md-3 mt-5">
                    <h2>Not Connected</h2>
                </div>
            );
        }
}

export default AddContent;