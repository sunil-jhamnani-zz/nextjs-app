import Link from 'next/link';
import { connect } from 'react-redux';
import '../styles/header.scss';
import Router from 'next/router'
import cookie from 'js-cookie'
import NotificationContainer from '../../notifications/components';

class Header extends React.Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount() {
    console.log('componentDidMount');
    this.setState({
      isLoggedIn: !!cookie.get('token')
    })
  }

  handleLogout = () => {
    cookie.remove('token');
    Router.push('/login');
  }

  render () {
    const { isLoggedIn } = this.state;
    const { notification } = this.props;
    return (
      <nav className="page-header navbar">
        <div className="page-header__logo-container col">
          <Link href="/home">
            <a className="page-header__logo">
            </a>
          </Link>
        </div>
        {
          isLoggedIn ? (
            <div className="page-header__links col">
              <a className="page-header__link" onClick={this.handleLogout}>
                Logout
              </a>
            </div>
          ) : (
            <div className="page-header__links col">
              <Link href="/home">
                <a className="page-header__link">
                  Home
                </a>
              </Link>
              <Link href="/login">
                <a className="page-header__link">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="page-header__link btn btn-primary">
                  Register
                </a>
              </Link>
            </div>
          )
        }
        <NotificationContainer message={notification.message} type={notification.type}/>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  notification: state.notifications
});

export default connect(mapStateToProps, null)(Header);