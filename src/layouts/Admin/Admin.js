
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import React from "react";
import SideMenu from "../../components/Sidebar/SideMenu";
import routes from "../../routes";
import { withRouter } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { getLoggedIn } from '../../globals/globals';
var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "green",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
      showSideMenu: true,
      pathname: ""
    };
  }
  componentDidMount() {
    this.checkIFLogin();
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    if (!getLoggedIn()) {
      this.props.history.push('/login');
    }
  }



  componentWillReceiveProps(props) {
    if (!getLoggedIn()) {
      props.history.push('/login');
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname === "/login" || nextProps.location.pathname === "/") {
      return {
        showSideMenu: false,
      };
    }
    else {
      return {
        showSideMenu: true,
      };
    }

  }




  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  // Check if the current page is login page
  checkIFLogin() {
    let myElement = document.getElementById('MainPanel').getElementsByClassName('content');
    if (myElement[0].classList[1] == "LoginContainer") {
      this.setState({ showSideMenu: false })
    }
    else {
      this.setState({ showSideMenu: true })
    }
  }

  render() {
    const { showSideMenu } = this.state
    return (
      <>
        <div className="wrapper white-content">
          {
            showSideMenu &&
            <Sidebar
              {...this.props}
              routes={SideMenu}
              bgColor={this.state.backgroundColor}
              toggleSidebar={this.toggleSidebar}
            />
          }
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
            id="MainPanel"
          >
            {
              showSideMenu &&
              <AdminNavbar
                {...this.props}
                brandText={""}
                toggleSidebar={this.toggleSidebar}
                sidebarOpened={this.state.sidebarOpened}
              />
            }
            <div className="react-notification-alert-container">
              <NotificationAlert ref="notificationAlert" />
            </div>
            {routes}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Admin);
