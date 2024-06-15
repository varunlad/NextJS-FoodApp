'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // setCurrentImageIndex((prevIndex) => prevIndex < images.length - 1 ? prevIndex + 1 : 0);
  //  This is the function that is called within setInterval. 
  //  It updates the current image index state (currentImageIndex) based on the previous index (prevIndex).
  //   If the previous index is less than images.length - 1 (meaning there are more images to display), 
  //   it increments the index by 1. Otherwise, it resets the index to 0, 
  //   starting from the first image again.

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // return () => clearInterval(interval);
  //  This is the cleanup function returned by useEffect. 
  //  It clears the interval when the component unmounts or when the dependencies change 
  //  (in this case, never since the dependency array is empty). 
  //  This ensures that the interval is cleaned up to avoid memory leaks or unnecessary computations.

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}