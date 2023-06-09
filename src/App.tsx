import { createTheme, ThemeProvider } from '@mui/material';
import ReactDoom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Podcasts, { loader as podcastsLoader } from './routes/Podcasts';
import PodcastDetails, {
  loader as podcastDetailsLoader,
} from './routes/PodcastDetails';
import RootLayout from './routes/RootLayout';
import Episode, { loader as episodeLoader } from './routes/Episode';

const theme = createTheme({});

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          loader: podcastsLoader,
          element: <Podcasts />,
        },
        {
          path: '/podcast/:podcastId',
          loader: ({ params }) => podcastDetailsLoader(params.podcastId),
          element: <PodcastDetails />,
        },
        {
          path: '/podcast/:podcastId/episode/:episodeId',
          loader: ({ params }) =>
            episodeLoader(params.podcastId, params.episodeId),
          element: <Episode />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

const root = ReactDoom.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
