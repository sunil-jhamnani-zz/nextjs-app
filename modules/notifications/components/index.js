import '../styles/NotificationContainer.scss';
import { NOTIFICATION_TIMEOUT } from '../../../constants';
import { connect } from 'react-redux';
import { HideNotification as HideNotificationAction } from '../../../actions/notificationActions';
import { bindActionCreators } from "redux";

class NotificationContainer extends React.Component {

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    console.log("componentDidUpdate", message);
    if (message !== prevProps.message) {
      setTimeout(this.requestHide, NOTIFICATION_TIMEOUT)
    }
  }

  requestHide = () => {
    const { HideNotification } = this.props;
    HideNotification();
  };

  render() {
    const { message, type } = this.props;
    return (
      message && (<div className={`notification-container notification-container__${type}`}>
        <span className="notification-container__message">{message}</span>
      </div>)
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    HideNotification: HideNotificationAction
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(NotificationContainer);