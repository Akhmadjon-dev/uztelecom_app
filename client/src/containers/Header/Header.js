import React, { PureComponent } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { signOut } from "../../store/actions/auth/";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineTag,
  AiOutlinePoweroff,
  AiOutlineLock,
  AiOutlineLogin,
  AiOutlineOrderedList,
  AiOutlineInfo,
  AiOutlineAppstore,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Header, NavList, Brand, Button } from "../../styles";
import { ReactComponent as LogoIcon } from "../../assets/logo/logo.svg";
import { ReactComponent as DashboardIcon } from "../../assets/img/dashboard-icon.svg";
import { ReactComponent as LocationIcon } from "../../assets/img/location-icon.svg";
import { ReactComponent as FilterIcon } from "../../assets/img/filter-icon.svg";
import { ReactComponent as StorageIcon } from "../../assets/img/storage-icon.svg";

import language from "../../lang/header";
import GlobalContext from "../../context/GlobalContext";

class HeaderComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static contextType = GlobalContext;

  signOutHandler = async () => {
    await this.props.signOut();
    this.props.history.push("/sign-in");
  };

  render() {
    const { lang = "en", userType = "seller" } = this.context;
    const { isAdmin } = this.props;
    const trans = language[lang];

    const URLS = [
      {
        url: "/dashboard",
        exact: true,
        title: "Dashboard",
        icon: <DashboardIcon />,
      },
      {
        url: "/dashboard/region",
        exact: true,
        title: "Filter",
        icon: <FilterIcon />,
      },
      {
        url: "/locations",
        exact: true,
        title: "Locations",
        icon: <LocationIcon />,
      },
      {
        url: "/storage",
        exact: true,
        title: "Storage",
        icon: <StorageIcon />,
      },
    ];
    return (
      <Header>
        <nav>
          <Brand>
            <Link to="/" id="logo">
              <h1 style={{ color: "white" }}>MITC</h1>
              {/* <LogoIcon id='logo-extend' />
              <LogoShort id='logo-short' /> */}
            </Link>
          </Brand>
          <ul style={{ padding: 0 }}>
            {URLS.map((item) => {
              console.log(item);

              // if (!isAdmin) {
              //   if (!item.admin) {
              //     return (
              //       <NavList key={item.url}>
              //         <NavLink
              //           to={item.url}
              //           exact={item.exact}
              //           activeClassName="active"
              //         >
              //           {item.icon}
              //           <span>{item.title}</span>
              //         </NavLink>
              //       </NavList>
              //     );
              //   }
              //   return null;
              // } else {
              //   return (
              //     <NavList key={item.url}>
              //       <NavLink
              //         to={item.url}
              //         exact={item.exact}
              //         activeClassName="active"
              //       >
              //         <span>{item.title}</span>
              //       </NavLink>
              //     </NavList>
              //   );
              // }
              return (
                <NavList key={item.url}>
                  <NavLink
                    to={item.url}
                    exact={item.exact}
                    activeClassName="active"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </NavList>
              );
            })}

            <NavList className="text-center">
              <Button
                className="log-out"
                style={{ minWidth: "50px" }}
                onClick={this.signOutHandler}
              >
                <AiOutlinePoweroff style={{ fontSize: "23px" }} />
                <span style={{ fontSize: "14px" }}>Log Out</span>
              </Button>
            </NavList>

            <small
              style={{
                marginLeft: "15px",
                letterSpacing: "0.5px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
              id="brand"
            >
              {" "}
              <a
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
                href="https://alitech.uz"
              >
                Alitech.uz
              </a>{" "}
              <span>mahsuloti</span>
            </small>
          </ul>
        </nav>
      </Header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signOut }, dispatch);
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(HeaderComponent);
