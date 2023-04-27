import React, { useEffect, useState } from "react";
import axios from "axios";

async function fetchImages() {
  console.log(process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN);
  const response = await axios.get(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
  );
  return response.data.data;
}

const IndexPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchAndSetImages() {
      const fetchedImages = await fetchImages();
      console.log(fetchedImages);
      setImages(fetchedImages.slice(0, 4));
    }

    fetchAndSetImages();
  }, []);

  console.log("sss");

  return (
    <div>
      {images.map((image: any) => (
        <img
          key={image.id}
          src={image.media_url || image.thumbnail_url}
          alt={image.caption}
          style={{
            width: "200px",
            height: "200px",
          }}
        />
      ))}
    </div>
  );
};

export default IndexPage;
