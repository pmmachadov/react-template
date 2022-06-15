import { createTheme } from '@mui/material/styles';

import Link from './override-component/Link';
import color from './color';

// A custom theme for this app
const theme = createTheme({
  components: {
    ...Link,
  },
  palette: {
    ...color,
  },
});
export default theme;
