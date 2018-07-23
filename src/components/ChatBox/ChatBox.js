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
    title,
    userList,
    disabled,
    online,
  } = props;

  console.log('userList: ', userList);
  return (
    <div>
      <Dimmer.Dimmable>
        {title}
        <ChatCommentPane
          messageList={messageList}
          subject={subject}
          userList={userList}
        />

        <ChatUserListPane userList={userList} />

        <Dimmer active={!online || disabled}>
          {!online && !disabled && <Loader />}
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
  userList: PropTypes.arrayOf(PropTypes.object),
};

ChatBox.defaultProps = {
  online: false,
  disabled: false,
  author: '',
  messageList: [],
  subject: '',
  title: '',
  userList: [],
};

function mapStateToProps(state) {
  return {
    author: state.chat.author,
    messageList: state.chat.messageList,
    subject: state.chat.subject,
    title: state.chat.title,
    userList: getUserListSelector(state),
  };
}

export default connect(mapStateToProps)(ChatBox);
