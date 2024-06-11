const app = require('./app');
const port = 3001;
const host = 'localhost';
const server = app.listen(port, host, () => {
    console.log(`Node server is listening to ${server.address().port}`);
});
