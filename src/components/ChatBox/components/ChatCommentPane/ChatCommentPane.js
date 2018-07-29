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
import MessageLoader from 'components/MessageLoader/MessageLoader';

import { sendChat, changeInputField } from 'ducks/Chat.duck';
import ChatMessage from './components/ChatMessage/ChatMessage';

class ChatCommentPane extends React.Component {
  constructor(props) {
    super(props);

    this.messagesEnd = null;

    this.setScrollBottomRef = this.setScrollBottomRef.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setScrollBottomRef(element) {
    this.messagesEnd = element;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  handleTextAreaChange(event) {
    const { changeInputFieldDispatch } = this.props;
    changeInputFieldDispatch(event.target.value);
  }

  handleOnSubmit() {
    const { sendChatDispatch, changeInputFieldDispatch, inputField } = this.props;
    sendChatDispatch(inputField);
    changeInputFieldDispatch('');
  }

  render() {
    const {
      subject,
      messageList,
      userList,
      inputField,
      online,
      disabled,
    } = this.props;

    const isSubmitButtonDisabled = !online || disabled || inputField.length === 0;

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
          {!online && !disabled && ([
            <MessageLoader key="m-loader-1" />,
            <MessageLoader key="m-loader-2" />,
            <MessageLoader key="m-loader-3" />,
            <MessageLoader key="m-loader-4" />,
            <MessageLoader key="m-loader-5" />,
          ])}
          <div className="inner-comment-list-bottom" ref={this.setScrollBottomRef} />
        </div>

        <Form disabled={!online || disabled} reply>
          <Form.TextArea disabled={!online || disabled} value={inputField} onChange={this.handleTextAreaChange} />
          <Button
            disabled={isSubmitButtonDisabled}
            primary={!isSubmitButtonDisabled}
            fluid
            onClick={this.handleOnSubmit}
            content="Submit"
            labelPosition="left"
            icon="edit"
          />
        </Form>
      </Comment.Group>
    );
  }
}

ChatCommentPane.propTypes = {
  online: PropTypes.bool,
  disabled: PropTypes.bool,
  messageList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.object),
  subject: PropTypes.string,
  sendChatDispatch: PropTypes.func,
  changeInputFieldDispatch: PropTypes.func,
  inputField: PropTypes.string,
};

ChatCommentPane.defaultProps = {
  online: false,
  messageList: [],
  disabled: false,
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
