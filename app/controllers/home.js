const login = require('../../config/auth').login;

module.exports = function (app) {
    const Curso = app.models.curso;

    const controller = {
        index(req, res) {
            Curso.find({}, [], {sort: {nome: 1}}).exec().then(cursos => {
                res.render('index', { cursos });
            })
        },
        newItem(req, res){
            const curso = new Curso(req.body);
            curso.save((err, curso) => {
                if(err){
                    res.status(500).end();
                    console.log(err);
                }else{
                    res.json({curso});
                }
            });
        },
        remove(req, res){
            Curso.remove({id: req.params.id}, (err) => {
                if(!err)
                    res.json({message: 'success'});
                else
                    res.status(500).end();
            });
        },
        login(req, res){
            const name = req.body.name,
                password = req.body.password;

            login(name, password, (result) => {
                if(result) 
                    res.json(result);
                else 
                    res.status(401).json({message: 'erro de autenticação'});
            });
        }
    }
    return controller;
}