import React, { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LearnerStore from "./../store/LearnerStore";
import { useStore } from "zustand";

const backgroundColors = [
  "#FFCF71",
  "#542E0F",
  "#808080",
  "sapphire",
  "skyblue",
];

const UIComponent = () => {
  const [theme, setTheme] = useState("");
  // const currTheme = useStore(LearnerStore);
  const { currTheme, updateTheme } = useStore(LearnerStore);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    console.log("Selected Theme:", selectedTheme);
    updateTheme(selectedTheme);
    // LearnerStore.updateTheme(selectedTheme);
  };

  // useEffect(() => {
  //   console.log("Current Theme:", currTheme.theme);
  // }, [currTheme]);

  //console.log("Updated Current Theme:", useStore(LearnerStore).currTheme);
  // console.log("Updated Current Theme2:", currTheme);
  return (
    <div>
      <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      {console.log("This is the selected theme:", theme)}
    </div>
  );
};

export default UIComponent;
