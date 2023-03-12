import {Box, Typography, Toolbar,AppBar,Container,Grid,Paper} from '@mui/material'
import Link from '../src/Link';

export default function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://playandstem.com">
          Play&Stem
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }