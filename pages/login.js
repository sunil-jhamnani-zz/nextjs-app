import Layout from '../modules/layout/components/Layout';
import LoginForm from '../modules/auth/components/LoginForm';
import cookie from 'js-cookie'
import Router from "next/router";


class Login extends React.Component {
  componentWillMount() {
    if (cookie.get('token')) {
      Router.push('/home');
    }
  }

  render() {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    )
  }
}

export default Login;