import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

const propTypes = {
  user: PropTypes.shape({}),
  onLogout: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const defaultProps = {
  user: null,
};

function NavBar(props) {
  const { user, onLogout, pathname } = props;

  const isActive = path => pathname.includes(path);
  const AuthenticatedMenu = () => (
    <Menu.Menu position="right">
      <Dropdown item text={user.username}>
        <Dropdown.Menu>
          <Dropdown.Item text="My Profile" as={Link} to="/profile/" />
          <Dropdown.Item text="Logout" onClick={onLogout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
  const NotAuthenticatedMenu = () => (
    <Menu.Menu position="right">
      <Menu.Item name="sign up" as={Link} to="/signup/" />
      <Menu.Item name="login" as={Link} to="/login/" />
    </Menu.Menu>
  );

  return (
    <Menu fixed="top" size="large" secondary pointing style={{ backgroundColor: 'white' }}>
      <Container>
        <Menu.Item name="glossm" as={Link} to="/" header />
        <Menu.Item name="learn" as={Link} to="/learn/" active={isActive('learn/')} />
        {user ? <AuthenticatedMenu /> : <NotAuthenticatedMenu />}
      </Container>
    </Menu>
  );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
