import * as React from 'react';
import {Box, Typography, Toolbar,AppBar,Container,Grid,Paper} from '@mui/material'
import Link from '../../src/Link';
import Copyright from '../../components/Copyright'
import WelcomeParent from '../../components/parentDashboard/WelcomeParent'
import {getUserDataFromLocalStorage} from "../../actions/authRequestHandlers";
import ShowLearners from "../../components/parentDashboard/ShowLearners"
import { RequestTypeForParentLogin } from '../../constants/AllEnums';
import { GetSetParentDataThroughAPI } from '../../actions/ParentRequestHandler';


export default function ParentDashboard (props)
{
    const {parentObj} = props;
    const [learners,setLearners] = React.useState(null);
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
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" sx={{ bgcolor: "green" }}>
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
            </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
                >
                <Container sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                    {/* Welcome Parents */}
                    <Grid item xs={12}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 140,
                        }}
                        >
                            <WelcomeParent parentObj={parentObj}/>
                        </Paper>
                    </Grid>
                    {learners && 
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ShowLearners learners={learners} parentObj={parentObj}/>
                        </Paper>
                    </Grid>}
                    </Grid>
                    {/*<Copyright sx={{ pt: 4 }} />*/}
                </Container>
            </Box>
        </Box>
    );

}