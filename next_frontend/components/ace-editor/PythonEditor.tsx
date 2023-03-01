import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import Box from '@mui/material/Box';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export const snippets = [
  `from microbit import *`,
  `from microbit import *

while True:`
]

const Editor = (props) => {
  const {onChange,value} = props;
  return (
    <Box>
      <Box id="example"></Box>
      <AceEditor
        mode="python"
        theme="github"
        onChange={onChange}
        name="example"
        width="450px"
        height="200px"
        value= {value}
        editorProps={{ $blockScrolling: true }}
      />
    </Box>
)
};

export default Editor;