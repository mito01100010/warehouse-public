import { db } from "../db.js";

export const findProducts = (req, res) => {
    const q = req.body.category == ""
        ? `SELECT * FROM products WHERE name LIKE '%${req.body.name}%'`
        : `SELECT * FROM products WHERE category='${req.body.category}' AND name LIKE '%${req.body.name}%'`
    const values = [
        req.body.category,
        req.body.name,
    ]

    db.query(q, [...values], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data);
    })
}

export const findProduct = (req, res) => {
    const q = `SELECT * FROM products WHERE barcode='${req.body.barcode}'`

    db.query(q, (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data);
    })
}

export const addProduct = (req, res) => {
    const q = "SELECT * FROM products WHERE barcode = ?";

    db.query(q, [req.body.barcode], (err, data) => {
        if (err) return res.json(err);

        if (data.length) return res.status(409).json("Barcode already exists")
        if (req.body.name.length < 0 || req.body.name.length > 50) return res.status(403).json("Product name is required and should be 50 characters max");
        if (req.body.description.length > 2000) return res.status(403).json("Product description should be 2000 characters max");
        if (req.body.purchased_price.length <= 0) return res.status(403).json("Purchased price is required");
        if (req.body.selling_price.length <= 0) return res.status(403).json("Selling price is required");
        if (req.body.number <= 0) return res.status(403).json("Number of products is required and must be positive number"); 

        const q = "INSERT INTO products(`barcode`, `name`, `description`, `purchased_price`, `selling_price`, `number`, `category`, `image`) VALUES (?)"
        const values = [
            req.body.barcode,
            req.body.name,
            req.body.description,
            req.body.purchased_price,
            req.body.selling_price,
            req.body.number,
            req.body.category,
            req.body.image,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.send(err)

            return res.status(200).json("Product has been added");
        })
    })
}

export const deleteProduct = (req, res) => {
    const q = `DELETE FROM products WHERE barcode='${req.body.barcode}'`

    db.query(q, (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data);
    })
}

export const updateProduct = (req, res) => {
    const q = "UPDATE products SET `name`=?, `description`=?, `purchased_price`=?, `selling_price`=?, `number`=?, `barcode`=?, `category`=?, `image`=? WHERE " + `barcode=${req.params.barcode}`;
    const values = [
        req.body.name,
        req.body.description,
        req.body.purchased_price,
        req.body.selling_price,
        req.body.number,
        req.body.barcode,
        req.body.category,
        req.body.image,
    ]

    db.query(q, [...values], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json("Product has been updated");
    })
}
