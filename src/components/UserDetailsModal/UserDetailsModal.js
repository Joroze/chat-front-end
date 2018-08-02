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
  const { closeModalDispatch, user } = props;

  return (
    <Modal className="component-user-details-modal" open onClose={closeModalDispatch} basic size="small">
      <Header icon="detective" content={`${user.username || 'User'}'s Profile Details`} />
      <Modal.Content>
        {Object.keys(user).map((key) => {
          const userValue = user[key];

          if (key === 'location' && typeof userValue === 'object') {
            return Object.keys(userValue).map(innerKey => <p key={innerKey}>{`${innerKey}: ${userValue[innerKey]}`}</p>);
          }

          return <p key={key}>{`${key}: ${userValue}`}</p>;
        })}
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
  closeModalDispatch: PropTypes.func,
};

UserDetailsModal.defaultProps = {
  user: {},
  closeModalDispatch: () => null,
};

function mapStateToProps(state) {
  return {
    user: getSelectedUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModalDispatch: () => dispatch(closeModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsModal);
