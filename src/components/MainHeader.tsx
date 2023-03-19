import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC } from 'react';
import { Link as RouterLink, useNavigation } from 'react-router-dom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const MainHeader: FC = () => {
  const { state } = useNavigation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, ml: 2, color: blue[500] }}
          >
            <Link component={RouterLink} to="/" underline="none">
              Podcaster
            </Link>
          </Typography>

          {state == 'loading' && <HourglassTopIcon sx={{ color: blue[500] }} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainHeader;
