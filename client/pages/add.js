import { useState } from "react";
import styles from '../styles/AddContent.module.css'
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')

function AddContent() {

    const [inputs, setInputs] = useState({});
    const [file, updateFile] = useState(``)
    const [url, updateUrl] = useState(``)

    const handleChange = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleFile = (event) =>{
   
        updateFile(event.target.files[0])
    }
    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url)
            updateUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
        console.log(url)
    }
    return (
        <div className="col-md-6 offset-md-3 mt-5">

            <h1 className={styles.heading}>Add your NFT</h1>
            <form acceptCharset="UTF-8" method="POST" onSubmit={handleSubmit} target="_blank" className={styles.addMain}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">NFT Name</label>
                    <input type="text" name="name" className="form-control" id="exampleInputName" placeholder="Enter your NFT Name" required="required" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">NFT Type</label>
                    <select className="form-control" id="exampleFormControlSelect1" name="platform" required="required" onChange={handleChange}>
                        <option>Image</option>
                        <option>Video</option>
                        <option>Audio</option>
                    </select>
                </div>
                <hr />
                <div className="form-group mt-3">
                    <label className="mr-2">Upload your file:</label>
                    <input type="file" name="file" onChange={handleFile} />
                </div>
                <hr />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddContent;