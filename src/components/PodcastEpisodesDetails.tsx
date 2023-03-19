import { Box, Card, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models';
import { FC } from 'react';
import PodcastEpisodeModel from '../models/PodcastEpisode';

const PodcastEpisodesDetails: FC<{
  episodes: PodcastEpisodeModel[];
  onClick: (id: number) => void;
}> = ({ episodes, onClick }) => {
  const rows = episodes.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      date: transformDate(episode.date),
      duration: msToTime(episode.duration),
    };
  });

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Episodes: {episodes.length}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box height="600px" width="100%">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              onRowClick={(row) => onClick(row.id as number)}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default PodcastEpisodesDetails;

const msToTime = (miliseconds: number) => {
  const seconds = Math.floor((miliseconds / 1000) % 60);
  const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
  if (hours === 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

const transformDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 600 },
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'duration', headerName: 'Duration', width: 100 },
];
