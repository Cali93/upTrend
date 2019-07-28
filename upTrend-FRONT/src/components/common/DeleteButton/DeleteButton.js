import React from 'react';
import { Mutation } from 'react-apollo';

import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmPopover from '../ConfirmPopover/ConfirmPopover';

const DeleteButton = ({ actionTitle, mutation, variables, refetchQueries }) => {
  return (
    <Mutation mutation={mutation}>
      {mutate => (
        <ConfirmPopover
          confirmAction={actionTitle}
          onConfirmation={() =>
            mutate({
              variables,
              refetchQueries
            })
          }
        >
          <DeleteIcon color='error' />
        </ConfirmPopover>
      )}
    </Mutation>
  );
};

export default DeleteButton;
