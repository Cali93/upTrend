import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SeeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { usePostStyles } from './post.styles';
import { GET_ALL_POSTS, DELETE_POST } from '../../../graphql/posts';
import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { Mutation } from 'react-apollo';
import EditPostDialog from './EditPostDialog';
import CreatePostDialog from './CreatePostDialog';
import { useStoreState } from 'easy-peasy';

const Posts = () => {
  const classes = usePostStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);
  const [post, setPost] = useState({
    postId: null,
    userId: null,
    title: '',
    content: '',
    cover: ''
  });
  const currentUser = useStoreState(state => state.user.user.id);
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  const handleEditPost = (postId, userId, title, content, cover) => {
    setPost({ postId, userId, title, content, cover });
    setToggleEditDialog(prevState => !prevState);
  };

  const handleCreatePost = () => {
    setToggleCreateDialog(prevState => !prevState);
  };

  if (loading || !data.allPosts) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Posts
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            You can browse through all our posts accross the world.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleCreatePost}
                >
                  Create an post
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {isEditDialogOpen && (
        <EditPostDialog
          isOpen={isEditDialogOpen}
          toggleDialog={() => setToggleEditDialog()}
          post={post}
        />
      )}
      {isCreateDialogOpen && (
        <CreatePostDialog
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreatePost}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {data.allPosts.posts.map(({ id, userId, title, content, cover }) => (
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
                    {content.length > 200
                      ? `${content.slice(0, 200)}...`
                      : content
                    }
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size='small' color='primary'>
                    <SeeIcon color='primary' />
                  </Button>
                  {userId === currentUser && (
                  <>
                    <Button
                      size='small'
                      onClick={() => handleEditPost(id, userId, title, content, cover)}
                    >
                      <EditIcon color='secondary' />
                    </Button>
                    <Mutation mutation={DELETE_POST}>
                      {deletePost => (
                        <ConfirmPopover
                          confirmAction='Delete post'
                          onConfirmation={() =>
                            deletePost({
                              variables: {
                                postId: id
                              },
                              refetchQueries: [{ query: GET_ALL_POSTS }]
                            })
                          }
                        >
                          <DeleteIcon color='error' />
                        </ConfirmPopover>
                      )}
                    </Mutation>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
