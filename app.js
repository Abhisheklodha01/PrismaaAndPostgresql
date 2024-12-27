import express from 'express'


const app = express()

app.get("/" , (req, res) => {
    res.send("Working fine")
})


export default app;