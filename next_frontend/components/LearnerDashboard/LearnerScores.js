import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import Grid from "@mui/material/Unstable_Grid2";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useStore } from "zustand";
import LearnerStore from "../../store/LearnerStore";

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
import {
  backgroundColors,
  buttonColors,
  buttonText,
  topicColors,
  cardBodyContrastTextColor,
} from "../../ui_assets/images/UIThemes/colorThemes";

export const LearnerScores = (props) => {
  const {
    products = [],
    sx,
    quizProgress,
    retryQuizClicked,
    viewAllQuizClicked,
    hideViewAll = false,
  } = props;
  const { currTheme } = useStore(LearnerStore);
  console.log("Quiz progress is ", quizProgress);

  const newProducts = products.slice(0, 3);
  console.log("New products are", newProducts);

  if (!hideViewAll)
    return (
      <Card sx={{ ...sx, backgroundColor: backgroundColors[currTheme] }}>
        
        <CardHeader
          title="Quizzes & Scores"
          sx={{
            backgroundColor: topicColors[currTheme],
            color: buttonText[currTheme],
          }}
          //background color changed : quizzes and scores
        />
        
        <List sx={{ backgroundColor: backgroundColors[currTheme] }}>
          {/* background color changed in quizzes topics */}
          {newProducts.map((product, index) => {
            var score = quizProgress[product.id];
            var retryClickHandler = () => {
              //console.log ("Retry quiz handler is", retryQuizClicked);
              retryQuizClicked(product.id);
            };
            var scoreMsg;
            if (score == -1) scoreMsg = "Not Done";
            else scoreMsg = "Score - " + score + "%";

            const hasDivider = index < newProducts.length - 1 && index < 2;
            const ago = "80%";

            return (
              <ListItem divider={hasDivider} key={product.id}>
                <ListItemAvatar>
                  {product.image ? (
                    <Box
                      component="img"
                      src={`/lessonImages/${product.image}`}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
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
                {
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      color: buttonText[currTheme],
                      backgroundColor: buttonColors[currTheme],
                    }}
                    onClick={retryClickHandler}
                  >
                    {scoreMsg != "Not Done" ? "ReTry" : "Try"}
                  </Button>
                }
              </ListItem>
            );
          })}
        </List>
        <Divider />
        {products.length > 3 && (
          <CardActions
            sx={{
              justifyContent: "flex-end",
              backgroundColor: backgroundColors[currTheme],
            }}
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
              sx={{
                color: cardBodyContrastTextColor[currTheme],
              }}
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
          sx={{
            mt: 2,
            //  backgroundColor: backgroundColors[currTheme]
          }}
        >
          {/* /* background color of quiz and scores */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={topicColors[currTheme]}
            // display="flex"
            // justifyContent="center"
            paddingLeft={2}
            fontWeight="bolder"
            // vertical-align="middle"
            pt="5px"
          >
            Quizzes & Scores
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
          else scoreMsg = "Score - " + Math.round(score) + "%";

          const hasDivider = index < products.length - 1;
          const ago = "80%";

          return (
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: 200,
                  height: 270,
                  margin: 1,
                  backgroundColor: backgroundColors[currTheme],
                }}
              >
                <CardActionArea onClick={retryClickHandler}>
                  <Image
                    alt={product.name}
                    src={`/lessonImages/${product.image}`}
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
                    backgroundColor: buttonColors[currTheme],
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
