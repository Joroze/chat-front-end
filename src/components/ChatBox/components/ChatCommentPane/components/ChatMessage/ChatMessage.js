import './ChatMessage.css';

import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { changeInputField } from 'ducks/Chat.duck';
import logo from 'img/logo.png';

function ChatMessage(props) {
  const {
    author,
    timestamp,
    text,
    type,
    inputField,
    changeInputFieldDispatch,
  } = props;

  const isServerMessage = type === 'server';
  let { username } = author;

  if (isServerMessage) username = 'Server Broadcast';
  else if (author.isAdmin) username = `${username} - [Admin]`;
  else if (author.isModerator) username = `${username} - [Moderator]`;

  function handleOnAuthorClick() {
    if (!isServerMessage) {
      changeInputFieldDispatch(`${inputField}@${author.username}`);
    }
  }

  return (
    <Comment>
      {isServerMessage
        ? <Comment.Avatar src={<Icon size="big" name="server" />} />
        : <Comment.Avatar src={author.isAdmin ? logo : author.avatar || <Icon size="big" name="user circle" />} />
      }
      <Comment.Content>
        <Comment.Author
          onClick={handleOnAuthorClick}
          as="a"
        >
          {username}
        </Comment.Author>
        <Comment.Metadata>
          <div>Posted {moment(timestamp).format('MMM Do h:mm A')}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions />
      </Comment.Content>
    </Comment>
  );
}

ChatMessage.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  type: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  text: PropTypes.string,
  inputField: PropTypes.string,
  changeInputFieldDispatch: PropTypes.func,
};

ChatMessage.defaultProps = {
  type: '',
  author: {
    username: '',
    avatar: '',
  },
  timestamp: 'N/A',
  text: '',
  inputField: '',
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
