import './Lobby.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ChatBox from 'components/ChatBox/ChatBox';
import { toggleChatStream } from '../../ducks/Chat.duck';

class Lobby extends React.Component {
  componentDidMount() {
    this.handleOnToggleChat = this.handleOnToggleChat.bind(this);
    this.handleOnToggleChat();
  }

  handleOnToggleChat() {
    const { toggleChatStreamDispatch, isChatStreamEnabled } = this.props;
    toggleChatStreamDispatch(isChatStreamEnabled);
  }

  render() {
    const { isChatStreamEnabled, isChatStreamOnline } = this.props;

    return (
      <div className="component-lobby">
        <div className="control-header">
          <div className="connection-status-text">
            Connection:
            <span className={`status ${isChatStreamOnline ? 'online' : 'offline'}`}>
              {isChatStreamOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <Checkbox
            label="Toggle Connection"
            toggle
            checked={isChatStreamEnabled}
            onChange={this.handleOnToggleChat}
          />
        </div>


        <ChatBox online={isChatStreamOnline} disabled={!isChatStreamEnabled} />
      </div>
    );
  }
}

Lobby.propTypes = {
  isChatStreamEnabled: PropTypes.bool,
  isChatStreamOnline: PropTypes.bool,
  toggleChatStreamDispatch: PropTypes.func,
};

Lobby.defaultProps = {
  isChatStreamEnabled: false,
  isChatStreamOnline: false,
  toggleChatStreamDispatch: () => null,
};

function mapStateToProps(state) {
  return {
    isChatStreamEnabled: state.chat.isChatStreamEnabled,
    isChatStreamOnline: state.chat.isChatStreamOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleChatStreamDispatch: isEnabled => dispatch(toggleChatStream(isEnabled)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
