// theme.jsx

import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const lightPalette = {
  primary: '#0A1828',
  secondary: '#178582',
  tertiary: '#BFA181',
  text: '#000',
  background: '#f8f8f8',
  inactive: '#48525b',
  body: '#6e6b7b',
  buttonText:'#fff',
  navbar:'#fff',
  landingBG:'#fff'

};

const darkPalette = {
  primary: '#0A1828',
  secondary: '#178582',
  tertiary: '#BFA181',
  text: '#ffffff',
  background: '#0A1828',
  inactive: '#48525b',
  body: '#6e6b7b',
  buttonText:'#fff',
  navbar:'#0f2742',
  landingBG:'#0A1828'
};

// Create context for theme
const ThemeContext = createContext();

// Custom hook to consume the theme context
export const useThemeContext = () => useContext(ThemeContext);

// ThemeProvider component to wrap your entire app
export const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define the theme based on the current mode
  const theme = useMemo(() => {
    const palette = isDarkMode ? darkPalette : lightPalette;
    return createTheme({
      palette: {
        primary: { main: palette.primary },
        secondary: { main: palette.secondary },
        tertiary: { main: palette.tertiary },
        text: { primary: palette.text , button : palette.buttonText },
        background: { default: palette.background , landingBG : palette.landingBG },
        action: {
          disabledBackground: palette.inactive,
          disabled: palette.inactive,
        },
        body: {
          primary : palette.body
        },
        navbar: {
          main : palette.navbar
        }
      },
    });
  }, [isDarkMode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
