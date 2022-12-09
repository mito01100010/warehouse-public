import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);

        if (data.length) return res.status(409).json("User already exists!")
        if (req.body.username.length < 5 || req.body.username.length > 15) return res.status(403).json("Username must be between 5 and 15 letters")
        if (!/^[a-zA-Z_]*$/.test(req.body.username)) return res.status(403).json("Username must contain only upper case, lower case and under score")
        if (req.body.password.length < 6 || req.body.password.length > 20) return res.status(403).json("Password must be between 6 and 20 letters")
        if (!/(?=.*[a-z])/.test(req.body.password)) return res.status(403).json("Password must have at least one lower case letter")
        if (!/(?=.*[A-Z])/.test(req.body.password)) return res.status(403).json("Password must have at least one upper case letter")
        if (!/[*@!_#%&()^~{}\-]+/.test(req.body.password)) return res.status(403).json("Password must have at least one special character")
        if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.email)) return res.status(403).json("Invalid email address")
        if (!req.body.phone == "") {
            if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(req.body.phone)) return res.status(403).json("Invalid phone number")
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`, `phone`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.phone,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        const token = jwt.sign({id:data[0].id}, "your_jwtkey_here");
        const {password, ...other} = data[0]; //take info exept password

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.");
};