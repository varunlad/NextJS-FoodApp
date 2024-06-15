'use client';
import {useFormState} from 'react-dom'
import { shareMeal } from '@/lib/server-functions-files';
import ImagePicker from '../../components/meals/image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '@/app/components/meals/meals-form-submit';

export default function ShareMealPage() {
   const[state,formAction] = useFormState(shareMeal,{message:null});
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                {/* Here we can use onSubmit on form but in next.js we are in backend thats why next.js
                gives us more covinient way than manually handling the form submision.  */}
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name"  />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email"  />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title"  />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary"  />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            
                        ></textarea>
                    </p>
                    <ImagePicker label='your image' name='image' />
                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                      <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    );
}