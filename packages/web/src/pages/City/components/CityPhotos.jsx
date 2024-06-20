import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Blurhash } from "react-blurhash";
import styles from "./swiperStyles.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import unsplashLogo from "../../../assets/unsplashLogo.png";

const CityPhotos = ({ photos }) => {
  const [loadedImages, setLoadedImages] = useState({});
  if (!photos || !photos.length) return null;

  const handleImageLoad = (photoId) => {
    setLoadedImages((prev) => ({ ...prev, [photoId]: true }));
  };

  const isMobile = window.innerWidth < 768;

  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <div className={styles.imageContainer}>
            <img
              src={photo.reg_url}
              alt={photo.alt}
              className={`${styles.photo} ${
                loadedImages[photo.id]
                  ? styles.imageVisible
                  : styles.imageHidden
              }`}
              onLoad={() => handleImageLoad(photo.id)}
            />
            {photo.blurHash && (
              <Blurhash
                hash={photo.blurHash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className={styles.blurHash}
              />
            )}
          </div>
          <p className="mb-0">
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

export default CityPhotos;
