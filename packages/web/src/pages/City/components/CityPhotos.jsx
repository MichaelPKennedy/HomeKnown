import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCityData } from "../../../utils/CityDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styles from "./swiperStyles.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";

import { stateAbbreviations } from "../../HomePage/constants";

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const CityPhotos = () => {
  const { cityData } = useCityData();
  const { city_name, state_name } = cityData || {};
  const [photos, setPhotos] = useState([]);
  const stateAbbrev = stateAbbreviations[state_name];

  useEffect(() => {
    const fetchAndFilterPhotos = async () => {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`,
          },
          params: {
            query: `${city_name} ${state_name}`,
            per_page: 30,
          },
        }
      );

      const excludedTags = [
        "woman",
        "adult only",
        "person",
        "one person",
        "man",
        "one man",
        "one man only",
        "one woman",
        "one woman only",
        "adult",
        "human",
        "auto",
        "vehicle",
        "car",
        "automobile",
        "car images & pictures",
        "nude",
        "erotic",
        "sexy",
        "intimate",
        "car",
        "motorcycle",
        "bike",
        "alcohol",
        "drink",
        "nightlife",
        "animal photography",
        "puppy photo",
        "macys",
        "grey",
        "earthquake",
      ];
      console.log("unsplash response", response.data.results);
      const filteredPhotos = response.data.results.filter((photo) => {
        const description = photo.description
          ? photo.description.toLowerCase()
          : "";
        const altDescription = photo.alt_description
          ? photo.alt_description.toLowerCase()
          : "";

        // Filter out photos with excluded tags
        const hasExcludedTag = photo.tags.some((tag) =>
          excludedTags.includes(tag.title)
        );
        if (hasExcludedTag) return false;

        const allText = [
          description,
          altDescription,
          ...photo.tags.map((tag) => tag.title.toLowerCase()),
        ].join(" ");
        const cityNameLower = city_name.toLowerCase();
        const stateNameLower = state_name.toLowerCase();
        const stateAbbrevLower = stateAbbrev.toLowerCase();

        const cityMatch = allText.includes(cityNameLower);
        const stateMatch =
          allText.includes(stateNameLower) ||
          new RegExp(
            `\\b${stateAbbrevLower}\\b|,\\s*${stateAbbrevLower}\\s*,|${stateAbbrevLower}\\.|\\s${stateAbbrevLower}\\s`,
            "i"
          ).test(allText);

        return cityMatch && stateMatch;
      });

      setPhotos(filteredPhotos);
    };

    if (city_name && state_name && stateAbbrev) {
      fetchAndFilterPhotos();
    }
  }, [city_name, state_name, stateAbbrev]);

  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id} className={styles.swiperSlide}>
          <img src={photo.urls.full} alt={photo.alt_description} />
          <p>
            Photo by{" "}
            <a
              href={photo.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.user.name}
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CityPhotos;
