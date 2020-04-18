const mongoose = require('mongoose');

module.exports = (url) => {
    mongoose.connect(url);

    mongoose.connection.on('connected', () => console.log(`Mongo conectado em ${url}`))
    mongoose.connection.on('disconnected', () => console.log('Mongo desconectado'));
    mongoose.connection.on('error', (err) => console.log(`Falha na conexão com o banco de dados.\nError: ${err}`));

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongo encerrado');
            process.exit(0);
        })
    })
}