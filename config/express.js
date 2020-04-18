const express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser')

module.exports = function() {
    const app = express();
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.set('port', 3000);
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}