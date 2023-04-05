import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Image from 'next/image'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


function MissionInformation (props)
{
    return (
    <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        > 
        <Grid container spacing={3} flexDirection="column">
            <Grid item xs={12} md={12} lg={4} >
            <Image
      src="/Zacobiamission.jpg"
      width = {100}
      height = {100}
    />
            </Grid>           
            <Grid item xs={12} md={12} lg={4} >
            </Grid>
        </Grid>
    </Paper>);

}
export default function QuizAndScore (props)
{
    return (
        <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 350
          }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Quizzes & Scores
        </Typography>
        {[1,2,3].map((x) => <Card sx={{
            mb: 1,
            display: 'flex',
            flexDirection: 'column',
            height: 100
          }}>
      <CardContent>
      <Typography variant="h6" component="div">
         Overall 
        </Typography>
        
        <Typography variant="h4" component="div" sx={{ pb: 0 }}>
         90%
        </Typography>
        <Typography variant="body2" component="div">
         Across all missions
        </Typography>
      </CardContent>
    </Card>)}
    </Paper>
    );
    /*return (
        <Paper sx={{
            p: 2,
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            height: 500
          }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Quizzes & Scores
        </Typography>
        {[1,2,3].map((x) => <MissionInformation/>)}
    </Paper>
    );*/

}