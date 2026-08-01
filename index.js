import  express from "express";
import pool from "./db.js" ;
import cors from  "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use (express.json ());
app.use(cors());

// 1. Get all products
app.get("/products", async (req, res ) => {
    try {
        const [products] = await pool.query("SELECT * FROM products");
        res.status(200).json (products);
    } catch (error) {
        console.error("Error fetching  products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Search products by name or model
app.get("/products/search", async (req, res) => {
    try {
        const queryStr = req.query.q; 

        if (!queryStr) {
            return res.status(400).json({ error:  "Please provide a search term" });
        }

        const [filteredProducts] = await pool.query(
            "SELECT * FROM products WHERE Model LIKE ? OR typename LIKE ? OR category LIKE ?",
            [`%${queryStr}%`, `%${queryStr}%`, `%${queryStr}%`] 
        );

        if (filteredProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 3. Get single product
app.get ("/products/:id", async (req, res) => {
    try {
        const productId = parseInt (req.params.id);
        const [product] =  await pool.query("SELECT * FROM products WHERE id = ?", [productId]);
        if (product.length === 0) {
            return res.status (404).json({ error: "Product not found" });
        }
        res.status(200).json (product[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json ({ error: "Internal server error" });
    }
});

// 4.Create a product 
app.post("/products", async (req, res) => {
    try {
        const { typename, Model, category, price, quantity } = req.body;

        if (!typename || price === undefined || quantity === undefined) {
            return res.status(400).json({ message: "Name, price, and quantity are required" });
        }

        const query = "INSERT INTO products (typename, Model, category, price, quantity) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, [typename, Model || "", category || "", price, quantity]);

        const newProduct = {
            id: result.insertId,
            typename,
            
            Model,
            category,
            price,
            quantity
        };
        res.status (201).json({ message: "Product Created Successfully", newProduct });
    } catch (error) {
        console.error ("Error creating product:", error);
        res.status(500).json ({ error: "Internal server error" });
    }
});

// 5.  Update a  product
app.put("/products/:id", async (req, res) => {
    try  {
        const  productId = parseInt (req.params.id);
        const { typename, Model, category, price, quantity } = req.body;

        const [existing] = await pool.query ("SELECT * FROM products WHERE id = ?", [productId]);
        if (existing.length === 0)
        {
            return res.status (404).json ({ error: "Product not found" });
        }

        const query = "UPDATE products SET typename = ?, Model = ?, category = ?, price = ?, quantity = ? WHERE id = ?";
        await pool.query(query, [typename ,Model, category, price ,quantity , productId]);

        res.status(200).json({ 
            message: "Product updated successfully", 
            product: { id: productId, typename ,Model, category,  price, quantity } 
        });
    } catch (error) {
        console.error ("Error updating product:", error);
        res.status(500).json ({ error: "Internal server error" });
    }
});

// 6. Delete a single product
app.delete("/products/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const [existing] = await pool.query("SELECT * FROM products WHERE id = ?", [productId]);
        if (existing.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        await pool.query("DELETE FROM products WHERE id = ?", [productId]);
         res.status(200).json({ message: "Product deleted successfully" });
    } catch (error)  {
         console.error("Error deleting product:", error);
        res.status(500).json ({ error: "Internal server error" });
    }
});

app.get ("/", (req, res) => {
    res.send ("Server Health is good"  );
});

app.listen (port, () => {
    console.log (`HOST:http://localhost:${port}`);
});
