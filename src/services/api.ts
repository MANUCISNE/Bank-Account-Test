import sqlite3 from 'sqlite3';

const pathDb = './databse.db';

export default function handlerAllUsers(req:any, res:any) {
  const db = new sqlite3.Database(pathDb, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

  // Use the database...

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  res.status(200).json({ name: 'John Doe' })
}
