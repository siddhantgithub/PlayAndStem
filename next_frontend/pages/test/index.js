import dynamic from 'next/dynamic'
import React from "react";
import Box from '@mui/material/Box';

const Ace = dynamic(
  () => import("../../components/ace-editor/PythonEditor"),
  { ssr: false }
)

const Editor = () => {
    return (
      <Box>
        <Ace />        
      </Box>
    );
}

export default Editor;