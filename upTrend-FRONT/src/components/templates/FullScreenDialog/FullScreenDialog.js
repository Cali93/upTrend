import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useQuery } from 'react-apollo-hooks';
import { GET_ALL_COMMENTS_BY_POST } from 'graphql/comments';
import CommentsList from 'components/organisms/CommentsList/CommentsList';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog ({ isOpen, toggleDialog, title, category,
  content, author, postId }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_ALL_COMMENTS_BY_POST, {
    variables: { postId }
  });
  if (loading) return <div />;
  if (error) return <h4>Oops, an error has occured</h4>;

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleDialog}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {category}
            </Typography>
            <Button color='inherit' onClick={toggleDialog}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary={title} secondary={author} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={content} />
          </ListItem>
        </List>
        <Divider />
        <CommentsList comments={data.allCommentsByPostId.comments} />
      </Dialog>
    </div>
  );
}
