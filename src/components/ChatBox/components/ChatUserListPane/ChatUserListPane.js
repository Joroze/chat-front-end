import React from 'react';
import {
  List,
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import UserListItem from './UserListItem/UserListItem';

function ChatUserListPane(props) {
  const {
    userList,
  } = props;

  return (
    <List animated selection verticalAlign="middle">
      <Header as="h3" dividing>
          User List
      </Header>

      {userList.map(user => (
        <UserListItem
          key={uuidv4()}
          userId={user.id}
          avatar={user.avatar}
          username={user.username}
          isAdmin={user.isAdmin}
          isModerator={user.isModerator}
          isAuthor={user.isAuthor}
        />
      ))}
    </List>
  );
}

ChatUserListPane.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.object),
};

ChatUserListPane.defaultProps = {
  userList: [],
};

export default ChatUserListPane;
