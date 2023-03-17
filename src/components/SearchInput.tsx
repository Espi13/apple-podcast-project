import { Chip, Grid, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface ISearchInputProps {
  numPodcasts: number;
  onSearch: (searchTerm: string) => void;
}

const SearchInput: FC<ISearchInputProps> = ({ numPodcasts, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handlerSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Grid
      sx={{
        justifyContent: "flex-end",
        display: "flex",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Chip label={numPodcasts} color="primary" sx={{ mr: 2 }} />
      <TextField
        id="search-input"
        label="FilterPodcast"
        variant="outlined"
        value={searchTerm}
        onChange={handlerSearch}
      />
    </Grid>
  );
};

export default SearchInput;
