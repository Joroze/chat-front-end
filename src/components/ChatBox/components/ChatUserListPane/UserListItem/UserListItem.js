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
import { kickUser, viewUserDetails, getUserSelector } from 'ducks/Chat.duck';
import { openModal } from 'ducks/UserDetailsModal.duck';

import logo from 'img/logo.png';

function UserListItem(props) {
  const {
    user,
    clientUser,
    openModalDispatch,
    kickUserDispatch,
    viewUserDetailsDispatch,
  } = props;

  function handleClickKickUser() {
    kickUserDispatch(user.id);
  }

  function handleClickViewUserDetails() {
    viewUserDetailsDispatch(user.id);
    openModalDispatch(user.id);
  }

  let roleName = '';

  const isKickUserButtonVisible = clientUser && (clientUser.isAdmin || clientUser.isModerator);
  const isSelf = clientUser.id === user.id;
  const isKickUserButtonDisabled = isSelf || user.isAdmin;
  const isViewUserDetailsButtonDisabled = !clientUser.isAdmin || (user.isAdmin && !isSelf);

  if (user.isAuthor) roleName = 'Author';
  else if (user.isAdmin) roleName = 'Admin';
  else if (user.isModerator) roleName = 'Moderator';

  return (
    <List.Item>
      <List.Content floated="right">
        {isKickUserButtonVisible && (
          <React.Fragment>
            <Button onClick={handleClickKickUser} disabled={isKickUserButtonDisabled} animated="vertical">
              <Button.Content hidden><Icon name="hand peace outline" /></Button.Content>
              <Button.Content visible>Kick</Button.Content>
            </Button>
            <Button onClick={handleClickViewUserDetails} disabled={isViewUserDetailsButtonDisabled} animated="vertical">
              <Button.Content hidden>Details</Button.Content>
              <Button.Content visible><Icon name="info" /></Button.Content>
            </Button>
          </React.Fragment>
        ) }
      </List.Content>

      { user.isAdmin
        ? <Image avatar src={logo} />
        : (
          <React.Fragment>
            { !user.avatar
              ? <Icon size="big" name="user circle" />
              : <Image avatar src={user.avatar} />
            }
          </React.Fragment>
        )
      }
      <List.Content>
        <List.Header>{user.username}</List.Header>
        {roleName} {isSelf ? '(Me)' : ''}
      </List.Content>
    </List.Item>
  );
}

UserListItem.propTypes = {
  user: PropTypes.object,
  clientUser: PropTypes.object,
  openModalDispatch: PropTypes.func,
  kickUserDispatch: PropTypes.func,
  viewUserDetailsDispatch: PropTypes.func,
};

UserListItem.defaultProps = {
  user: {},
  clientUser: {},
  openModalDispatch: () => null,
  kickUserDispatch: () => null,
  viewUserDetailsDispatch: () => null,
};

function mapStateToProps(state) {
  return {
    clientUser: getUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openModalDispatch: socketId => dispatch(openModal(socketId)),
    kickUserDispatch: socketId => dispatch(kickUser(socketId)),
    viewUserDetailsDispatch: socketId => dispatch(viewUserDetails(socketId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem);
