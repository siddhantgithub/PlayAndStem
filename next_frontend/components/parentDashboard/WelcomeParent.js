import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import Button from "@mui/material/Button";
import AddLearnerDialog from "../../components/parentDashboard/AddLearnerDialog";
import * as React from "react";

export default function WelcomeParent(props) {
  const [open, setOpen] = React.useState(false);
  const { storedUser } = props;

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
      <Typography component="p" variant="body1" sx={{ pb: 2 }}>
        Add learners to your account
      </Typography>

      <div>
        <Button variant="contained" onClick={AddLearnerClicked}>
          Add A Learner
        </Button>
      </div>
      <AddLearnerDialog
        open={open}
        onClose={handleClose}
        storedUser={storedUser}
      />
    </React.Fragment>
  );
}
