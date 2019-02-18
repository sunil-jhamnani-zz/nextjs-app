import '../styles/NotificationContainer.scss';

class NotificationContainer extends React.Component {
  render() {
    const { message, type } = this.props;
    return (
      message && (<div className={`notification-container notification-container__${type}`}>
        <span className="notification-container__message">{message}</span>
      </div>)
    )
  }
}

export default NotificationContainer;