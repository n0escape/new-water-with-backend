import React, { useState } from 'react';
import s from './Gallery.module.css'

const Gallery = ({photosList}) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const goToNext = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex === photosList.length - 1 ? 0 : prevIndex + 1));
    };
  
    const goToPrevious = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photosList.length - 1 : prevIndex - 1));
    };
    return (
        <div className={s.containerGallery}>
            <div className={s.galleryImage}>
                <button className={s.btnPrev} onClick={goToPrevious}>{'<'}</button>
                <img src={process.env.PUBLIC_URL + photosList[currentPhotoIndex]} alt={`Description ${currentPhotoIndex + 1}`} />
                <button className={s.btnNext} onClick={goToNext}>{'>'}</button>
            </div>
            <div className={s.dotList}>
                {photosList.map((_, index) => (
                <span key={index} className={index === currentPhotoIndex ? `${s.dot} ${s.active}` : s.dot}></span>
                ))}
            </div>
        </div>
    )
}

export default Gallery