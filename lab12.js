const express = require('express');
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/views/users.html');
});

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/views/products.html');
});

// Users router
const usersRouter = express.Router();
usersRouter.get('/', (req, res) => res.send('Users GET response'));
usersRouter.post('/', (req, res) => res.send('Users POST response'));
app.use('/users', usersRouter);

// Products router
const productsRouter = express.Router();
productsRouter.get('/', (req, res) => res.send('Products GET response'));
productsRouter.post('/', (req, res) => res.send('Products POST response'));
app.use('/products', productsRouter);

// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
