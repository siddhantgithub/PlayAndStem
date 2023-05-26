import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function PyCodeChecker() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = "/api/CheckPyCode";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: prompt }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("This is the json response:", result);
        setResponse(result);
      } else {
        setErrorMessage("Error: Invalid request");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error: Something went wrong");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "82ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Python-code-checker"
          multiline
          rows={11}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          defaultValue="Type or Insert your code here"
        />
        <Box ml={1}>
          <Button variant="contained" onClick={handleClick}>
            Check the code!
          </Button>
        </Box>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <TextField
          id="outlined-read-only-input"
          label="Response"
          value={response}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </Box>
  );
}
