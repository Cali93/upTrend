import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleIcon from '@material-ui/icons/People';
import PostsIcon from '@material-ui/icons/LibraryBooks';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { resetLinkStyle } from '../../../utils/styles';

export const MainNavItems = withRouter(({ history, match }) => {
  const isActive = (path) => history.location.pathname.includes(path);
  return (
    <>
      <Link style={resetLinkStyle} to='/app/posts'>
        <ListItem button selected={isActive('/app/posts')}>
          <ListItemIcon>
            <PostsIcon />
          </ListItemIcon>
          <ListItemText primary='Posts' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/bookmarks'>
        <ListItem button selected={isActive('/app/bookmarks')}>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary='Bookmarks' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/users'>
        <ListItem button selected={isActive('/app/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/profile'>
        <ListItem button selected={isActive('/app/profile')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
      </Link>
    </>
  );
});

export const SecondaryNavItems = () => {
  return (
    <>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Current month' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Last quarter' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Year-end sale' />
      </ListItem>
    </>
  );
};
