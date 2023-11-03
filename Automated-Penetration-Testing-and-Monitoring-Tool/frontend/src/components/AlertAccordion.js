import React from "react";
import { Accordion, Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './myClasses.css';

class AlertAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accData: {
              alerts: props.alertData
            }
          }
    }

    render() {
        const items = this.state.accData.alerts;

        return (
            <div>
                <h3 className='mt-5'>Alerts</h3>
                {
                    items.map(item => (

                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className={item.color}>
                                <div className="card-title">{item.name}</div>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="acc-card-body-color">
                                    <div className="acc-card-body">Description: {item.desc}</div>
                                    <div className="acc-card-body">Solution: {item.soln}</div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))}
                
            </div>
        );
    }
}

export default AlertAccordion;