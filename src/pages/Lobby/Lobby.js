
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
    <div>
      <div>Chat stream is {isChatStreamOnline ? 'online' : 'offline'}</div>
      <Checkbox
        label={`Toggle Stream (${isChatStreamEnabled})`}
        toggle
        checked={isChatStreamEnabled}
        onChange={handleOnToggleChat}
      />

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
