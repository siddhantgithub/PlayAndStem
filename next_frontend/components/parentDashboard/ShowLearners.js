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


export default function ShowLearners (props) {
    const {parentObj} = props;
    const [learnersArray, setLearnersArray] = React.useState(parentObj.learners);


    return (
        <React.Fragment>
            <LearnersArrayDiv learnersArray = {learnersArray}/>
        </React.Fragment>
    );

}

function StartLearningClicked ()
{

}

function LearnersArrayDiv (props)
{
    const {learnersArray} = props;
    var rowId = 0;
    const listItems = learnersArray.map((d) => <li key={d.name}>{d.name}</li>);
    return (
        <React.Fragment>
            <Title>Your Learners</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {learnersArray.map((row, rowId) => { rowId ++; 
                return(
                    <TableRow key={rowId}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={StartLearningClicked}>Start Learning</Button>
                        </TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
            </React.Fragment>
    );
}

