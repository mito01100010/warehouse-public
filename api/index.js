import express from "express";
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import multer from "multer";

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)
app.use(cookieParser())

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg'
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    },
    fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'))
    }
  }
})
const upload = multer({storage})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)

app.listen(8800, () => {
    console.log("Connected!")
})