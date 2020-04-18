const app = require('./config/express.js')();
require('./config/database.js')('mongodb://localhost:27017/app-express');

app.listen(app.get('port'), () => {
    console.log(`Express server on port ${app.get('port')}`);
});