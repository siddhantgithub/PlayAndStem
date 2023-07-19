import * as React from 'react';
import {Box, Typography, Toolbar,AppBar,Container,Grid,Paper} from '@mui/material'
import Link from '../../src/Link';
import Copyright from '../../components/Copyright'
import WelcomeParent from '../../components/parentDashboard/WelcomeParent'
import {getUserDataFromLocalStorage} from "../../actions/authRequestHandlers";
import ShowLearners from "../../components/parentDashboard/ShowLearners"
import { RequestTypeForParentLogin } from '../../constants/AllEnums';
import { GetSetParentDataThroughAPI } from '../../actions/ParentRequestHandler';
import ParentTopChatBotComponent from './ParentTopChatBotComponent';
import { useStore } from "zustand";
import DisplayLearnerCards from './DisplayLearnerCards';
import AddLearnerDialog from './AddLearnerDialog';
import Avatar from "@mui/material/Avatar";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { signOut } from "next-auth/react"

function ShowPostLoginContentForParent({learners, parentObj}) 
{
    //callBackHandlers = {[retryQuizClicked, viewAllQuizClicked, reviewConceptClicked, viewAllConceptsClicked]}
    const [open, setOpen] = React.useState(false);
    console.log ("Learners we have got are ", learners );
    function AddLearnerClicked(event) {
      event.preventDefault();
      setOpen(true);
    }

    const handleClose = (value) => {
      setOpen(false);
    };
   // const { currTheme, updateTheme } = useStore(LearnerStore);
  
    return (
      <Grid container spacing={3} justifyContent="center">
        <AddLearnerDialog
        open={open}
        onClose={handleClose}
        parentObj = {parentObj}
      />
        {false && <Grid item xs={12} md={8} lg={8} sx={{ minHeight: 400, display: "flex", flexGrow:1 }} sm={12}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 350,
              flexGrow: 1,
              width:'auto'
              //width: 600
              //bgcolor: back groundColors[currTheme],
            }}
          >
            <ParentTopChatBotComponent/>
          </Paper>
        </Grid>}
  
        <Grid item xs={12} md={8} lg={8} sm={10}>

            <DisplayLearnerCards
              learners = {learners}
              AddLearnerClicked = {AddLearnerClicked}
            />

        </Grid>
      </Grid>
    );
  }

export default function ParentDashboard (props)
{
    const {parentObj, parentImage} = props;
    const [learners,setLearners] = React.useState(null);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      setAnchorEl(null);
      signOut({ callbackUrl: '/LandingScreen' })
    };
    
  
    console.log ("Parent Obj got is", parentObj);

    React.useEffect(() => {
        //console.log ("Use effect called");
        var reqObj = {reqType: RequestTypeForParentLogin.GetLearnersData, user: parentObj};
        console.log ("Will get the learners information from the parent", reqObj);
        GetSetParentDataThroughAPI(reqObj).then ((resp) => {
            console.log ("Learners got for the parent is", resp);
            setLearners(resp.learners);
        }); 
      }, [parentObj])

    return (
        <>
            <AppBar position="absolute" >
              <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Welcome {parentObj.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={parentObj.name} src={parentImage} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              </Toolbar>
             
            </AppBar>
            <ShowPostLoginContentForParent learners={learners} parentObj={parentObj}/>
        </>
    );
}

// export default function ParentDashboard (props)
// {
//     const {parentObj} = props;
//     const [learners,setLearners] = React.useState(null);
//     console.log ("Parent Obj got is", parentObj);

//     React.useEffect(() => {
//         //console.log ("Use effect called");
//         var reqObj = {reqType: RequestTypeForParentLogin.GetLearnersData, user: parentObj};
//         console.log ("Will get the learners information from the parent", reqObj);
//         GetSetParentDataThroughAPI(reqObj).then ((resp) => {
//             console.log ("Learners got for the parent is", resp);
//             setLearners(resp.learners);
//         }); 
//       }, [parentObj])

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <AppBar position="absolute" sx={{ bgcolor: "green" }}>
//             <Toolbar
//             sx={{
//               pr: '24px', // keep right padding when drawer closed
//             }}
//           >
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Welcome {parentObj.name}
//             </Typography>
//             </Toolbar>
//             </AppBar>
//             <Box
//                 component="main"
//                 sx={{
//                     backgroundColor: (theme) =>
//                     theme.palette.mode === 'light'
//                         ? theme.palette.grey[100]
//                         : theme.palette.grey[900],
//                     flexGrow: 1,
//                     height: '100vh',
//                     overflow: 'auto',
//                 }}
//                 >
//                 <Container sx={{ mt: 4, mb: 4 }}>
//                     <Grid container spacing={3}>
//                     {/* Welcome Parents */}
//                     <Grid item xs={12}>
//                         <Paper
//                         sx={{
//                             p: 2,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             minHeight: 140,
//                         }}
//                         >
//                             <WelcomeParent parentObj={parentObj}/>
//                         </Paper>
//                     </Grid>
//                     {learners && 
//                     <Grid item xs={12}>
//                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                             <ShowLearners learners={learners} parentObj={parentObj}/>
//                         </Paper>
//                     </Grid>}
//                     </Grid>
//                     {/*<Copyright sx={{ pt: 4 }} />*/}
//                 </Container>
//             </Box>
//         </Box>
//     );

// }