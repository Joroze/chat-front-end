import './ChatCommentPane.css';

import React from 'react';
import {
  Button,
  Comment,
  Form,
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import { sendChat, changeInputField } from 'ducks/Chat.duck';
import ChatMessage from './components/ChatMessage/ChatMessage';

function ChatCommentPane(props) {
  const {
    subject,
    messageList,
    userList,
    inputField,
    changeInputFieldDispatch,
    sendChatDispatch,
  } = props;

  function handleTextAreaChange(event) {
    changeInputFieldDispatch(event.target.value);
  }

  function handleOnSubmit() {
    sendChatDispatch(inputField);
    changeInputFieldDispatch('');
  }

  return (
    <Comment.Group className="component-chat-comment-pane">
      <Header as="h3" dividing>
        {subject}
      </Header>

      <div className="comment-list">
        {messageList.map(message => (
          <ChatMessage
            key={uuidv4()}
            author={message.author}
            timestamp={message.timestamp}
            text={message.text}
            type={message.type}
          />
        ))}
      </div>

      <Form reply>
        <Form.TextArea value={inputField} onChange={handleTextAreaChange} />
        <Button
          disabled={inputField.length === 0}
          fluid
          onClick={handleOnSubmit}
          content="Submit"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  );
}

ChatCommentPane.propTypes = {
  messageList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.object),
  subject: PropTypes.string,
  sendChatDispatch: PropTypes.func,
  changeInputFieldDispatch: PropTypes.func,
  inputField: PropTypes.string,
};

ChatCommentPane.defaultProps = {
  messageList: [],
  userList: [],
  subject: '',
  inputField: '',
  sendChatDispatch: () => null,
  changeInputFieldDispatch: () => null,
};

function mapStateToProps(state) {
  return {
    inputField: state.chat.inputField,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeInputFieldDispatch: value => dispatch(changeInputField(value)),
    sendChatDispatch: msg => dispatch(sendChat(msg)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatCommentPane);
