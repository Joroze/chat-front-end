import './UserListItem.css';

import React from 'react';
import {
  Button,
  Image,
  List,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { kickUser, getUserSelector } from 'ducks/Chat.duck';

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

  const isKickUserButtonVisible = clientUser && (clientUser.isAdmin || clientUser.isModerator);
  const isSelf = clientUser.id === userId;
  const isKickUserButtonDisabled = isSelf || isAdmin;

  if (isAuthor) roleName = 'Author';
  else if (isAdmin) roleName = 'Admin';
  else if (isModerator) roleName = 'Moderator';

  return (
    <List.Item>
      <List.Content floated="right">
        {isKickUserButtonVisible && (
        <Button onClick={handleClickKickUser} disabled={isKickUserButtonDisabled} animated="vertical">
          <Button.Content hidden><Icon name="hand peace outline" /></Button.Content>
          <Button.Content visible>Kick</Button.Content>
        </Button>
        ) }
      </List.Content>
      { R.isEmpty(avatar)
        ? <Icon size="big" name="user circle" />
        : <Image avatar src={avatar} />
      }
      <List.Content>
        <List.Header>{username}</List.Header>
        {roleName} {isSelf ? '(Me)' : ''}
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
  kickUserDispatch: PropTypes.func,
};

UserListItem.defaultProps = {
  avatar: '',
  userId: '',
  isAdmin: false,
  isAuthor: false,
  clientUser: {},
  isModerator: false,
  username: 'Guest',
  kickUserDispatch: () => null,
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
