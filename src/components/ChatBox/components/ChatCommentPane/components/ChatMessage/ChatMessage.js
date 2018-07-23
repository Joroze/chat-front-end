import './ChatMessage.css';

import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import logo from 'img/logo.png';

function ChatMessage(props) {
  const {
    author,
    timestamp,
    text,
    type,
  } = props;

  const isServerMessage = type === 'server';
  let { username } = author;

  if (isServerMessage) username = 'Server Broadcast';
  else if (author.isAdmin) username = `${username} - [Admin]`;
  else if (author.isModerator) username = `${username} - [Moderator]`;

  return (
    <Comment>
      <Comment.Avatar src={isServerMessage ? undefined : author.avatar || logo} />
      <Comment.Content>
        <Comment.Author as="a">{username}</Comment.Author>
        <Comment.Metadata>
          <div>Posted {moment(timestamp).format('MMM Do h:mm A')}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions>
          {!isServerMessage && <Comment.Action>@</Comment.Action>}
        </Comment.Actions>
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
};

ChatMessage.defaultProps = {
  type: '',
  author: {
    username: '',
    avatar: '',
  },
  timestamp: 'N/A',
  text: '',
};

export default ChatMessage;
