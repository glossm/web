import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Header, Image, Button, Divider, Input } from 'semantic-ui-react';
import axios from 'axios';
import avatarImg from '../assets/images/avatar.png';
import { Translation } from 'react-i18next';
import { CountryDropdown } from 'react-country-region-selector';
import { FetchUser, fetchUser } from '../actions/auth';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const mapStateToProps = state => ({
  user: state.auth.user,
});

const propTypes = {
  user: PropTypes.shape({}).isRequired,
};

class ProfileEdit extends Component {

  state = {
    imageFile: null,
    name: null,
    nationality: null,
    profileThumbnail: null,
    email: null,
  }

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  handleCountryChange = (country) => {
    this.setState({nationality: country});
  }

  handleImageChange = (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      this.setState({imageFile: input.files[0]});
      reader.onload = (e) => {
        this.setState({profileThumbnail: e.target.result});
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit = async () => {
    let postData = new FormData();
    ['name', 'email', 'nationality'].map((varName) => {
      if (this.state[varName]) {
        postData.append(varName, this.state[varName]);
      }
    });
    if (this.state.imageFile) {
      postData.append('profile_image', this.state.imageFile);
    }
    await axios.post(
      '/user/update/', 
      postData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then(function (response) {
      //fetchUser();
      window.location.reload(); // refetching not broadcasted; force reload user data
    });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { user } = this.props;
    const dateJoined = new Date(user.dateJoined);
    const joinDate = {
      year: dateJoined.getFullYear(),
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dateJoined.getMonth()],
      day: dateJoined.getDay()
    };
    return (
      <Container>
        <Header> {user.username} </Header>
        <div>
          <Translation>
            {
              t => t('profile.joined', { joinDate } )
            }
          </Translation>
        </div>
        <Divider/>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Name</label>
            <Form.Input 
              placeholder="Name"
              name="name"
              value={this.state.name || user.name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Form.Input 
              placeholder="Email"
              name="email"
              value={this.state.email || user.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Nationality</label>
            <CountryDropdown
              name="nationality"
              value={this.state.nationality || user.nationality}
              onChange={this.handleCountryChange}
              valueType="short"
            />
          </Form.Field>
          <Header size="small">
            Profile Image (click to edit)
          </Header>
          <Image 
            size="small"
            bordered
            onClick={()=>{this.fileInput.current.click()}}
            src={this.state.profileThumbnail || user.profileThumbnail || avatarImg}
          />
          <input ref={this.fileInput} type="file" hidden onChange={this.handleImageChange}/>

          <Form.Button content="Submit" primary className="mt-4"/>
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ProfileEdit);

