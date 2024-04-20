import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import styles from "./swiperStylesResults.module.css";
import logo from "../../../assets/light-logo.png";

import unsplashLogo from "../../../assets/unsplashLogo.png";

const Photos = ({ city }) => {
  const { photos } = city || {};

  const hasPhotos = photos && Array.isArray(photos) && photos.length > 0;

  return (
    <Swiper
      pagination={{
        type: "navigation",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {(hasPhotos
        ? photos
        : [
            {
              reg_url: logo,
              alt: "Default City Image",
            },
          ]
      ).map((photo, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <Link
            to={`/results/${city.city_id}`}
            state={{ city, fromPage: "results" }}
          >
            {photo.blurHash && (
              <Blurhash
                hash={photo.blurHash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            )}
            <img
              src={photo.reg_url}
              alt={photo.alt}
              className={`${styles.photo} ${
                !hasPhotos ? styles.defaultLogo : ""
              }`}
              onLoad={(e) => {
                if (photo.blurHash) {
                  e.target.previousSibling.style.display = "none";
                }
              }}
            />
          </Link>
          <p className={styles.attribution}>
            Photo by{" "}
            <a
              href={`${photo.photographerUrl}?utm_source=homeknown&utm_medium=referral`}
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