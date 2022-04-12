import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#0b8ad9',
      },
      secondary: {
        main: '#053259',
      },
      
    },
  });
  

const Providers: React.FC = ({ children }) => { 

    return (
        <ThemeProvider theme={theme} >
            {children}
        </ThemeProvider>
      );

}


export default Providers;