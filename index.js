const app = require('./app');
// eslint-disable-next-line no-unused-vars
const db = require('./db');
const { PORT } = require('./constants');

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server has started on port ${PORT}!`);
});
