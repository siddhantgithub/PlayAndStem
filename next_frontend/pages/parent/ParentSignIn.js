import * as React from 'react';
import {Box, Typography, Toolbar,AppBar,Container,Grid,Paper} from '@mui/material'
import { signIn, signOut, useSession } from "next-auth/react"
import { GetSetParentDataThroughAPI } from '../../actions/ParentRequestHandler';
import { RequestTypeForParentLogin } from '../../constants/AllEnums';

export default function ParentLogin() 
{
    const { data: session, status } = useSession();
    const isUser = !!session && session.user;
    const loading = status === "loading";
    const [parentObj, setParentObj] = React.useState(null);

    React.useEffect(() => {
        //console.log ("Use effect called");
        if (loading) return // Do nothing while loading
        if (!isUser) {
            console.log ("No user found");
            //Need to redirect to parent login
        } // If not authenticated, force log in
        //console.log ("The value of session is", session);
        if (isUser)
        {
            var reqObj = {reqType: RequestTypeForParentLogin.Login, user: session.user}
        
            console.log ("Will get the learners information from the parent", reqObj);
            GetSetParentDataThroughAPI(reqObj).then ((resp) => {
                console.log ("Data got for the parent is", resp);
                setParentObj(resp);
            }); 
        }
      }, [isUser, loading])

    return (
        <Box>
            {parentObj == null ? "Retrieving parent information": "Got a parent with name " + parentObj.name}
            Parent Login successful
            {JSON.stringify(session)}
        </Box>

    );

}