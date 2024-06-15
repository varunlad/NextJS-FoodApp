import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    //throw new Error('Error while featching meals');
    return db.prepare('SELECT * FROM meals').all();
    //.all() is used when you are fetching data from the database
    //.run() is used when you are inserting (changing) data from the database
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

////we install two pakages 
////slugify 
////xss (cross site scripting) --> this helps us from cross site scripting attacks 
////because we are using user generated content and outputting this instructions as HTML in meals.js
// dangerouslySetInnerHTML={{
//     __html: meal.instructions,
//   }}
export async function saveMeal(meal) {
    ////lower forces all charaters to be lower case
    meal.slug = slugify(meal.title, { lower: true});
    meal.instructions = xss(meal.instructions);
    ////image should be stored in the file system not in the data base
    ////its bad for performance database are not build for that.
    //// we will stored the uploaded file in the public/images folder

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    //// node:fs allows us to work with the file system.
    ////fs.createWriteStream it will create a stream that allows us to write data to a certain file.
    ////createWriteStream (hover to get the info) it needs a path to write
   const stream = fs.createWriteStream(`public/images/${fileName}`);

   ////we have to convert our image to buffer
   const bufferImage = await meal.image.arrayBuffer(); //// it reaturns promise

   //// write method wants chunk (hover to get the info)
   stream.write(Buffer.from(bufferImage),(error)=>{
      if(error){
       throw new Error('Saving image faild');
      }
   });
   //// here from the image path we have removed public segment 
   ////because all image request will be send to public segment automatically
   meal.image =`/images/${fileName}`
   
   db.prepare(`
   INSERT INTO meals
   (title, summary, instructions, creator, creator_email,image,slug)
   VALUES(
         @title,
         @summary,
         @instructions,       
         @creator,
         @creator_email,
         @image,
         @slug
   )`).run(meal);
}