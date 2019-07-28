import React from 'react';
import { useHeroContainerStyles } from './heroContainer.styles';
import { Container, Typography, Grid, Button } from '@material-ui/core';

const HeroContainer = ({ title, description, heroButtons }) => {
  const classes = useHeroContainerStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth='sm'>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          paragraph
        >
          {description}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify='center'>
            {heroButtons}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default HeroContainer;
