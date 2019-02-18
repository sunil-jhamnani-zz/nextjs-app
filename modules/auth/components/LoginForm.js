import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import Router from 'next/router'
import cookie from 'js-cookie'
import '../styles/LoginForm.scss';
import { login as loginAction } from '../../../actions/authActions';
import { postRequest } from '../../../services/apiService';
import { COOKIE_EXPIRY_TIME } from '../../../constants';
import UserAuthForm from './UserAuthForm';


class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    submitted: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      submitted: true
    });
    const { email, password } = this.state;
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    try {
      const response = await postRequest('/user/login', requestOptions);
      if (response.ok) {
        const { token } = response.data;
        var now = new Date(),
          exp = new Date(now.setTime(now.getTime() + Number(COOKIE_EXPIRY_TIME) * 60 * 1000));
        cookie.set('token', token, { expires: exp });
        Router.push('/home');
      } else {
        console.log('Login failed.');
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        Router.push('/login');
        return Promise.reject(error)
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );
      throw new Error(error)
    }
    // const { login } = this.props;
    // login(email, password);
  }

  render() {
    const { email, password, submitted } = this.state;

    return (
      <UserAuthForm heading="Sign in to your account">
        <form name="auth-form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
            {
              submitted && !email &&
              <div className="help-block">Email is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {
              submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link href="/register">
              <a className="btn btn-link">
                Register
              </a>
            </Link>
          </div>
        </form>
      </UserAuthForm>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: loginAction
  }, dispatch)
);

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);