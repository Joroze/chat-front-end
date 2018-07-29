import './UserDetailsModal.css';

import React from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, getSelectedUser } from 'ducks/UserDetailsModal.duck';

function UserDetailsModal(props) {
  const { closeModalDispatch, isOpen, user } = props;

  return (
    <Modal className="component-user-details-modal" open={isOpen} onClose={closeModalDispatch} basic size="small">
      <Header icon="detective" content={`${user.username}'s Profile Details`} />
      <Modal.Content>
        <p>
        The following is {`${user.username}'s`} data:
          {JSON.stringify(user)}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="blue" inverted onClick={closeModalDispatch}>
          <Icon name="cancel" /> Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

UserDetailsModal.propTypes = {
  user: PropTypes.object,
  isOpen: PropTypes.bool,
  closeModalDispatch: PropTypes.func,
};

UserDetailsModal.defaultProps = {
  user: {},
  isOpen: false,
  closeModalDispatch: () => null,
};

function mapStateToProps(state) {
  return {
    isOpen: state.userDetailsModal.isOpen,
    user: getSelectedUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModalDispatch: () => dispatch(closeModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsModal);
