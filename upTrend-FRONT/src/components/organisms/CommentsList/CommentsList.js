import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

export default function CommentsList ({ comments }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map(comment => {
        const fullName = `${comment.User.firstName} ${comment.User.lastName}`;
        return (
          <>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt={fullName}
                  src={comment.User.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      {fullName}
                    </Typography>
                    <Typography
                      component='p'
                      variant='body1'
                      color='textPrimary'
                    >
                      {comment.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        );
      })}
    </List>
  );
}
