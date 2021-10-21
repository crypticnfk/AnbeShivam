import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

function ProjectModal(props) {
    const [amount, setAmount] = useState(2);

    return (
        <Modal
            {...props}
            size="lg"            
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.project !== null &&
            <>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>{props.project.name}</h2>
                    <br/>
                    <h6>Project Owner: {props.project.creator}</h6>
                </Modal.Title>
                </Modal.Header>
                <center>
                <br/>
                <p style={{fontSize: 20, color: "crimson"}}>Funds Received: ${(props.project.receivedFunds*props.maticusd / 10**18).toFixed(2)}</p>
                <Modal.Body>
                <h4>Project Pitch</h4>
                <img style={{ alignSelf: 'center' }} alt="Not Available" src={props.project.fileURL} height="400" width="600" />
                </Modal.Body>
                <br/>
                <h4>Choose an Amount</h4>
                <RangeSlider
                    value={amount}
                    min={2}
                    max={1000}
                    tooltip='off'
                    onChange={event => setAmount(event.target.value)}
                />
                <p style={{fontSize: 20, color: "indigo"}}>${(amount*props.maticusd).toFixed(2)}</p>
                <p style={{fontSize: 20, color: "indigo"}}>{amount} MATIC</p>
                <Button onClick={() => props.investInProject(amount)}>Invest in this Project</Button>
                <br/><br/>
                </center>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </>
            }    
            {props.project === null &&
            <div>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Project Content Not Available
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Unavailable</h4>
                <p>
                    Nothing to Display
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </div>
            }   
        </Modal>
    );
  }

  export default ProjectModal;