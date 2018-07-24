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

import { sendChat } from 'ducks/Chat.duck';
import ChatMessage from './components/ChatMessage/ChatMessage';

class ChatCommentPane extends React.Component {
  constructor() {
    super();
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this.state = { inputField: '' };
  }

  handleTextAreaChange(event) {
    this.setState({ inputField: event.target.value });
  }

  handleOnSubmit() {
    const { sendChatDispatch } = this.props;
    const { inputField } = this.state;
    sendChatDispatch(inputField);
    this.setState({ inputField: '' });
  }

  render() {
    const {
      subject,
      messageList,
      userList,
    } = this.props;
    const { inputField } = this.state;

    return (
      <Comment.Group>
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
          <Form.TextArea value={inputField} onChange={this.handleTextAreaChange} />
          <Button
            disabled={inputField.length === 0}
            fluid
            onClick={this.handleOnSubmit}
            content="Submit"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    );
  }
}

ChatCommentPane.propTypes = {
  messageList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.object),
  subject: PropTypes.string,
  sendChatDispatch: PropTypes.func,
};

ChatCommentPane.defaultProps = {
  messageList: [],
  userList: [],
  subject: '',
  sendChatDispatch: () => null,
};

function mapDispatchToProps(dispatch) {
  return {
    sendChatDispatch: msg => dispatch(sendChat(msg)),
  };
}

export default connect(null, mapDispatchToProps)(ChatCommentPane);
