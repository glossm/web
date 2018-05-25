import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

import { logout } from './actions/auth';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SelectLanguage from './pages/SelectLanguage';
import SignUp from './pages/SignUp';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

const propTypes = {
  user: PropTypes.shape({}),
  onLogout: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  user: null,
};

function App(props) {
  const { user, onLogout, location } = props;
  const isActive = path => location.pathname.includes(path);
  const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/login/',
    authenticatedSelector: state => state.auth.user !== null,
    wrapperDisplayName: 'IsAuthenticated',
  });
  const isNotAuthenticated = connectedRouterRedirect({
    redirectPath: '/profile/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.auth.user === null,
    wrapperDisplayName: 'IsNotAuthenticated',
  });

  const personalMenu = (
    <Menu.Menu position="right">
      <Dropdown item text={user && user.username}>
        <Dropdown.Menu>
          <Dropdown.Item text="My Profile" as={Link} to="/profile/" />
          <Dropdown.Item text="Logout" onClick={onLogout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );

  return (
    <div>
      <Menu fixed="top" size="large" secondary pointing>
        <Container>
          <Menu.Item name="glossm" as={Link} to="/" header />
          <Menu.Item name="learn" as={Link} to="/learn/" active={isActive('learn/')} />
          {user ?
            personalMenu :
            <Menu.Menu position="right">
              <Menu.Item name="sign up" as={Link} to="/signup/" />
              <Menu.Item name="login" as={Link} to="/login/" />
            </Menu.Menu>
          }
        </Container>
      </Menu>
      <div className="page">
        <Switch>
          <Route exact path="/login/" component={isNotAuthenticated(Login)} />
          <Route exact path="/signup/" component={isNotAuthenticated(SignUp)} />
          <Route exact path="/profile/" component={isAuthenticated(Profile)} />
          <Route exact path="/learn/" component={isAuthenticated(SelectLanguage)} />
          <Redirect from="/" to="/" />
        </Switch>
      </div>
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(connectedApp);
