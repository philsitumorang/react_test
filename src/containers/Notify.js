import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import '../styles/notify.scss';

const mapStateToProps = state => {
  return {
    notify: state.notify
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateNotify: payload => dispatch(actions.updateNotify(payload))
  }
};

class Users extends Component {

  constructor(props) {
    super(props);
    this.closeNotify = this.closeNotify.bind(this);
    this.timer = null
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.closeNotify()
    }, 3000)
  }

  closeNotify() {
    this.props.onUpdateNotify('')
  }

  render() {
    return (
      <div className="notify" onClick={this.closeNotify}>
        {this.props.notify ?
          <div className="notify-block">
            <span>{this.props.notify}</span>
          </div>
        : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
