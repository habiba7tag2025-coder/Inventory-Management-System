import sqlite3 from "sqlite3";
import "dotenv/config";

const dbPath = "./inventory.db";
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening SQLite database", err.message);
    } else {
        console.log("Connected to the SQLite local database");
    }
});

//  جدول البيانات التجريبية
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            typename TEXT NOT NULL,
            Model TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        )
    `, (err) => {
        if (!err) {
            // التحقق من عدد المنتجات داخل الجدول
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (row && row.count === 0) {
                    const sampleProducts = [
                        ['Smartphone', 'Samsung Galaxy S24 Ultra', 'Electronics', 800.00, 15],
                        ['Laptop', 'Samsung Galaxy Book4', 'Computers', 730.00, 10],
                        ['Smartwatch', 'Samsung Galaxy Watch 6', 'Wearables', 295.00, 25],
                        ['Wireless Earbuds', 'Samsung Galaxy Buds 3', 'Accessories', 150.00, 40],
                        ['Smartphone', 'Apple iPhone 15 Pro', 'Electronics', 999.00, 12],
                        ['Laptop', 'Apple MacBook Air M3', 'Computers', 1099.00, 8],
                        ['Smartwatch', 'Apple Watch Series 9', 'Wearables', 399.00, 20],
                        ['Wireless Earbuds', 'Apple AirPods Pro 2', 'Accessories', 249.00, 30],
                        ['Tablet', 'Apple iPad Air 11-inch', 'Tablets', 599.00, 14],
                        ['Smartphone', 'Google Pixel 8 Pro', 'Electronics', 799.00, 18],
                        ['Smartwatch', 'Google Pixel Watch 2', 'Wearables', 349.00, 22],
                        ['Wireless Earbuds', 'Google Pixel Buds Pro', 'Accessories', 199.00, 35],
                        ['Laptop', 'Dell XPS 14', 'Computers', 1299.00, 7],
                        ['Monitor', 'Dell UltraSharp 27 4K', 'Displays', 450.00, 12],
                        ['Keyboard', 'Logitech MX Mechanical', 'Accessories', 170.00, 25],
                        ['Mouse', 'Logitech MX Master 3S', 'Accessories', 100.00, 50],
                        ['Laptop', 'Lenovo ThinkPad X1 Carbon', 'Computers', 1350.00, 9],
                        ['Tablet', 'Lenovo Tab P12', 'Tablets', 350.00, 16],
                        ['Gaming Console', 'Sony PlayStation 5', 'Gaming', 499.00, 11],
                        ['Wireless Earbuds', 'Sony WF-1000XM5', 'Accessories', 278.00, 28],
                        ['Headphones', 'Sony WH-1000XM5', 'Accessories', 399.00, 19],
                        ['Gaming Console', 'Microsoft Xbox Series X', 'Gaming', 499.00, 10],
                        ['Handheld Console', 'ASUS ROG Ally', 'Gaming', 699.00, 15],
                        ['Monitor', 'LG UltraGear 32-inch OLED', 'Displays', 899.00, 8],
                        ['Smart TV', 'LG C3 55-inch OLED TV', 'Displays', 1299.00, 6]
                    ];

                    const stmt = db.prepare(`INSERT INTO products (typename, Model, category, price, quantity) VALUES (?, ?, ?, ?, ?)`);
                    sampleProducts.forEach(product => {
                        stmt.run(product);
                    });
                    stmt.finalize();
                    console.log("Sample products added to SQLite database successfully!");
                }
            });
        }
    });
});

export default db;
