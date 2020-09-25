import React from 'react';
import {
    Table,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    UncontrolledTooltip,
    Form,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import i18n from '../../i18n';

class Admins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            admins: [
                {
                    id: '',
                    name: '',

                },
            ],
            selectedAdmin: null,
            selectedAdminIndex: null

        }

    }
    profileData;

    componentDidMount() {
        this.getAdmins();
    }

    getAdmins() {
        HtttpGetDefult('customer/list').then((res) => {
            if (res) {
                this.setState({ admins: res })
            }
        })
    }

    RemoveItem(Item, key) {

    }


    render() {
        const { admins, editMode, addMode, detailsMode, selectedAdmin } = this.state;

        return (
            <div className="content Brands Admins">
                <Col md="11">
                    <Card>
                        {!editMode && !addMode && !detailsMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Col>
                                        <h2 className="title">{i18n.t("Admins.title")}</h2>
                                    </Col>
                                    {/* {admins && admins.length > 0 &&
                                        <Col className="AddContainer">
                                            <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="Add">{i18n.t("Brands.add")}</UncontrolledTooltip>
                                        </Col>} */}
                                </CardHeader>
                                <CardBody>
                                    {admins && admins.length > 0 ? <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">{i18n.t("global.ID")}</th>
                                                <th className="text-center">{i18n.t("Brands.Name")}</th>
                                                <th className="text-center">{i18n.t("Admins.Role")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                {/* <th className="text-center">{i18n.t("Brands.Edit")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                <th className="text-center">{i18n.t("Brands.Delete")}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.id}</td>
                                                        <td className="text-center">{Item.name}</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedAdmin: Item, detailsMode: true, selectedAdminIndex: key })} /></td>
                                                        {/* <td className="text-center"><i className="fa fa-edit" onClick={() => { this.setState({ addMode: false, editMode: true, selectedAdmin: Item, detailsMode: false, selectedAdminIndex: key }) }} /></td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedAdmin: Item, detailsMode: true, selectedAdminIndex: key })} /></td>
                                                        <td className="text-center"><i className="fas fa-trash-alt" onClick={() => this.RemoveItem(key, Item)} /></td> */}
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table> :
                                        <h2 className="noResult text-center">{i18n.t("global.noResult")}</h2>
                                    }
                                </CardBody>
                            </React.Fragment>
                        }
                        {!editMode && !addMode && detailsMode &&
                            // Details Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedAdmin.username} {i18n.t("Brands.Details")}</h2>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-minimal-right" id="up" onClick={() => { this.setState({ addMode: false, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="up">{i18n.t("global.Back")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Name")}:</label>
                                                <label className="value">{selectedAdmin.name}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Login.UserName")}:</label>
                                                <label className="value">{selectedAdmin.username}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Login.Password")}:</label>
                                                <label className="value">{selectedAdmin.password}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Admins.Role")}:</label>
                                                <label className="value">{"0"}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                    {selectedAdmin.brands.length > 0 &&
                                        <React.Fragment>
                                            <hr className="sperator" />
                                            <Row>
                                                <Col>
                                                    <h3 className="Subtitle">{i18n.t("Brands.title")} </h3>
                                                </Col>
                                            </Row>
                                            <div className="dataContainer">
                                                <Table className="tablesorter" responsive hover>
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th className="text-center">{i18n.t("global.ID")}</th>
                                                            <th className="text-center">{i18n.t("Brands.Name")}</th>
                                                            {/* <th className="text-center">{i18n.t("Brands.Address")}</th> */}
                                                            <th className="text-center">{i18n.t("Brands.Package")}</th>
                                                            {/* <th className="text-center">{i18n.t("Brands.Edit")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                <th className="text-center">{i18n.t("Brands.Delete")}</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedAdmin.brands.map((Item, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td className="text-center">{Item.id}</td>
                                                                    <td className="text-center">{Item.name}</td>
                                                                    {/* <td className="text-center">{Item.address}</td> */}
                                                                    <td className="text-center">0</td>
                                                                    {/* <td className="text-center"><i className="fa fa-edit" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBrand: Item, detailsMode: false, selectedBrandIndex: key }) }} /></td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedBrand: Item, detailsMode: true, selectedBrandIndex: key })} /></td>
                                                        <td className="text-center"><i className="fas fa-trash-alt" onClick={() => this.RemoveItem(key, Item)} /></td> */}

                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </React.Fragment>}
                                </CardBody>
                            </React.Fragment>
                        }
                    </Card>
                </Col>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.ProfileState.OwnerProfile,
    };
};




export default connect(mapStateToProps, null)(Admins);


