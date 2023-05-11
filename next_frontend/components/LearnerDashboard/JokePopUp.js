import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function BasicPopover() {
  const [prompt, setPrompt] = React.useState(
    "Can you generate a meme or joke or a brief story related to robotics?"
  );
  const [response, setResponse] = React.useState("Dummy Jokes!");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/GenerateJokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    }).then((res) => res.json());

    setResponse(res.data.text);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Click for Jokes!
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{response}</Typography>
      </Popover>
    </div>
  );
}
