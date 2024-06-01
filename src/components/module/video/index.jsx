import YouTube from "react-youtube";

const YouTubeEmbed = ({ videoId }) => {
  const opts = {
    height: "590",
    width: "940",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubeEmbed;
