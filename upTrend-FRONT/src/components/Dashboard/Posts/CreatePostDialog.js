import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import {
  Dialog,
  DialogContent,
  Typography,
  Fade,
  Button,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core';

import { TextFieldGroup } from '../../common/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from '../../common/SubmitOrCancel/SubmitOrCancel';
import { GET_ALL_POSTS, CREATE_POST } from '../../../graphql/posts';
import { countryList } from '../../../utils/staticLists';
import { useStoreState } from 'easy-peasy';

const CreatePostDialog = ({ isOpen, toggleDialog }) => {
  const [createError, setCreateError] = useState(false);
  const currentUser = useStoreState(state => state.user.user.id);

  const validateFields = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    content: Yup.string().required(),
    cover: Yup.string()
  });

  const onSubmit = async (fields, form, createPost) => {
    if (createPost) {
      try {
        const createPostResponse = await createPost({
          variables: {
            input: {
              userId: currentUser,
              ...fields
            }
          },
          refetchQueries: [{ query: GET_ALL_POSTS }]
        });
        const { data } = createPostResponse;
        const hasData = data && data.createPost;
        const isCreateOk = hasData && data.createPost.ok;
        const hasCreateErrors =
          hasData && data.createPost.errors && data.createPost.errors.length > 0;

        if (hasCreateErrors || !isCreateOk) {
          return setCreateError(true);
        }

        if (isCreateOk) {
          form.resetForm();
          return true;
        }
      } catch (err) {
        return setCreateError(true);
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={toggleDialog}
      fullWidth
      aria-labelledby='create-post-dialog-title'
    >
      <DialogContent>
        <Mutation mutation={CREATE_POST}>
          {(createPost, { loading }) => (
            <Formik
              initialValues={{
                title: '',
                content: '',
                cover: ''
              }}
              validationSchema={validateFields}
              onSubmit={(fields, form) =>
                onSubmit(fields, form, createPost)
              }
              render={({
                errors,
                touched,
                handleSubmit,
                handleReset,
                values
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>Create post</Typography>
                  {createError && (
                    <Fade in={createError}>
                      <Typography color='error'>
                        Something went wrong while updating this post :(
                      </Typography>
                    </Fade>
                  )}
                  <Field
                    name='title'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='title'
                        label='Title'
                        placeholder='Title'
                        required
                      />
                    )}
                  />
                  <Field
                    name='content'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='content'
                        label='Content'
                        placeholder='Content'
                        required
                      />
                    )}
                  />
                  <Field
                    name='cover'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='cover'
                        label='Cover'
                        placeholder='Cover'
                        required
                      />
                    )}
                  />
                  <SubmitOrCancel
                    onSubmit={onSubmit}
                    errors={errors}
                    loading={loading}
                    resetForm={() => {
                      return handleReset();
                    }}
                  />
                </Form>
              )}
            />
          )}
        </Mutation>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
