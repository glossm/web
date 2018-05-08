import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import SelectLanguage from './pages/SelectLanguage';

const mapStateToProps = state => ({
  username: state.user && state.user.username,
});

const propTypes = {
  username: PropTypes.string,
  location: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  username: '',
};

function App(props) {
  const { username, location } = props;
  return (
    <div>
      <Menu fixed="top" size="large" secondary pointing>
        <Container>
          <Menu.Item
            name="glossm"
            as={Link}
            to="/"
            header
          />
          <Menu.Item
            name="learn"
            as={Link}
            to="/learn/"
            active={location.pathname.includes('learn/')}
          />
          <Menu.Item position="right">
            {username}
          </Menu.Item>
        </Container>
      </Menu>
      <Switch>
        <Route exact path="/learn/" component={SelectLanguage} />
        <Redirect from="/" to="/" />
      </Switch>
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const connectedApp = connect(mapStateToProps)(App);
export default withRouter(connectedApp);
