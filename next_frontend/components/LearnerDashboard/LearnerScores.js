import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Grid from '@mui/material/Unstable_Grid2'; 
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const LearnerScores = (props) => {
  const { products = [], sx, quizProgress,retryQuizClicked, viewAllQuizClicked, hideViewAll= false} = props;
  //console.log ("Quiz progress is ", quizProgress);


  if (!hideViewAll) 
  return (
    <Card sx={sx}>
      <CardHeader title="Quizes & Scores" />
      <List>
        {
        products.map((product, index) => {
          var score = quizProgress[product.id];
          var retryClickHandler = () => {
            //console.log ("Retry quiz handler is", retryQuizClicked);
            retryQuizClicked(product.id);
          }
          var scoreMsg;
          if (score == -1)
            scoreMsg = "Not Done"
          else
            scoreMsg = "Score - " + score + "%";

          const hasDivider = index < products.length - 1;
          const ago = "80%";

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={product.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={scoreMsg}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              {(scoreMsg != "Not Done") && <Button size="small" onClick = {retryClickHandler}>ReTry</Button>}
            </ListItem>
          );
        })}
      </List>

      <Divider />
      {!hideViewAll && <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick = {viewAllQuizClicked}
        >
          View all
        </Button>
      </CardActions>}
    </Card>
  );
  else
  return (
    <Grid container spacing={0}  alignItems= "flex-start" justifyContent="left">   
        <Grid item xs={12} md={12} lg={12} sx ={{mt:2}} >
            <Typography gutterBottom variant="h5" component="div">
                  Quizes & Scores
             </Typography>
        </Grid>
      
      {        
          products.map((product, index) => {
          var score = quizProgress[product.id];
          var retryClickHandler = () => {
            //console.log ("Retry quiz handler is", retryQuizClicked);
            retryQuizClicked(product.id);
          }
          var scoreMsg;
          if (score == -1)
            scoreMsg = "Not Done"
          else
            scoreMsg = "Score - " + score + "%";

          const hasDivider = index < products.length - 1;
          const ago = "80%";

          return (
            <Grid item > 
              <Card sx={{ width: 200, height: 270,margin: 1}}>
              <CardActionArea onClick = {retryClickHandler}>
        
              <Image alt = {product.name} src = {product.image}  width={200} height={150}></Image>
              
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scoreMsg}
                </Typography>
              </CardContent>
              </CardActionArea>
                <Button size="small" onClick= {retryClickHandler}>Retry</Button>
            </Card>
          </Grid>
            
          );
        })}
   
  </Grid>   
  );
};