import { makeStyles } from '@material-ui/core';

export const useLikeButtonStyles = makeStyles(theme => ({
  badge: {
    right: -5,
    backgroundColor: theme.palette.success.main,
    paddingTop: '2px'
  }
}));
