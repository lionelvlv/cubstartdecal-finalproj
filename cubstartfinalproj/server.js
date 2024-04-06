const PORT = 8000
import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})