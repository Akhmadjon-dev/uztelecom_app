import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import routes from '../routes';
import { Section, Main } from '../styles';
import SignIn from './Auth/SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props.auth;
    let isAdmin = false;
    let authComponents = [];
    if (user) {
      isAdmin = user.type === 'admin';
    }

    if (isAdmin) {
      authComponents = routes.authenticated.filter((comp) => !comp.props.admin);
    } else {
      authComponents = routes.authenticated;
    }

    if (user) {
      return (
        <GlobalContext.Provider value={{
          lang: user.language || 'ru', userType: user.type,
        }}
        >
          <Main>
            <BrowserRouter>
              <Header isAdmin={isAdmin} />
              <Navbar isAdmin={isAdmin} />
              <Section>
                <Switch>
                  {authComponents}
                </Switch>
              </Section>
            </BrowserRouter>
          </Main>
        </GlobalContext.Provider>
      );
    }
    return (
      <GlobalContext.Provider value={{
        lang: 'uz', userType: null,
      }}
      >
        <BrowserRouter>
          <Switch>
            {routes.notAuthenticated}
            <Route component={SignIn} />
          </Switch>
        </BrowserRouter>
      </GlobalContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);