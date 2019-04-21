import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import { logout } from './actions/auth';
import NavBar from './components/NavBar';
import LanguageList from './pages/LanguageList';
import LanguageMap from './pages/LanguageMap';
import LanguageDashboard from './pages/LanguageDashboard';
import LanguageOverview from './pages/LanguageOverview';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Session from './pages/Session';
import SignUp from './pages/SignUp';
import TopicList from './pages/TopicList';
import Welcome from './pages/Welcome';
import LanguagePhoneme from './pages/LanguagePhoneme';

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

  const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/login/',
    authenticatedSelector: () => !_.isNil(sessionStorage.getItem('token')),
    wrapperDisplayName: 'IsAuthenticated',
  });
  const isNotAuthenticated = connectedRouterRedirect({
    redirectPath: '/profile/',
    allowRedirectBack: false,
    authenticatedSelector: () => _.isNil(sessionStorage.getItem('token')),
    wrapperDisplayName: 'IsNotAuthenticated',
  });

  return (
    <div>
      <NavBar user={user} onLogout={onLogout} pathname={location.pathname} />
      <div className="page">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login/" component={isNotAuthenticated(Login)} />
          <Route exact path="/signup/" component={isNotAuthenticated(SignUp)} />
          <Route exact path="/profile/" component={isAuthenticated(Profile)} />
          <Route exact path="/learn/" component={isAuthenticated(LanguageList)} />
          <Route exact path="/learn/:langId/" component={isAuthenticated(TopicList)} />
          <Route exact path="/learn/:langId/:topicId/" component={isAuthenticated(Session)} />
          <Route exact path="/language/" component={LanguageMap} />
          <Route exact path="/language/:langId/" component={LanguageDashboard} />
          <Route exact path="/language/overview/:langId/" component={LanguageOverview} />
          <Route exact path="/language/phoneme/:langId/" component={LanguagePhoneme} />
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
