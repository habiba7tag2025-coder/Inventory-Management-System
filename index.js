import express from "express";
import db from "./db.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.json());
app.use(cors());

// 1. Get all products
app.get("/products", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            console.error("Error fetching products:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(rows);
    });
});

// 2. Search products by name, model or category
app.get("/products/search", (req, res) => {
    const queryStr = req.query.q;

    if (!queryStr) {
        return res.status(400).json({ error: "Please provide a search term" });
    }

    const searchTerm = `%${queryStr}%`;
    const sql = "SELECT * FROM products WHERE Model LIKE ? OR typename LIKE ? OR category LIKE ?";

    db.all(sql, [searchTerm, searchTerm, searchTerm], (err, rows) => {
        if (err) {
            console.error("Error searching products:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(rows);
    });
});

// 3. Get single product
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
        if (err) {
            console.error("Error fetching product:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!row) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(row);
    });
});

// 4. Create a product
app.post("/products", (req, res) => {
    const { typename, Model, category, price, quantity } = req.body;

    if (!typename || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: "Name, price, and quantity are required" });
    }

    const sql = "INSERT INTO products (typename, Model, category, price, quantity) VALUES (?, ?, ?, ?, ?)";
    const params = [typename, Model || "", category || "", price, quantity];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error creating product:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }

        const newProduct = {
            id: this.lastID,
            typename,
            Model: Model || "",
            category: category || "",
            price,
            quantity
        };
        res.status(201).json({ message: "Product Created Successfully", newProduct });
    });
});

// 5. Update a product
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const { typename, Model, category, price, quantity } = req.body;

    db.get("SELECT * FROM products WHERE id = ?", [productId], (err, existing) => {
        if (err) {
            console.error("Error finding product:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!existing) {
            return res.status(404).json({ error: "Product not found" });
        }

        const sql = "UPDATE products SET typename = ?, Model = ?, category = ?, price = ?, quantity = ? WHERE id = ?";
        const params = [typename, Model || "", category || "", price, quantity, productId];

        db.run(sql, params, (err) => {
            if (err) {
                console.error("Error updating product:", err.message);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(200).json({ 
                message: "Product updated successfully", 
                product: { id: productId, typename, Model, category, price, quantity } 
            });
        });
    });
});

// 6. Delete a single product
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);

    db.get("SELECT * FROM products WHERE id = ?", [productId], (err, existing) => {
        if (err) {
            console.error("Error finding product:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!existing) {
            return res.status(404).json({ error: "Product not found" });
        }

    db.run("DELETE FROM products WHERE id = ?", [productId], (err) => {
            if (err) {
                console.error("Error deleting product:", err.message);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        });
    });
});

app.get("/", (req, res) => {
    res.send("Server Health is good");
});

app.listen(port, () => {
    console.log(`HOST:http://localhost:${port}`);
});