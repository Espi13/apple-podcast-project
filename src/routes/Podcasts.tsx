import { Container } from "@mui/material";
import { FC, useState } from "react";
import PodcastList from "../components/PodcastList";
import SearchInput from "../components/SearchInput";
import PodcastModel from "../models/podcast.model";

const Podcasts: FC = () => {
  const [numPodcasts, setNumPodcasts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <SearchInput numPodcasts={numPodcasts} onSearch={setSearchTerm} />
      <PodcastList searchTerm={searchTerm} setNumPodcast={setNumPodcasts} />;
    </Container>
  );
};

export default Podcasts;

export const loader = async () => {
  const response = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
  const resData = await response.json();
  const { feed } = resData;

  const podcasts = feed.entry.map((podcast: any) => {
    return {
      id: podcast.id.attributes["im:id"],
      artist: podcast["im:artist"].label,
      image: podcast["im:image"][2].label,
      title: podcast.title.label,
    };
  }) as PodcastModel[];

  return podcasts;
};