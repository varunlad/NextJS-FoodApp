// 'use client'
import React from 'react';
import Image from 'next/image';
import classes from "./page.module.css"
import { getMeal } from '@/lib/meals';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

export async function generateMetaData({ params }) {
  const meal = getMeal(params.mealslug);
  if (!meal) {
    notFound(); //closest not found page
  }
  return {
    title:meal.title,
    description: meal.summary
  }
}

function MyMeal({ params }) {
  console.log("params==",params)
  const meal = getMeal(params.mealslug);
  if (!meal) {
    notFound(); //closest not found page
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br/>');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {/* fill attribute used when we dont know the dimention of the image */}
          <Image src={meal.image} alt={meal.title} fill />
          <Link className={classes.backMe} href={'/meals'}>Back</Link>
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}> by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a></p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }} ></p>
      </main>
    </>
  )
}

export default MyMeal