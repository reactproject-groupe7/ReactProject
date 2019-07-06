const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connexion DB 
connectDB();
//initialisation du middleware
app.use(express.json({
    extended: false
}));
app.get("/", (req, res) => res.send('API Running'));
//Definit les routee
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));