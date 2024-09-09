const Product = require('../models/productModel');

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;

    try {
        const newProduct = new Product({ name, price, description, stock, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, price, description, stock, category }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
