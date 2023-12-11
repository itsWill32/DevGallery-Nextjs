const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials = {
	host: 'devgallery1.c26pdpfexlap.us-east-2.rds.amazonaws.com',
	user: 'admin',
	password: '12345678',
	database: 'devgallery'
}

app.get('/', (req, res) => {
	res.send('Desplegado')
})

app.post('/api/login', (req, res) => {
	const { user, password } = req.body
	const values = [user, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM login WHERE user = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"idlogin": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.post('/api/guardar', (req, res) => {
	const { nombre,user,password,edad,portafolio,portafolioImg,numero } = req.body
	const params = [[nombre,user,password,edad,portafolio,portafolioImg,numero]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO login (nombre,user,password,edad,portafolio,portafolioImg,numero) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario creado" })
		}
	})
	connection.end()
})

app.get('/api/usuario', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM login', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.post('/api/usuarioTest', (req, res) => {
	const {user} = req.body
	const params = [[user]]
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM login WHERE user=?', params, (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/alluser', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM login', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})		

app.post('/api/editar', (req, res) => {
	const { nombre,edad,portafolio,portafolioImg,numero,portafolioTitle,user, } = req.body
	const params = [nombre,edad,portafolio,portafolioImg,numero,portafolioTitle,user]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE login set nombre=?,edad =?,portafolio =?,portafolioImg =?,numero =?,portafolioTitle=? WHERE user=?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})




app.listen(4000, () => console.log('Servidor en marcha'))