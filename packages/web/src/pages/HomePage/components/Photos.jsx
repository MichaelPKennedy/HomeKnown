import React, { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import feathersClient from "../../../feathersClient";
import { AuthContext } from "../../../AuthContext";
import styles from "./swiperStylesHome.module.css";

import unsplashLogo from "../../../assets/unsplashLogo.png";

const Photos = ({ city }) => {
  const { isAdmin } = useContext(AuthContext);
  const [loadedImages, setLoadedImages] = useState({});
  const [photos, setPhotos] = useState(city.photos || []);

  if (!photos || !photos.length) return null;

  const handleImageLoad = (photoId) => {
    setLoadedImages((prev) => ({ ...prev, [photoId]: true }));
  };

  const handleDelete = async (photoId) => {
    try {
      await feathersClient.service("photos").remove(photoId);
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Failed to delete photo", error);
    }
  };

  return (
    <Swiper
      pagination={{
        type: "navigation",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${styles.swiper}`}
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id} className={styles.swiperSlide}>
          <Link
            to={`/results/${city.city_id}`}
            key={city.city_id}
            state={{ fromPage: "home" }}
          >
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
          </Link>
          {isAdmin && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(photo.id);
              }}
              className={styles.deleteButton}
            >
              X
            </button>
          )}
          <p>
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
