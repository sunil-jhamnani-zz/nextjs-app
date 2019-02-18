import Link from 'next/link';
import Router from 'next/router'
import cookie from 'js-cookie'
import '../styles/UserAuthForm.scss';

class UserAuthForm extends React.Component {
  render() {
    const { children, heading } = this.props;
    return (
      <div className="user-auth__container container-fluid">
        <div className="row">
          <div className="user-auth__auth-form col-sm-8 col-md-7 col-lg-6">
            <h3 className="user-auth__title">{heading}</h3>
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default UserAuthForm;
