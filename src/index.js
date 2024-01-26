const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', 4000);


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/folders', require("./routes/folders"));
app.use('/api/messages', require("./routes/messages"));


//FUNCION DE MI SERVIDOR
app.listen(app.get('port'), "0.0.0.0", () => {
    console.log(`Server on port ${app.get('port')}`);
});
