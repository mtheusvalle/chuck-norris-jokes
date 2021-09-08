import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Giphy() {
  const [gif, setGif] = useState([]);

  useEffect(() => {
    axios.get('https://api.giphy.com/v1/gifs/random?api_key=p2AQOsLpmPprm8cUeAIYQHpD0u5VpCfu&tag=chuck+norris&rating=g')
      .then(res => {
        console.log(res.data.image_url)
        setGif(res.data.data.image_url);
      })
  }, [])

  return (
    <div>
      <img src={gif} alt="Chuck Norris" />
    </div>
  );
}