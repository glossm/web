import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import SelectLanguage from './pages/SelectLanguage';

const propTypes = {
  location: PropTypes.shape({}).isRequired,
};

function App(props) {
  const { location } = props;
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

export default withRouter(App);
