import * as React from 'react';
import {Box, Typography, Toolbar,AppBar,Container,Grid,Paper} from '@mui/material'
import Link from '../../src/Link';
import Copyright from '../../components/Copyright'
import WelcomeParent from '../../components/parentDashboard/WelcomeParent'
import {getUserDataFromLocalStorage} from "../../actions/authRequestHandlers";
import ShowLearners from "../../components/parentDashboard/ShowLearners"

//TODO: Use SWR
//Need to check if able to login with JWT token expired
function DashboardContent ()
{
    const [storedUser,setStoredUser] = React.useState(null);
    React.useEffect(() => {
        setStoredUser(getUserDataFromLocalStorage());
    }, []);

    if (storedUser)
    {
        return <UserDataAvailable  storedUser={storedUser}/>
    }
    return <UserDataNotAvailable/>;

}

function UserDataAvailable (props)
{
    const {storedUser} = props;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute">
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
              Welcome {storedUser.email}
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
                <Toolbar />
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
                            <WelcomeParent storedUser={storedUser}/>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ShowLearners storedUser={storedUser}/>
                        </Paper>
                    </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );

}

function UserDataNotAvailable()
{
    return (
        <React.Fragment>
            User not found. Please signin again
        </React.Fragment>
    );
}

export default function ParentDashboard ()
{
    return <DashboardContent/>;
}