const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


// ----------------------------------------
// CRUD para Marca
// ----------------------------------------

// Obtener todas las marcas
app.get('/api/marcas', (req, res) => {
    db.query('SELECT * FROM Marca', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener una marca por ID
app.get('/api/marcas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Marca WHERE marca_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// Crear una nueva marca
app.post('/api/marcas', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Marca (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
});

// Actualizar una marca
app.put('/api/marcas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Marca SET nombre = ? WHERE marca_id = ?', [nombre, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, nombre });
    });
});

// Eliminar una marca
app.delete('/api/marcas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Marca WHERE marca_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Marca eliminada' });
    });
});

// ----------------------------------------
// CRUD para Modelo
// ----------------------------------------

// Obtener todos los modelos
app.get('/api/modelos', (req, res) => {
    db.query('SELECT * FROM Modelo', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener un modelo por ID
app.get('/api/modelos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Modelo WHERE modelo_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// Crear un nuevo modelo
app.post('/api/modelos', (req, res) => {
    const { nombre, marca_id } = req.body;
    db.query('INSERT INTO Modelo (nombre, marca_id) VALUES (?, ?)', [nombre, marca_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre, marca_id });
    });
});

// Actualizar un modelo
app.put('/api/modelos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, marca_id } = req.body;
    db.query('UPDATE Modelo SET nombre = ?, marca_id = ? WHERE modelo_id = ?', [nombre, marca_id, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, nombre, marca_id });
    });
});

// Eliminar un modelo
app.delete('/api/modelos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Modelo WHERE modelo_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Modelo eliminado' });
    });
});

// ----------------------------------------
// CRUD para Categoría
// ----------------------------------------

// Obtener todas las categorías
app.get('/api/categorias', (req, res) => {
    db.query('SELECT * FROM Categoria', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener una categoría por ID
app.get('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Categoria WHERE categoria_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// Crear una nueva categoría
app.post('/api/categorias', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Categoria (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
});

// Actualizar una categoría
app.put('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Categoria SET nombre = ? WHERE categoria_id = ?', [nombre, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, nombre });
    });
});

// Eliminar una categoría
app.delete('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Categoria WHERE categoria_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Categoría eliminada' });
    });
});

// ----------------------------------------
// CRUD para Producto
// ----------------------------------------

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM Producto', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

//Listar productos
app.get('/api/listProducts', (req, res) => {
    db.query('SELECT mar.MarcaName, subc.SubcategoriaName, pro.precio, cat.CategoriaName, model.ModeloName, pro.cantidad_en_stock, pro.descripcion, pro.imagen '+
' FROM producto pro ' +
' JOIN subcategoria subc ON pro.subcategoria_id = subc.subcategoria_id '+
' JOIN categoria cat ON pro.categoria_id = cat.categoria_id '+
' JOIN modelo model ON pro.modelo_id = model.modelo_id '+
' JOIN marca mar ON model.marca_id = mar.marca_id;', (err, results) => { 
                if (err) return res.status(500).json({ error: err });
                res.json(results)
             });
});

// Obtener un producto por ID
app.get('/api/productos/all/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Producto WHERE producto_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// Obtener productos por subcategoria_id
app.get('/api/productos/:subcategoria_id', (req, res) => {
    const { subcategoria_id } = req.params;

    // Consulta SQL para obtener los productos de la subcategoría
    const query = `
      SELECT producto_id, subcategoria_id, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen 
      FROM producto 
      WHERE subcategoria_id = ?;
    `;

    // Ejecutar la consulta a la base de datos
    db.query(query, [subcategoria_id], (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        // Enviar los productos como respuesta
        res.json(results);
    });
});


// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const { nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen } = req.body;
    db.query(
        'INSERT INTO Producto (nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ id: results.insertId, nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen });
        }
    );
});

// Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen } = req.body;
    db.query(
        'UPDATE Producto SET nombre = ?, categoria_id = ?, modelo_id = ?, precio = ?, cantidad_en_stock = ?, descripcion = ?, imagen = ? WHERE producto_id = ?', 
        [nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ id, nombre, categoria_id, modelo_id, precio, cantidad_en_stock, descripcion, imagen });
        }
    );
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Producto WHERE producto_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Producto eliminado' });
    });
});

// ----------------------------------------
// CRUD para Especificaciones
// ----------------------------------------

// Obtener todas las especificaciones
app.get('/api/especificaciones', (req, res) => {
    db.query('SELECT * FROM Especificaciones', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener una especificación por ID
app.get('/api/especificaciones/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Especificaciones WHERE especificacion_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// Crear una nueva especificación
app.post('/api/especificaciones', (req, res) => {
    const { nombre, valor, producto_id } = req.body;
    db.query('INSERT INTO Especificaciones (nombre, valor, producto_id) VALUES (?, ?, ?)', [nombre, valor, producto_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre, valor, producto_id });
    });
});

// Actualizar una especificación
app.put('/api/especificaciones/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, valor, producto_id } = req.body;
    db.query('UPDATE Especificaciones SET nombre = ?, valor = ?, producto_id = ? WHERE especificacion_id = ?', [nombre, valor, producto_id, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, nombre, valor, producto_id });
    });
});

// Eliminar una especificación
app.delete('/api/especificaciones/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Especificaciones WHERE especificacion_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Especificación eliminada' });
    });
});

//Obtener subcategoria por id
app.get('/api/subcategorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT subc.subcategoria_id, subc.SubcategoriaName FROM subcategoria subc WHERE subc.categoria_id = ?; ', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});