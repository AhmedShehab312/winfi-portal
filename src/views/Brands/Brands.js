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
    Button
} from 'reactstrap';
import './BrandsStyle.scss';
import NotificationAlert from "react-notification-alert";
import { InputWithText, DropDown } from '../../components/ComponentModule'
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult } from '../../actions/httpClient';
import i18n from '../../i18n';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';

class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            selectedBrandIndex: null,
            data: [
                {
                    id: '',
                    name: '',
                    // address: "Cairo",
                    // assignedPackage: { name: "A", key: 1 },
                    // usedFrompackage: {
                    //     totalSMS: '20',
                    //     totalNotification: '65',
                    //     totalEmails: '22',
                    //     renewalDate: '12-2-2021'
                    // }
                },
            ],
            selectedBrand: null,
            newBrand: {
                name: "kentucky",
                logo: "",
                CustomerId: "1",
                PackageId: null
            },
            Packges: [
                { name: "A", key: 1 },
                { name: "B", key: 2 }
            ],
        }

    }
    profileData;

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



    componentDidMount() {
        const { OwnerProfile } = this.props;
        if (OwnerProfile) {
            this.profileData = OwnerProfile;
            this.setState({ data: OwnerProfile.brands })
        }
    }




    changeNewInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        name: val
                    }
                })
                break;
            // case 'address':
            //     this.setState({
            //         newBrand: {
            //             ...this.state.newBrand,
            //             address: val
            //         }
            //     })
            //     break;
            // case 'assignedPackage':
            //     this.setState({
            //         newBrand: {
            //             ...this.state.newBrand,
            //             assignedPackage: val
            //         }
            //     })
            //     break;
        }

    }

    changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        name: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        address: val
                    }
                })
                break;
            case 'assignedPackage':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        assignedPackage: val
                    }
                })
                break;
        }

    }


    changePhoto(event) {
        event.preventDefault();
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                newBrand: {
                    ...this.state.newBrand,
                    logo: [reader.result]
                }
            })
        }.bind(this);
    }

    addNewBrand() {
        const { newBrand } = this.state;
        const { storeProfile } = this.props;

        this.setState({ addMode: false, editMode: false, detailsMode: false });
        HtttpPostDefult("brand/create", newBrand).then((res) => {
            if (res) {
                this.profileData.brands.push(res);
                storeProfile(this.profileData);
                this.setState({ data: this.profileData.brands });
                displayToast('done', true);
            }
        })
    }

    editBrand() {
        const { selectedBrandIndex, selectedBrand } = this.state;
        const { storeProfile } = this.props;
        this.setState({ addMode: false, editMode: false, detailsMode: false });
        HtttpPutDefult("brand/" + selectedBrand.id + "", selectedBrand).then((res) => {
            if (res) {
                this.profileData.brands[selectedBrandIndex] = selectedBrand;
                storeProfile(this.profileData);
                this.setState({ data: this.profileData.brands });
                displayToast('done', true);
            }
        })
    }

    RemoveItem(key, Item) {
        const { data } = this.state;
        const { storeProfile } = this.props;

        HtttpDeleteDefult("brand/" + Item.id + "").then((res) => {
            if (res) {
                let reslut = data.filter((Item, index) => { return key !== index })
                this.setState({ data: reslut })
                this.profileData.brands = reslut
                storeProfile(this.profileData);
                displayToast('done', true);

            }
        })
    }

    render() {
        const { data, editMode, addMode, detailsMode, selectedBrand, Packges, newBrand } = this.state;
        return (
            <div className="content Brands">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>

                <Col md="11">
                    <Card>
                        {!editMode && !addMode && !detailsMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Brands.title")}</h2>
                                        </Col>

                                        {data && data.length > 0 &&
                                            <Col className="AddContainer">
                                                <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                                <UncontrolledTooltip placement="right" target="Add">{i18n.t("Brands.add")}</UncontrolledTooltip>
                                            </Col>}
                                    </Row>
                                </CardHeader>

                                <CardBody>
                                    {data && data.length > 0 ? <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">{i18n.t("global.ID")}</th>
                                                <th className="text-center">{i18n.t("Brands.Name")}</th>
                                                {/* <th className="text-center">{i18n.t("Brands.Address")}</th> */}
                                                <th className="text-center">{i18n.t("Brands.Package")}</th>
                                                <th className="text-center">{i18n.t("Brands.Edit")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                <th className="text-center">{i18n.t("Brands.Delete")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.id}</td>
                                                        <td className="text-center">{Item.name}</td>
                                                        {/* <td className="text-center">{Item.address}</td> */}
                                                        <td className="text-center">0</td>
                                                        <td className="text-center"><i className="fa fa-edit" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBrand: Item, detailsMode: false, selectedBrandIndex: key }) }} /></td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedBrand: Item, detailsMode: true, selectedBrandIndex: key })} /></td>
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
                                            <h2 className="title">{i18n.t("Brands.add")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        {/* <Row>
                                            <Col md={12}>
                                                <FormGroup className="logoContainer">
                                                    <label>{i18n.t("CompanyProfile.Logo")}</label>
                                                    <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                                    <img alt="" src={newBrand.logo} />
                                                </FormGroup>
                                            </Col>
                                        </Row> */}
                                        <Row >
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} placeholder={i18n.t("Brands.NamePlacholder")} onChange={(val) => { this.changeNewInput('name', val) }} />
                                            </Col>
                                            {/* <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Brands.Package")} items={Packges} onClick={(val) => { this.changeNewInput("assignedPackage", val) }} selctedItem={newBrand.assignedPackage} />
                                                </FormGroup>
                                            </Col> */}
                                            {/* <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Address")} placeholder={i18n.t("Brands.AddressPlacholder")} onChange={(val) => { this.changeNewInput('address', val) }} />
                                            </Col> */}
                                        </Row>
                                        <Button onClick={() => this.addNewBrand()}>{i18n.t("global.submit")}</Button>
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
                                            <h2 className="title">{i18n.t("Brands.editBrand")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} value={selectedBrand.name} placeholder={i18n.t("Brands.NamePlacholder")} onChange={(val) => { this.changeEditInput('name', val) }} />
                                            </Col>
                                            {/* <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Brands.Package")} items={Packges} onClick={(val) => { this.changeEditInput("assignedPackage", val) }} selctedItem={selectedBrand.assignedPackage} />
                                                </FormGroup>
                                            </Col> */}
                                        </Row>
                                        <Button onClick={() => this.editBrand()}>{i18n.t("global.submit")}</Button>
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>{i18n.t("global.cancel")}</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }

                        {!editMode && !addMode && detailsMode &&
                            // Brand Details
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedBrand.name} {i18n.t("Brands.Details")}</h2>
                                            <h3 className="Subtitle">Basic Info</h3>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-minimal-right" id="up" onClick={() => { this.setState({ addMode: false, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="up">{i18n.t("Brands.Back")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Name")}:</label>
                                                <label className="value">{selectedBrand.name}</label>
                                            </Col>
                                            {/* <Col size="6">
                                                <label className="item">{i18n.t("Brands.Address")}:</label>
                                                <label className="value">{selectedBrand.address}</label>
                                            </Col> */}
                                        </Row>
                                        {/* <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Package")}:</label>
                                                <label className="value">{selectedBrand.assignedPackage.name}</label>
                                            </Col>
                                        </Row> */}
                                        {/* <hr className="sperator" /> */}
                                    </div>
                                    {/* <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Brands.PackgeInfo")}</h3>
                                        </Col>
                                    </Row>
                                    
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedSMS")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalSMS}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedNotification")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalNotification}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedEmails")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalEmails}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.RenewalDate")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.renewalDate}</label>
                                            </Col>
                                        </Row>
                                    </div> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(Brands);


