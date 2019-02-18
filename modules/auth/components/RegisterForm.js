import { connect } from 'react-redux';
import Router from 'next/router'
import '../styles/RegisterForm.scss';
import UserAuthForm from './UserAuthForm';
import { postRequest } from '../../../services/apiService';
import { ShowNotification as ShowNotificationAction } from '../../../actions/notificationActions';
import { bindActionCreators } from "redux";

class RegisterForm extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    submitted: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return {user: {...prevState.user, [name]: value}}
    });
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const { ShowNotification } = this.props;
    this.setState({
      submitted: true
    });
    const { user } = this.state;
    if (user.password !== user.confirmPassword) {
      return;
    }
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    try {
      const response = await postRequest('/user/register', requestOptions);
      if (response.ok) {
        ShowNotification('Registration Successfull. Please login!', 'info');
        Router.push('/login');
      } else {
        console.log('Registration failed.');
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        Router.push('/register');
        return Promise.reject(error)
      }
    } catch (error) {
      ShowNotification('This email is already taken', 'error');
    }
  }

  render() {
    const { user, submitted } = this.state;

    return (
      <UserAuthForm heading="Get your account now">
        <form name="auth-form" onSubmit={this.handleRegister}>
          <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
            {
              submitted && !user.firstName &&
              <div className="help-block">First Name is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
            {
              submitted && !user.lastName &&
              <div className="help-block">Last Name is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
            {
              submitted && !user.email &&
              <div className="help-block">Email is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
            {
              submitted && !user.password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.confirmPassword ? ' has-error' : '')}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />
            {
              submitted && user.password !== user.confirmPassword &&
              <div className="help-block">Password does not match</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </UserAuthForm>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ShowNotification: ShowNotificationAction
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(RegisterForm);