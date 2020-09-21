import React from 'react';
import {
    Table,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    UncontrolledTooltip,
    Form, FormGroup, Input,
    Button
} from 'reactstrap';
import './BranchesStyle.scss';
import NotificationAlert from "react-notification-alert";
import { InputWithText, DropDown } from '../../components/ComponentModule'
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';

class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            brands: null,
            selectedBrand: null,
            Branchs: null,
            selectedBranch: null,
            newBranch: {
                name: "",
                BrandId: "",
            },
            selectedBranchIndex: null,



        }
    }

    notify = (place, color, msg) => {
        // var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {msg}
                    </div>
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    RemoveItem(key, item) {
        const { data } = this.state;
        let reslut = data.filter((Item, index) => { return key !== index })
        this.setState({ data: reslut })
        this.notify("tr", 3, "The item deleted successfully")
    }


    RemoveItem(key, Item) {
        const { Branchs } = this.state;

        HtttpDeleteDefult("branch/" + Item.id + "").then((res) => {
            if (res) {
                let reslut = Branchs.filter((Item, index) => { return key !== index })
                this.setState({ Branchs: reslut })
                displayToast('done', true);

            }
        })
    }


    componentDidMount() {
        const { OwnerProfile } = this.props;
        if (OwnerProfile && OwnerProfile.brands.length > 0) {
            this.setState({ brands: OwnerProfile.brands, selectedBrand: OwnerProfile.brands[0] }, () => {
                this.selectedBrand(OwnerProfile.brands[0])
            })
        }
    }

    selectedBrand(Item) {
        this.setState({ selectedBrand: Item })
        HtttpGetDefult('brand/' + Item.id + '').then((res) => {
            console.log(res)
            this.setState({ Branchs: res.branches })
        })
    }

    changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        name: val
                    }
                })
                break;
        }

    }


    changeNewInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        name: val
                    }
                })
                break;
        }

    }
    addNewBranch() {
        const { newBranch, Branchs, selectedBrand } = this.state;
        this.setState({ addMode: false, editMode: false, detailsMode: false });
        newBranch.BrandId = selectedBrand.id;
        HtttpPostDefult("branch/create", newBranch).then((res) => {
            if (res) {
                Branchs.push(res);
                this.setState({ Branchs: Branchs });
                displayToast('done', true);
            }
        })
    }

    EditBranch() {
        const { selectedBranch, selectedBranchIndex, Branchs } = this.state;
        this.setState({ addMode: false, editMode: false, detailsMode: false });
        HtttpPutDefult("branch/" + selectedBranch.id + "", selectedBranch).then((res) => {
            if (res) {
                Branchs[selectedBranchIndex] = selectedBranch;
                this.setState({ Branchs: Branchs });
                displayToast('done', true);
            }
        })

    }

    render() {
        const { editMode, addMode, detailsMode, selectedBrand, brands, Branchs, selectedBranch } = this.state;
        return (
            <div className="content Branches">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>

                <Col md="11">
                    <Card>
                        {brands &&
                            <Row>
                                <FormGroup className="dropDownContainer">
                                    <h2 className="title">{i18n.t("Branches.SelectBrand")}</h2>
                                    <DropDown label={i18n.t("Brands.title")} items={brands} onClick={(val) => { this.selectedBrand(val) }} selctedItem={selectedBrand} />
                                </FormGroup>
                            </Row>
                        }
                        {!editMode && !addMode && !detailsMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Branches.title")}</h2>
                                        </Col>
                                        {Branchs && Branchs.length > 0 && <Col className="AddContainer">
                                            <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="Add">{i18n.t("Branches.add")}</UncontrolledTooltip>
                                        </Col>
                                        }
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {
                                        Branchs && Branchs.length > 0 ?
                                            <Table className="tablesorter" responsive hover>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th className="text-center">{i18n.t("global.ID")}</th>
                                                        <th className="text-center">{i18n.t("Branches.Name")}</th>
                                                        <th className="text-center">{i18n.t("Branches.brandName")}</th>
                                                        <th className="text-center">{i18n.t("Branches.Edit")}</th>
                                                        <th className="text-center">{i18n.t("Branches.Details")}</th>
                                                        <th className="text-center">{i18n.t("Branches.Delete")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Branchs && Branchs.map((Item, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td className="text-center">{Item.id}</td>
                                                                <td className="text-center">{Item.name}</td>
                                                                <td className="text-center">{selectedBrand.name}</td>
                                                                <td className="text-center"><i className="fa fa-edit" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBranch: Item, detailsMode: false, selectedBranchIndex: key }) }} /></td>
                                                                <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedBranch: Item, detailsMode: true })} /></td>
                                                                <td className="text-center"><i className="fas fa-trash-alt" onClick={() => this.RemoveItem(key, Item)} /></td>
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
                        {!editMode && addMode && !detailsMode &&
                            //Add Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Branches.add")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Branches.Name")} placeholder={i18n.t("Branches.NamePlacholder")} onChange={(val) => { this.changeNewInput('name', val) }} />
                                            </Col>
                                        </Row>
                                        <Button onClick={() => this.addNewBranch()}>{i18n.t("global.submit")}</Button>
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>{i18n.t("global.cancel")}</Button>

                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }

                        {editMode && !addMode && !detailsMode &&
                            // Edit Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Branches.editBranch")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Branches.Name")} placeholder={i18n.t("Branches.NamePlacholder")} onChange={(val) => { this.changeEditInput('name', val) }} value={selectedBranch.name} />
                                            </Col>
                                        </Row>
                                        <Button onClick={() => this.EditBranch()}>{i18n.t("global.submit")}</Button>
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>{i18n.t("global.cancel")}</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }

                        {!editMode && !addMode && detailsMode &&
                            // Branch Details
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedBrand.name} {i18n.t("Branches.Details")}</h2>
                                            <h3 className="Subtitle">{i18n.t("Branches.BasicInfo")}</h3>
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
                                                <label className="item">{i18n.t("Branches.Name")}:</label>
                                                <label className="value">{selectedBranch.name}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.BrandName")}:</label>
                                                <label className="value">{selectedBrand.name}</label>
                                            </Col>
                                        </Row>

                                        {/* <hr className="sperator" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Branches.PackgeInfo")}</h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedSMS")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalSMS}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedNotification")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalNotification}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedEmails")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalEmails}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.RenewalDate")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.renewalDate}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="sperator" />
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Branches.Router")} </h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Table className="tablesorter" responsive striped>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th className="text-center"> {i18n.t("Branches.Name")}</th>
                                                    <th className="text-center"> {i18n.t("Branches.IP")} </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedBrand.routerAccessPoint.map((Item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="text-center">{Item.name}</td>
                                                            <td className="text-center">{Item.ip}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                     */}
                                    </div>

                                </CardBody>
                            </React.Fragment>
                        }

                    </Card>
                </Col>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.ProfileState.OwnerProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Branches);

