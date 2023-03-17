import { createTheme, ThemeProvider } from "@mui/material";
import ReactDoom from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Podcasts, { loader as podcastsLoader } from "./routes/Podcasts";
import RootLayout from "./routes/RootLayout";

const theme = createTheme({});

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          loader: podcastsLoader,
          element: <Podcasts />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

const root = ReactDoom.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
