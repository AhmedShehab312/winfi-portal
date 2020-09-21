import logo from "assets/img/logo.webp";
import React from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
import { InputWithText } from '../../components/ComponentModule';
import i18n from '../../i18n';
import './LoginStyle.scss';
import { HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { setLoggedIn } from '../../globals/globals';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            Password: ""
        }
    }

    componentDidMount() {

    }

    submit() {
        const { history, storeProfile } = this.props;
        HtttpGetDefult('customer/1').then((res) => {
            if (res) {
                res.role = 'SUPER';
                storeProfile(res);
                history.push('/dashboard');
                setLoggedIn(true)
            }
        })
    }

    render() {
        const { UserName, Password } = this.state;
        return (
            <div className="content LoginContainer">
                <div className="innerContainer">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <InputWithText type="text" label={i18n.t("Login.UserName")} placeholder={i18n.t("Login.UserNamePlacholder")} onChange={(val) => { this.setState({ UserName: val }) }} value={UserName} />
                    <InputWithText type="password" label={i18n.t("Login.Password")} placeholder={"*********"} onChange={(val) => { this.setState({ Password: val }) }} value={Password} />
                    <div className="Button">
                        <Button onClick={() => { this.submit() }}>{i18n.t("global.submit")}</Button>
                    </div>

                </div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));


