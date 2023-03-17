import { AppBar, Container, Link, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

const MainHeader: FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, ml: 2, color: blue[500] }}
        >
          <Link component={RouterLink} to="/" underline="none">
            Podcaster
          </Link>
        </Typography>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
