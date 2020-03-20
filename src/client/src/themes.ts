import { createMuiTheme } from '@material-ui/core';
import { red, purple } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export const alternativeTheme = createMuiTheme({
  palette: {
    primary: purple,
  },
});
