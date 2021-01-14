const app = require('./lib/app');

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
    console.log(`Listening on PORT $(PORT)`);
})