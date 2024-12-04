// server.js
const express = require('express');
const cors = require('cors')
const connection = require('./config');
const stripe = require("stripe")("sk_test_51QSAxgD6DQOs7GbUbflzicnoDfndFakaiNVns2JTQ8WlC9XlWGS7fcJEW5jOstLnhfHe6dsxEF6RkRfZstOvdo3d00kgyLi00G");


const app = express();
const port = 3000;

// Middleware para manejar JSON en las solicitudes
app.use(cors())
app.use(express.json());

// Rutas CRUD para la tabla 'categorias'

// Crear una nueva categoría
app.post('/categorias/add', (req, res) => {
    const { Categoria } = req.body;
    const query = 'INSERT INTO categorias (Categoria) VALUES (?)';
    connection.query(query, [Categoria], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, Categoria });
    });
});

// Obtener todas las categorías
app.get('/categorias', (req, res) => {
    const query = 'SELECT * FROM categorias';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Obtener una categoría por ID
app.get('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM categorias WHERE Categoria_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(results[0]);
    });
});

// Actualizar una categoría
app.put('/categorias/update/:id', (req, res) => {
    const { id } = req.params;
    const { Categoria } = req.body;
    const query = 'UPDATE categorias SET Categoria = ? WHERE Categoria_id = ?';
    connection.query(query, [Categoria, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría actualizada' });
    });
});

// Eliminar una categoría
app.delete('/categorias/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM categorias WHERE Categoria_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada' });
    });
});

// Rutas CRUD para la tabla 'productos'

// Crear un nuevo producto
app.post('/productos/add', (req, res) => {
    const { Categoria_id, Descripcion, Marca, Precio, Stock, Imagen } = req.body;
    const query = 'INSERT INTO productos (Categoria_id, Descripcion, Marca, Precio, Stock, Imagen) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [Categoria_id, Descripcion, Marca, Precio, Stock, Imagen], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, Categoria_id, Descripcion, Marca, Precio, Stock, Imagen });
    });
});

// Obtener todos los productos
app.get('/productos', (req, res) => {
    const query = 'SELECT pro.Producto_id, pro.Descripcion, pro.Marca, pro.Precio, pro.Stock, pro.Imagen, cat.Categoria ' +
                 ' FROM productos as pro JOIN categorias as cat ON pro.Categoria_id = cat.Categoria_id; ';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM productos WHERE Producto_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

// Actualizar un producto
app.put('/productos/update/:id', (req, res) => {
    const { id } = req.params;
    const { Categoria_id, Descripcion, Marca, Precio, Stock, Imagen } = req.body;
    const query = 'UPDATE productos SET Categoria_id = ?, Descripcion = ?, Marca = ?, Precio = ?, Stock = ?, Imagen = ? WHERE Producto_id = ?';
    connection.query(query, [Categoria_id, Descripcion, Marca, Precio, Stock, Imagen, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado' });
    });
});

// Eliminar un producto
app.delete('/productos/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE Producto_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado' });
    });
});

// Crear un Payment Intent para Stripe
app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body; // Monto en centavos (e.g., 1000 = $10.00)

    try {
        // Crea un PaymentIntent con Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Monto en centavos
            currency: "usd", // Moneda (puedes usar otra soportada)
        });

        res.send({
            clientSecret: paymentIntent.client_secret, // Enviar el client_secret al cliente
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
