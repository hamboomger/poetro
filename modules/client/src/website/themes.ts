import { createMuiTheme } from '@material-ui/core';
import { blueGrey, purple, red } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blueGrey,
  },
});

export const alternativeTheme = createMuiTheme({
  palette: {
    primary: purple,
  },
});
