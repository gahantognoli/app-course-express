const app = require('./config/express.js')();

app.listen(app.get('port'), () => {
    console.log(`Express server on port ${app.get('port')}`);
});