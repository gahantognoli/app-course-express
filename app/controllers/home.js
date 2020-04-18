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
        }
    }
    return controller;
}