import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getUserListSelector } from 'ducks/Chat.duck';
import ChatCommentPane from './components/ChatCommentPane/ChatCommentPane';
import ChatUserListPane from './components/ChatUserListPane/ChatUserListPane';

function ChatBox(props) {
  const {
    author,
    messageList,
    subject,
    isUserListLoading,
    title,
    userList,
    disabled,
    online,
  } = props;

  return (
    <div>
      <Dimmer.Dimmable>
        Room: {title}
        <ChatCommentPane
          messageList={messageList}
          subject={subject}
          userList={userList}
        />

        <ChatUserListPane userList={userList} />

        <Dimmer active={!online || disabled || isUserListLoading}>
          {(!online || isUserListLoading) && !disabled && <Loader content="Connecting..." />}
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
}

ChatBox.propTypes = {
  online: PropTypes.bool,
  disabled: PropTypes.bool,
  author: PropTypes.string,
  messageList: PropTypes.arrayOf(PropTypes.object),
  subject: PropTypes.string,
  title: PropTypes.string,
  isUserListLoading: PropTypes.bool,
  userList: PropTypes.arrayOf(PropTypes.object),
};

ChatBox.defaultProps = {
  online: false,
  disabled: false,
  author: '',
  messageList: [],
  subject: '',
  title: '',
  isUserListLoading: false,
  userList: [],
};

function mapStateToProps(state) {
  return {
    isUserListLoading: state.chat.isUserListLoading,
    author: state.chat.author,
    messageList: state.chat.messageList,
    subject: state.chat.subject,
    title: state.chat.title,
    userList: getUserListSelector(state),
  };
}

export default connect(mapStateToProps)(ChatBox);
