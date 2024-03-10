import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import styles from "./swiperStylesHome.module.css";

import unsplashLogo from "../../../assets/unsplashLogo.png";

const Photos = ({ city }) => {
  const { photos } = city || {};
  if (!photos || !photos.length) return null;

  return (
    <Swiper
      pagination={{
        type: "navigation",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <Link
            to={`/results/${city.city_id}`}
            key={city.city_id}
            state={{ fromPage: "home" }}
          >
            {photo.blur_hash && (
              <Blurhash
                hash={photo.blur_hash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            )}
            <img
              src={photo.regular_url}
              alt={photo.alt_description}
              className={styles.photo}
              onLoad={(e) => {
                if (photo.blur_hash) {
                  e.target.previousSibling.style.display = "none";
                }
              }}
            />
          </Link>
          <p>
            Photo by{" "}
            <a
              href={`${photo.profile_url}?utm_source=homeknown&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.photographer}
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com?utm_source=homeknown&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.unsplashLogoContainer}>
                <img
                  src={unsplashLogo}
                  alt="Unsplash"
                  className={styles.unsplashLogo}
                />
              </div>
            </a>
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Photos;
