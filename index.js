const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'amudha',
  database: 'library',
  port: '3306',
})

app.post('/addBook', (req, res) => {
  const { title, author,genre, publishedOn } = req.body
  const sql =
    'INSERT INTO library (`title`,`author`,`genre`,`publishedOn`) VALUES (?, ?, ?,DATE_FORMAT(?, "%Y-%m-%d"))'
  const values = [title, author,genre, publishedOn]

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    console.log('Data inserted')
    console.log(data)
    return res.json({ success: true, message: 'Data inserted successfully' })
  })
})
app.get('/getbooks', (req, res) => {
  const { search, page } = req.query
  const limit = 5
  const offset = (page - 1) * limit

  let sql = 'SELECT * FROM library WHERE 1'
  const values = []

  if (search) {
    sql +=
      ' AND (title LIKE ? OR author LIKE ? OR genre LIKE ? OR publishedOn LIKE ?)'
    const searchTerm = `%${search}%`
    values.push(searchTerm, searchTerm, searchTerm, searchTerm)
  }

  sql += ' LIMIT ?, ?'
  values.push(offset, limit)

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.send(result)
    }
  })
})

app.listen(8081, () => {
  console.log('Express server listening on port 8081')
})
