module.exports = function (app, db) {
    var ObjectID = require('mongodb').ObjectID;
    app.post('/discussion', (req, res) => {
        const discussion = { ...req.body };
        db.collection('discussion ').insert(discussion, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/discussion/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('discussion ').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    app.get('/discussion', (req, res) => {
        db.collection('discussion ').find({}).toArray((err, items) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(items);
            }
        });
    });

    app.put('/discussion/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { ...req.body };
        db.collection('discussion ').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/discussion/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('discussion ').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
};