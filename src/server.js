import express from 'express'

const api = express()
api.use(express.json())

const PORT = 3333
api.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
