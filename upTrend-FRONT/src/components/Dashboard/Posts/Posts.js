import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-apollo-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { usePostStyles } from './post.styles';
import { GET_ALL_POSTS, CREATE_POST } from '../../../graphql/posts';
import PostItem from './PostItem';
import PostFormDialog from './PostForm/PostFormDialog';
import HeroContainer from '../../common/HeroContainer/HeroContainer';

const Posts = () => {
  const classes = usePostStyles();
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);

  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  const handleCreatePost = useCallback(
    () => {
      setToggleCreateDialog(prevState => !prevState);
    },
    []
  );

  if (loading || !data.allPosts) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }
  return (
    <>
      <CssBaseline />
      <HeroContainer
        title='Posts'
        description='You can browse through all our posts accross the world.'
        heroButtons={
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={handleCreatePost}
            >
              Create a post
            </Button>
          </Grid>
        }
      />
      {isCreateDialogOpen && (
        <PostFormDialog
          initialValues={{
            title: '',
            content: '',
            cover: ''
          }}
          mutation={CREATE_POST}
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreatePost}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='lg'>
        <Grid container spacing={4}>
          {data.allPosts.posts.map(({ __typename, ...postProps }) => (
            <PostItem key={postProps.id} {...postProps} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
