import { Router } from "express";
import { RowDataPacket } from "mysql2";

import pool from './db/conn';

const routes = Router();

interface IBook extends RowDataPacket {
  id: number
  title: string,
  pages: number
}

routes.get('/', async (req, res) => {
  const sql = "SELECT * FROM books";

  try {
    const [data] = await pool.query<IBook[]>(sql);

    res.render('books', { books: data });
  } catch (err) {
    return console.log(err);
  }

  // pool.query<IBook[]>(sql, (err, data) => {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   const books = data;

  //   res.render('books', { books });
  // });
});

routes.post('/insertbooks', async (req, res) => {
  const { title, pages } = req.body;

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ['title', 'pages', title, pages];

  try {
    await pool.query(sql, data);
    
    res.redirect('/books');
  } catch (err) {
    return console.log(err);
  }

  // pool.query(sql, data, err => {
  //   if (err) {
  //     console.log(err);
  //   }
  
  //   res.redirect('/books');
  // });
});

routes.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    const [books] = await pool.query<IBook[]>(sql, data);

    const book = books[0];
    
    res.render('editbook', { book });
  } catch (err) {
    return console.log(err);
  }

  // pool.query<IBook[]>(sql, data, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   const book = data[0];

  //   res.render('editbook', { book });
  // });
});

routes.post('/updatebook', async (req, res) => {
  const { id, title, pages } = req.body;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ['title', title, 'pages', pages, 'id', id];

  try {
    await pool.query(sql, data);

    res.redirect('/books');
  } catch (err) {
    return console.log(err);
  }

  // pool.query(sql, data, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   res.redirect('/books');
  // });
});

routes.post('/:id/remove', async (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    await pool.query(sql, data);

    res.redirect('/books');
  } catch (err) {
    return console.log(err);
  }

  // pool.query(sql, data, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   res.redirect('/books');
  // });
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    const [books] = await pool.query<IBook[]>(sql, data);

    const book = books[0];

    res.render('book', { book });
  } catch (err) {
    return console.log(err);
  }

  // pool.query<IBook[]>(sql, data, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   const book = data[0];

  //   res.render('book', { book });
  // });
});

export default routes;