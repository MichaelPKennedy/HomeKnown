import React from "react";
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
import unsplashLogo from "../../../assets/unsplashLogo.png";

const CityPhotos = ({ photos }) => {
  if (!photos || !photos.length) return null;

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
          <img src={photo.url} alt={photo.alt} className={styles.photo} />
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CityPhotos;
