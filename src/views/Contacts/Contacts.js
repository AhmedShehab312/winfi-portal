import React from 'react';
import { CardBody, CardHeader, Col } from 'reactstrap';

class Contacts extends React.Component {

    render() {
        return (
            <div className="content">
                <CardHeader>
                    <Col>
                        <h2 className="title">Contacts</h2>
                    </Col>
                </CardHeader>
                <CardBody>
                </CardBody>
            </div>
        )
    }
}

export default Contacts;