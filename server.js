import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'

// rest Objext
const app = express()

// .env
dotenv.config()

// mongoDb connection
connectDB()

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

// default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce App</h1>")
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white)
})