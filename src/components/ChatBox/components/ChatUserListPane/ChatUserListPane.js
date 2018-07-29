import React from 'react';
import {
  List,
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import UserListItemLoader from 'components/UserListItemLoader/UserListItemLoader';
import UserListItem from './UserListItem/UserListItem';

function ChatUserListPane(props) {
  const {
    userList,
    isLoading,
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

      {isLoading && ([
        <UserListItemLoader key="uli-loader-1" />,
        <UserListItemLoader key="uli-loader-2" />,
        <UserListItemLoader key="uli-loader-3" />,
      ])}
    </List>
  );
}

ChatUserListPane.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

ChatUserListPane.defaultProps = {
  userList: [],
  isLoading: false,
};

export default ChatUserListPane;
