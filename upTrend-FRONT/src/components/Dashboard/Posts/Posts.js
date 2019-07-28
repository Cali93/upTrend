import React from 'react';
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
import useToggle from '../../../hooks/useToggle';
import PostList from './PostList';

const Posts = () => {
  const classes = usePostStyles();
  const { isOpen: isCreateDialogOpen, handleToggle: setToggleCreateDialog } = useToggle();

  const { data, error, loading } = useQuery(GET_ALL_POSTS);

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
              onClick={setToggleCreateDialog}
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
          toggleDialog={setToggleCreateDialog}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='lg'>
        <Grid container spacing={4}>
          <PostList posts={data.allPosts.posts} />
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
