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

export const LearnerConceptsLearned = (props) => {
  const { products = [], sx,reviewConceptClicked,viewAllConceptsClicked, hideViewAll= false } = props;
  const newProducts = products.slice (0,3);

  if (!hideViewAll) 
  return (
    <Card sx={sx}>
      <CardHeader title="Key Concepts Covered" />
      <List>
        {newProducts.map((product, index) => {
          const hasDivider = index < newProducts.length - 1;
          const ago = product.description;
          var reviewClickHandler = () => {
            //console.log ("Retry quiz handler is", retryQuizClicked);
            reviewConceptClicked(product);
          }

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
                        src={`/lessonImages/${product.image}`}
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
                secondary={ago}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Button size="small" onClick={reviewClickHandler}>Revise</Button>
            </ListItem>
          );
        })}
      </List>
      <Divider />
     { products.length > 3  && <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick = {viewAllConceptsClicked}
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
                Key Concepts Covered
             </Typography>
        </Grid>
      
      {        
          products.map((product, index) => {
            const ago = product.description;
            var reviewClickHandler = () => {
            //console.log ("Retry quiz handler is", retryQuizClicked);
            reviewConceptClicked(product);
          }
          
          return (
            <Grid item > 
              <Card sx={{ width: 200, height: 300,margin: 1}}>
              <CardActionArea onClick = {reviewClickHandler}>
        
              <Image alt = {product.name} src={`/lessonImages/${product.image}`}  width={200} height={150}></Image>
              
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ago}
                </Typography>
              </CardContent>
              </CardActionArea>
                <Button size="small" onClick= {reviewClickHandler}>Review</Button>
            </Card>
          </Grid>
            
          );
        })}
   
  </Grid>   
  );

};