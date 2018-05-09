import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

import { logout } from './actions/auth';
import Login from './pages/Login';
import SelectLanguage from './pages/SelectLanguage';

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
    redirectPath: '/learn/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.auth.user === null,
    wrapperDisplayName: 'IsNotAuthenticated',
  });

  const personalMenu = (
    <Menu.Menu position="right">
      <Dropdown item text={user && user.username}>
        <Dropdown.Menu>
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
            <Menu.Item position="right" name="login" as={Link} to="/login/" />
          }
        </Container>
      </Menu>
      <Switch>
        <Route exact path="/learn/" component={isAuthenticated(SelectLanguage)} />
        <Route exact path="/login/" component={isNotAuthenticated(Login)} />
        <Redirect from="/" to="/" />
      </Switch>
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(connectedApp);
