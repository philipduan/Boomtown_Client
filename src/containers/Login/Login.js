import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import { logInUser } from '../../redux/modules/profiles';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { LoginField, BioField } from '../../components/Validate';

import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      bio: '',
      userEmail: '',
      password: '',
      createEmailError: '',
      error: false,
      open: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => user ? this.props.history.push('/items') : null);
  }

  handleUserEmail = (userEmail) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(userEmail) ? this.setState({ userEmail, createEmailError: '' }) : this.setState({ createEmailError: 'Invalid email address' });
  }

  handlePassword = (password) => {
    this.setState({ password });
  }

  handleOpen = () => {
    this.setState({
      fullname: '',
      bio: '',
      userEmail: '',
      password: '',
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      fullname: '',
      bio: '',
      userEmail: '',
      password: '',
      open: false
    });
  };

  handleFullname = (fullname) => {
    this.setState({ fullname })
  }

  handleBio = (bio) => {
    this.setState({ bio })
  }

  handleCreateUser = (event) => {
    event.preventDefault();
    let data = {
      email: this.state.userEmail,
      fullname: this.state.fullname,
      bio: this.state.bio
    };
    firebase.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.password)
      .then(() => {
        fetch('https://boomtown-server-phil.herokuapp.com/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(() => this.props.dispatch(logInUser(this.state.userEmail)))
          .catch(error => {
            console.log('error', error);
          })
      })
      .catch(err => err.code === "auth/email-already-in-use" ? this.setState({ createEmailError: 'Email already taken' }) : null)
  }

  login = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.password)
      .then(user => {
        this.props.dispatch(logInUser(this.state.userEmail));
        this.props.history.push('/items');

      }).catch((err) => {
        console.log(err);
        this.setState({ error: true })
      });

  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        disabled={this.state.userEmail && this.state.password && this.state.fullname ? false : true}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCreateUser}
        type="button"
      />,
    ];

    return (
      <div className="page login">
        <div className="logo">
          <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
          <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
          <img src={bottomLeft} alt="City" />
        </div>
        <div className="cardContainer">
          <Paper zDepth={5}>
            <div className="formContainer">
              {this.state.error ? <p class="error">'Invalid Email or Password'</p> : null}
              <form onSubmit={this.login} autoComplete="off">
                <div>
                  <LoginField label="Email" handleUser={this.handleUserEmail} />
                </div>
                <div>
                  <LoginField label="Password" handlePassword={this.handlePassword} />
                </div>
                <RaisedButton
                  className="enterButton"
                  primary
                  fullWidth
                  type="submit"
                  disabled={this.state.userEmail ? this.state.password ? false : true : true}
                >
                  Sign In
                </RaisedButton>
                <RaisedButton
                  className="enterButton"
                  primary
                  fullWidth
                  onClick={this.handleOpen}
                >
                  Sign Up
                </RaisedButton>
                <div>
                  <Dialog
                    title="Welcome To Boomtown"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    <LoginField
                      label="Email"
                      errText={this.state.userEmail.length === 0 ? this.state.createEmailError.length === 0 ? 'This field is required' : this.state.createEmailError : this.state.createEmailError}
                      handleUser={this.handleUserEmail}
                    />
                    <LoginField
                      label="Password"
                      errText={this.state.password.length < 6 ? 'Your password should be more than 6 characters' : null}
                      handlePassword={this.handlePassword}
                    />
                    <BioField
                      label="Full Name"
                      errText={this.state.fullname.length === 0 ? 'This field is required' : null}
                      handleFullname={this.handleFullname}
                    />
                    <BioField
                      label="Tell us about yourself"
                      handleBio={this.handleBio}
                    />
                  </Dialog>
                </div>
              </form>

            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Login);
