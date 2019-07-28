import { makeStyles } from '@material-ui/core';

export const usePostStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
