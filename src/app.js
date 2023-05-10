// importamos express 
const express = require('express');
const db = require('./utils/database');
const Users = require('./models/users.model')


db.authenticate()//es una funion asincrono
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('base de datos sincronizada'))
  .catch(err => console.log(err))

// creamos instancia de express llamada app
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('servidor funcionando')
});

//agregar a la BD
app.post('/users', async (req, res) => {
  try {
    //extraemos el cuerpo de la peticion
    const newUser = req.body;
    //insert into ingresa los datos a la bd
    await Users.create(newUser);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error)
  }
});
//fin de agregar a la BD


// obtener a todos los usuarios de la BD

// { con esta metodo seleccionas los que deseas que muestres
//   attributes: ["firstname", "lastname", "email"]
// }
app.get('/users', async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] }//con exclude en el select no inclulle lo que seleccionas
    });
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});
// FIN de obtener todos los datos de la BD

//obtener usuario por id
app.get('/users/id/:id', async (req, res) => {
  try {
    //  para recuperar el parametro de ruta se usa req.params
    //req.params es un objeto ejemplo {id:5, user:'luis'}
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password"]
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});
//fin de obtener usuario por id

// buscar por otro campo de la tabla de BD
app.get('/users/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({
      where: { email }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});
//Fin  buscar por otro campo de la tabla de BD

// como eliminar un usuario 
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// fin como eliminar un usuario 

// update usuario
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body
    await Users.update({ firstname, lastname }, {
      where:{id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
})
// fin updat usuario

//dejar escuchando el servidor
app.listen(8000, () => {
  console.log("servidor escuchando en el pto 8000")
})
