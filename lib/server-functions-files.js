'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"

function isInvalidText(text) {
    return (!text || text.trim() === '')
}

////like serever components we can also have server functions in next.js.
////(its an react feature but next.js unlockes this feature.)
////action attributes gives us the formData object 
////The reson to separate the server function is that, --->
////--->with this we can blend the server funtion in client components;
export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        image: formData.get('image'),
    }
    if (isInvalidText(meal.creator) ||
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid Input'
        }
    }
    await saveMeal(meal);
    redirect('/meals')
}