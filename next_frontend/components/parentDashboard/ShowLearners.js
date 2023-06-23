//File shows all the learners for a user
//Steps: 
//1) Fetch the learners list from the server using useEffect
import * as React from 'react';
import {GetLearnersArray} from '../../actions/LearnersRequestHandler';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import Button from '@mui/material/Button';
import AddLearnerDialog from '../../components/parentDashboard/AddLearnerDialog'
import Typography from '@mui/material/Typography';
import LearnerStore from '../../store/LearnerStore';


export default function ShowLearners (props) {
    const {learners,parentObj} = props;
    console.log ("Learners got here is", learners);
    const [learnersArray, setLearnersArray] = React.useState(learners);
    
    return (
        <React.Fragment>
            <LearnersArrayDiv learnersArray = {learnersArray} parentObj={parentObj}/>
        </React.Fragment>
    );
}

function LearnersArrayDiv (props)
{
    const {learnersArray,parentObj} = props;
    const [open, setOpen] = React.useState(false);
    const [updateFirstName, learnerName, userName] = LearnerStore (
        (state) => [state.updateFirstName, state.firstName, state.userName]
      );
    console.log ("First name got is", learnerName, userName);
    var rowId = 0;
    const listItems = learnersArray.map((d) => <li key={d.firstname}>{d.firstname}</li>);
    const handleClose = (value) => {
        setOpen(false);
      };
    
      function AddLearnerClicked(event) {
        event.preventDefault();
        setOpen(true);
      }

    function StartLearningClicked (learnerObj)
    {
        console.log ("Learner Obj got is", learnerObj);
        updateFirstName(learnerObj.firstname, learnerObj.username);

    }

    return (
        <React.Fragment>
            <Typography component="p" variant="body1" sx={{pb:2}}>
        Add learners to your account
      </Typography>

      <div >
        <Button variant="contained" onClick={AddLearnerClicked}>Add A Learner</Button>
      </div>
      <AddLearnerDialog
        open={open}
        onClose={handleClose}
        parentObj = {parentObj}
      />
            <Title>Your Learners</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {learnersArray.map((row, rowId) => { 
                    rowId ++;
                    console.log("Row is ", row);
                    const learningClicked = (evt) => {StartLearningClicked(row)}  
                    let urlToRedirect = "/main/LearnerDashboard_new?login=parent&learnerid=" + row._id;
                return(
                    <TableRow key={rowId}>
                        <TableCell>{row.firstname}</TableCell>
                        <TableCell>
                        <Link href={urlToRedirect} target = "_blank" rel="noopener">
                            <Button variant="contained" onClick={learningClicked}>Start Learning</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
            </React.Fragment>
    );
}