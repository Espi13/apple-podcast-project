import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC } from "react";

interface IPodcastProps {
  id: string;
  image: string;
  title: string;
  author: string;
  onClick: () => void;
}

const Podcast: FC<IPodcastProps> = ({ image, title, author, onClick }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ marginTop: "50px", cursor: "pointer" }}
      onClick={onClick}
    >
      <Card
        sx={{
          textAlign: "center",
          height: "100%",
          position: "relative",
          overflow: "inherit",
        }}
      >
        <CardMedia
          image={image}
          sx={{
            height: 100,
            width: 100,
            borderRadius: "50%",
            margin: "auto",
            position: "absolute",
            top: -50,
            left: 0,
            right: 0,
          }}
        />
        <CardContent sx={{ paddingTop: "74px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ userSelect: "none" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ userSelect: "none" }}
          >
            Author: {author}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Podcast;
