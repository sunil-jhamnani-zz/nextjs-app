import Layout from '../modules/layout/components/Layout';
import cookie from "js-cookie";
import Router from "next/router";
import RegisterForm from '../modules/auth/components/RegisterForm';

class Register extends React.Component {
  componentWillMount() {
    if (cookie.get('token')) {
      Router.push('/home');
    }
  }

  render() {
    return (
      <Layout>
        <RegisterForm />
      </Layout>
    )
  }
}

export default Register;