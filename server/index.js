if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./db/connection');

const app = express();

app.use(morgan('dev'));
app.use(cors(
    { origin: '*' }
));
app.use(express.json({
    limit: '50mb'
}));

app.use('/auth', require('./routes/auth'));
//require('./routes/design')(app);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: error.message,
        }
    });
    console.error(err);
})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on ${port}...`) });
