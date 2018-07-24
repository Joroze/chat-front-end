import './Lobby.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ChatBox from 'components/ChatBox/ChatBox';
import { toggleChatStream } from '../../ducks/Chat.duck';

function Lobby(props) {
  const {
    isChatStreamEnabled,
    isChatStreamOnline,
    toggleChatStreamDispatch,
  } = props;

  function handleOnToggleChat() {
    toggleChatStreamDispatch(isChatStreamEnabled);
  }
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
          onChange={handleOnToggleChat}
        />
      </div>


      <ChatBox online={isChatStreamOnline} disabled={!isChatStreamEnabled} />
    </div>
  );
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
