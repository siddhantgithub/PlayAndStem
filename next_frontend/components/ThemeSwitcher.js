import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ThemeSwitcher = ({ theme, onThemeChange }) => {
  const themes = ["Light", "Dark", "Graphite", "Sapphire", "Ocean"];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChange = (event) => {
    const selectedTheme = event.target.value;
    const selectedIndex = event.target.index;
    // const selectedElement = event.target.options[selectedIndex];
    console.log(event.target.value);
    setSelectedIndex(selectedIndex);
    onThemeChange(selectedTheme, selectedIndex);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={theme}
          onChange={handleChange}
          displayEmpty
        >
          {themes.map((theme, index) => (
            <MenuItem value={index} key={index}>
              {theme}
              {/* {console.log({ index })} */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ThemeSwitcher;
