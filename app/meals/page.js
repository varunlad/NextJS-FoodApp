import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '../components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

 async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}
export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. Its easy and fun</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your favorite recipes
                    </Link>
                </p>

            </header>
            <main className={classes.main}>
                <Suspense fallback={<div className={classes.loading}><h1>Fetching meals...</h1></div>} >
                    <Meals />
                </Suspense>
            </main>
        </>
        // <div>
        //     Meals
        //     <p><Link href="meals/share">share</Link></p>
        //     <p> <Link href="meals/mymeal-1">mymeal-1</Link></p>
        //     <p><Link href="meals/mymeal-2">mymeal-2</Link></p>
        // </div>
    )
}
