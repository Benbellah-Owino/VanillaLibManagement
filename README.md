"# VanillaLibraryManagement" 
This is a fullstacklibrary management app with a vanilla frontend(no JS frameworks) with some bootstrap for tables and an Expressjs backend. For the database I've used PostgresDB so to run it well install postgres in your system.

Here is the schema for the postgres tables

Table person{
  id integer [pk, increment]
  name string
  email string
  phone string
  gender string
  books_borrowed integer
  password string
  role string
  created_at datetime [default: `now()`]
}

Table book{
  id integer [pk, increment]
  genre string
  title string
  author string
  publisher string
  edition string
  ISBN string
  pages string
  borrowed_by integer [ref: > person.id] 
  created_at datetime [default: `now()`]
}

Table order{
 id integer [pk, increment]
 book integer [ref: > book.id]
 person integer [ref: > person.id]
 date_returned datetime
created_at datetime [default: `now()`]
}

Remember to add a JSECRET= "< This is the JWT Token SECRET. Insert here anything >" and DB_PASSWORD="<Insert Your postgres password>" in a .env file in the backend folder.

Also remember to run navigate to the backend folder and run npm install to install all the dependencies and then run npm start if you have nodemon to start up the server or just run the app.js file after you have done all the above
