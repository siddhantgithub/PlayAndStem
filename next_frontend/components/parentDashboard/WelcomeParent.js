import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import Button from '@mui/material/Button';
import AddLearnerDialog from '../../components/parentDashboard/AddLearnerDialog'
import * as React from 'react';



export default function WelcomeParent(props) {
  const [open, setOpen] = React.useState(false);
  const {parentObj} = props;
 
  const handleClose = (value) => {
    setOpen(false);
  };

  function AddLearnerClicked(event) {
    event.preventDefault();
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Title>Let's Get Started</Title>
    </React.Fragment>
  );
}
