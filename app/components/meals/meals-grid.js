import MealItem from './meal-item'
import classes from './meals-grid.module.css'
export default function MealsGrid({meals}){
    //console.log(meals)
    return(
       <ul className={classes.meals}>
        {meals.map((meals,ind)=>{
            return(
                <li key={ind}><MealItem {...meals} /></li>
            )
        })}

       </ul>
    )
}