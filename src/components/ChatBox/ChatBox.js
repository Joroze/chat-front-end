import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      Room: {title}
      <ChatCommentPane
        online={online}
        disabled={disabled}
        messageList={messageList}
        subject={subject}
        userList={userList}
      />

      <ChatUserListPane isLoading={isUserListLoading} userList={userList} />
      {(!online || isUserListLoading) && !disabled && 'Connecting...'}
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
