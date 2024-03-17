import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import styles from "./swiperStylesRecommendations.module.css";
import logo from "../../../assets/logo.png"; // Make sure the path is correct

import unsplashLogo from "../../../assets/unsplashLogo.png";

const Photos = ({ city }) => {
  const { photos } = city || {};

  const imagesToShow =
    photos && photos.length > 0
      ? photos
      : [
          {
            url: logo,
            alt: "Default City Image",
          },
        ];

  return (
    <Swiper
      pagination={{
        type: "navigation",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {imagesToShow.map((photo, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <Link to={`/results/${city.cityId}`} state={{ fromPage: "home" }}>
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
              src={photo.url}
              alt={photo.alt}
              className={styles.photo}
              onLoad={(e) => {
                if (photo.blurHash) {
                  e.target.previousSibling.style.display = "none";
                }
              }}
            />
          </Link>
          {photo.attribution && (
            <p>
              Photo by{" "}
              <a
                href={`${photo.attribution.photographerUrl}?utm_source=homeknown&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photo.attribution.photographer}
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
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Photos;
