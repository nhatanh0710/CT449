const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Contact Book application' });
});

//Middleware handle 404
app.use((req, res, next) => {
    return next(new AppError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

 module.exports = app;       