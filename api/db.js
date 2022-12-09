import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "your_username_here",
    password: "your_password_here",
    database: "warehouse"
})