import { createTheme } from '@mui/material/styles';
import components from './components';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette: {
    primary: palette.primary,
    secondary: palette.secondary,
  },
  typography,
  components,
});

export default theme;
