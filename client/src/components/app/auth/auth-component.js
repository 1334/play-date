import React from 'react';
import GoogleLoginButton from 'react-google-login-button';
import { LoginButton } from 'react-facebook';
import './auth.css';
import { PostData } from './postdata';
import { googleToken } from '../../../config';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

export class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      auth: false,
      name: ''
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp(res, type) {
    let postData;

    if (type === 'facebook' && res.email) {
      postData = {
        name: res.profile.name,
        provider: type,
        email: res.profile.email,
        provider_id: res.profile.id,
        token: res.tokenDetail.accessToken,
        provider_pic: res.profile.picture.data.url
      };
    }

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    PostData('signup', postData).then(result => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem('userData', JSON.stringify(responseJson));
        this.setState({ redirect: true });
      }
    });
  }

  responseGoogle = response => {
    this.signUp(response, 'google');
    this.setState({ auth: true, name: response.w3.ig });
    this.props.onClick('google');
  };

  responseFacebook = response => {
    this.signUp(response, 'facebook');
    this.setState({ auth: true, name: response.profile.name });
    this.props.onClick('facebook');
  };

  render() {
    if (this.state.redirect) {
      return <redirect to={'/'} />;
    }

    return (
      <div className="button">
        {!this.state.auth ? (
          <React.Fragment>
            <GoogleLoginButton
              googleClientId={googleToken}
              buttonText="LOGIN WITH GOOGLE"
              onLoginSuccess={this.responseGoogle}
              onLoginFailure={this.responseGoogle}
              width={220}
              height={50}
              longTitle={true}
              theme="light"
            />

            <LoginButton
              scope="email"
              onCompleted={this.responseFacebook}
              onError={this.responseFacebook}
              className="my-facebook-button-class"
            >
              <span>Login via Facebook</span>
            </LoginButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>{this.state.name}</h2>
            <div className="nav-links">
              <Link to="/create">
                <Tooltip title="Add">
                  <Button variant="fab" aria-label="Add">
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
