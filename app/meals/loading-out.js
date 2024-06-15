import classes from "./loading.module.css"

export default function MealsLoadingPage(){
    return(
        <p className={classes.loading}>
            <h1>Fetching meals...</h1>
        </p>
    )
}