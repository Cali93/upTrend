import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleIcon from '@material-ui/icons/People';
import PostsIcon from '@material-ui/icons/LibraryBooks';
import CodeIcon from '@material-ui/icons/Code';
import SecurityIcon from '@material-ui/icons/Security';
import NetworkIcon from '@material-ui/icons/NetworkCheck';
import TestingIcon from '@material-ui/icons/Assignment';
import AIIcon from '@material-ui/icons/GraphicEq';
import AllIcon from '@material-ui/icons/AllInclusive';

import { resetLinkStyle } from 'utils/styles';

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

export const SecondaryNavItems = withRouter(({ history }) => {
  const setCategoryToBrowse = useStoreActions(actions => actions.posts.setCategoryToBrowse);
  const selectedCategory = useStoreState(state => state.posts.selectedCategory);
  const isActive = category => category === selectedCategory;
  const isOnPostsPage = history.location.pathname.includes('/app/posts');
  return isOnPostsPage && (
    <>
      <ListItem
        button
        onClick={() => setCategoryToBrowse('')}
        selected={isActive('')}
      >
        <ListItemIcon>
          <AllIcon />
        </ListItemIcon>
        <ListItemText primary='All Categories' />
      </ListItem>
      <ListItem
        button
        onClick={() => setCategoryToBrowse('software')}
        selected={isActive('software')}
      >
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary='Software' />
      </ListItem>
      <ListItem button onClick={() => setCategoryToBrowse('security')} selected={isActive('security')}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary='Security' />
      </ListItem>
      <ListItem button onClick={() => setCategoryToBrowse('network')} selected={isActive('network')}>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary='Network' />
      </ListItem>
      <ListItem button onClick={() => setCategoryToBrowse('AI')} selected={isActive('AI')}>
        <ListItemIcon>
          <AIIcon />
        </ListItemIcon>
        <ListItemText primary='Artificial Intelligence' />
      </ListItem>
      <ListItem button onClick={() => setCategoryToBrowse('testing')} selected={isActive('testing')}>
        <ListItemIcon>
          <TestingIcon />
        </ListItemIcon>
        <ListItemText primary='Testing &amp; QA' />
      </ListItem>
    </>
  );
});
