import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SeeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, Typography, Button } from '@material-ui/core';

import { UPDATE_POST, DELETE_POST, GET_ALL_POSTS } from 'graphql/posts';
import { sliceContent } from 'utils/helpers';
import useToggle from 'utils/hooks/useToggle';
import FullScreenDialog from 'components/templates/FullScreenDialog/FullScreenDialog';
import DeleteButton from 'components/molecules/DeleteButton/DeleteButton';

import PostFormDialog from '../../templates/PostForm/PostFormDialog';
import { usePostStyles } from './post.styles';

const PostItem = ({ id, userId, title, content, cover }) => {
  const classes = usePostStyles();
  const currentUser = useStoreState(state => state.user.user.id);
  const { isOpen: isEditDialogOpen, handleToggle: setToggleEditDialog } = useToggle();
  const { isOpen: isReadDialogOpen, handleToggle: setToggleReadDialog } = useToggle();

  const [post, setPost] = useState({
    postId: null,
    title: '',
    content: '',
    cover: ''
  });

  const handleEditPost = (postId, title, content, cover) => {
    setPost({ postId, title, content, cover });
    setToggleEditDialog();
  };

  return (
    <>
      {isEditDialogOpen && (
        <PostFormDialog
          mode='edit'
          initialValues={post}
          mutation={UPDATE_POST}
          isOpen={isEditDialogOpen}
          toggleDialog={setToggleEditDialog}
        />
      )}
      {isReadDialogOpen && (
        <FullScreenDialog
          isOpen={isReadDialogOpen}
          toggleDialog={setToggleReadDialog}
        />
      )}
      <Grid item key={id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={cover}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h4' component='h3'>
              {title}
            </Typography>
            <Typography gutterBottom variant='body1'>
              {sliceContent(content, 200)}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              size='small'
              color='primary'
              onClick={setToggleReadDialog}
            >
              <SeeIcon color='primary' />
            </Button>
            {userId === currentUser && (
              <>
                <Button
                  size='small'
                  onClick={() =>
                    handleEditPost(id, title, content, cover)
                  }
                >
                  <EditIcon color='secondary' />
                </Button>
                <DeleteButton
                  actionTitle='Delete post'
                  mutation={DELETE_POST}
                  variables={{
                    postId: id
                  }}
                  refetchQueries={[{ query: GET_ALL_POSTS }]}
                />
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default PostItem;
