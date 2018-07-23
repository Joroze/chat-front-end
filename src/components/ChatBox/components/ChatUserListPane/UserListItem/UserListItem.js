import './UserListItem.css';

import React from 'react';
import {
  Button,
  Image,
  List,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { kickUser, getUserSelector } from 'ducks/Chat.duck';
import logo from 'img/logo.png';

function UserListItem(props) {
  const {
    username,
    avatar,
    isAdmin,
    isModerator,
    isAuthor,
    clientUser,
    userId,
    kickUserDispatch,
  } = props;

  function handleClickKickUser() {
    kickUserDispatch(userId);
  }

  let roleName = '';

  const canKickUsers = clientUser && (clientUser.isAdmin || clientUser.isModerator);

  if (isAuthor) roleName = 'Author';
  else if (isAdmin) roleName = 'Admin';
  else if (isModerator) roleName = 'Moderator';

  return (
    <List.Item>
      <List.Content floated="right">
        {canKickUsers && (
        <Button onClick={handleClickKickUser} disabled={clientUser.id === userId} animated="vertical">
          <Button.Content hidden><Icon name="hand peace outline" /></Button.Content>
          <Button.Content visible>Kick</Button.Content>
        </Button>
        ) }
      </List.Content>
      <Image avatar src={avatar || logo} />
      <List.Content>
        <List.Header>{username}</List.Header>
        {roleName}
      </List.Content>
    </List.Item>
  );
}

UserListItem.propTypes = {
  avatar: PropTypes.string,
  userId: PropTypes.string,
  isAdmin: PropTypes.bool,
  isAuthor: PropTypes.bool,
  isModerator: PropTypes.bool,
  username: PropTypes.string,
};

UserListItem.defaultProps = {
  avatar: '',
  userId: '',
  isAdmin: false,
  isAuthor: false,
  isModerator: false,
  username: 'Guest',
};

function mapStateToProps(state) {
  return {
    clientUser: getUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    kickUserDispatch: socketId => dispatch(kickUser(socketId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem);
