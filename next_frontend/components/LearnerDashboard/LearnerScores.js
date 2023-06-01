import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import Grid from "@mui/material/Unstable_Grid2";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

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
  SvgIcon,
} from "@mui/material";

export const LearnerScores = (props) => {
  const {
    products = [],
    sx,
    quizProgress,
    retryQuizClicked,
    viewAllQuizClicked,
    hideViewAll = false,
  } = props;
  //console.log ("Quiz progress is ", quizProgress);

  if (!hideViewAll)
    return (
      <Card sx={sx}>
        <CardHeader
          title="Quizzes & Scores"
          sx={{ backgroundColor: "#542E0F", color: "#FFCF71" }}
          //background color changed : quizzes and scores
        />
        <List sx={{ backgroundColor: "#FFCF71" }}>
          {/* background color changed in quizzes topics */}
          {products.map((product, index) => {
            var score = quizProgress[product.id];
            var retryClickHandler = () => {
              //console.log ("Retry quiz handler is", retryQuizClicked);
              retryQuizClicked(product.id);
            };
            var scoreMsg;
            if (score == -1) scoreMsg = "Not Done";
            else scoreMsg = "Score - " + score + "%";

            const hasDivider = index < products.length - 1;
            const ago = "80%";

            return (
              <ListItem divider={hasDivider} key={product.id}>
                <ListItemAvatar>
                  {product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                        // backgroundColor: "#FFCF71",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "neutral.200",
                        height: 48,
                        width: 48,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={scoreMsg}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                {scoreMsg != "Not Done" && (
                  <Button size="small" onClick={retryClickHandler}>
                    ReTry
                  </Button>
                )}
              </ListItem>
            );
          })}
        </List>

        <Divider />
        {!hideViewAll && (
          <CardActions
            sx={{ justifyContent: "flex-end", backgroundColor: "#FFCF71" }}
          >
            <Button
              color="inherit"
              endIcon={
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              }
              size="small"
              variant="text"
              onClick={viewAllQuizClicked}
            >
              View all
            </Button>
          </CardActions>
        )}
      </Card>
    );
  else
    return (
      <Grid container spacing={0} alignItems="flex-start" justifyContent="left">
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{ mt: 2, backgroundColor: "#FFCF71" }}
        >
          {/* /* background color of quiz and scores */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="#7B3F00"
            display="flex"
            justifyContent="center"
            fontWeight="bolder"
            // vertical-align="middle"
            pt="5px"
          >
            Quizes & Scores
          </Typography>
        </Grid>

        {products.map((product, index) => {
          var score = quizProgress[product.id];
          var retryClickHandler = () => {
            //console.log ("Retry quiz handler is", retryQuizClicked);
            retryQuizClicked(product.id);
          };
          var scoreMsg;
          if (score == -1) scoreMsg = "Not Done";
          else scoreMsg = "Score - " + score + "%";

          const hasDivider = index < products.length - 1;
          const ago = "80%";

          return (
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: 200,
                  height: 270,
                  margin: 1,
                  backgroundColor: "#FFCF71",
                }}
              >
                <CardActionArea onClick={retryClickHandler}>
                  <Image
                    alt={product.name}
                    src={product.image}
                    width={200}
                    height={150}
                  ></Image>

                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scoreMsg}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  size="small"
                  onClick={retryClickHandler}
                  //modified RETRY button in Quizzes and scores
                  variant="contained"
                  sx={{
                    ml: "12px",
                    backgroundColor: "#7B3F00",
                  }}
                >
                  Retry
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
};
