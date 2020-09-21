import React from 'react';
import {
    Col, Row, Button, Form, Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import './CompanyProfileStyle.scss';
import i18n from '../../i18n';
import { InputWithText } from '../../components/ComponentModule'
import { connect } from 'react-redux';
import { HtttpPutDefult } from '../../actions/httpClient';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';
class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileObject: {
                address: "",
                contact: "",
                contactPerson: "",
                logo: "",
                name: "",
                password: "",
                username: "",
            }
        }
    }


    componentDidMount() {
        const { OwnerProfile } = this.props;
        this.setState({ profileObject: OwnerProfile });
    }

    changePhoto(event) {
        event.preventDefault();
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                profilePic: [reader.result]
            })
        }.bind(this);
    }

    checkValidation() {
        return true;
    }


    submit() {
        const { profileObject } = this.state;
        const { storeProfile } = this.props;
        if (this.checkValidation()) {
            HtttpPutDefult('customer/1', profileObject).then((res) => {
                if (res) {
                    storeProfile(profileObject);
                    displayToast('done', true);
                }
            })

        }
    }

    changeInput(Input, val) {
        switch (Input) {
            case 'password':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        password: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        address: val
                    }
                })
                break;
            case 'contact':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        contact: val
                    }
                })
                break;
            case 'contactPersonal':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        contactPersonal: val
                    }
                })
                break;
        }

    }



    render() {
        const { name, username, password, address, contact, contactPerson } = this.state.profileObject;
        return (
            <div className="content CompanyProfile">
                <Col md="11">
                    <Card>
                        <CardHeader>
                            <h2 className="header">{i18n.t("CompanyProfile.title")}</h2>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    {/* <Col md={12}>
                                        <FormGroup className="profilePicContainer">
                                            <label>{i18n.t("CompanyProfile.Logo")}</label>
                                            <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                            <img alt="" src={profilePic} />
                                        </FormGroup>
                                    </Col> */}
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("CompanyProfile.NamePlacholder")} value={name} disabled />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.UserName")} placeholder={i18n.t("CompanyProfile.UserNamePlacholder")} disabled value={username} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("password", val)} value={password} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeInput("address", val)} value={address} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeInput("contact", val)} value={contact} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeInput("contactPersonal", val)} value={contactPerson} />
                                    </Col>
                                </Row>
                                <Button onClick={() => { this.submit() }}>{i18n.t("global.submit")}</Button>
                            </Form>
                        </CardBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);


