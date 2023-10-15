import express from 'express'

const api = express()
api.use(express.json())

api.use((error, req, res) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  console.log(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = 3333
api.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
