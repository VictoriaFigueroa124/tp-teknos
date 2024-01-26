const {Router} = require('express');
const router = Router();

//1ra Api- Obtener Carpeta

router.get('/', (req, res) =>{
    const folders = require('../modelos/folders.json');

    res.json(folders);
})


module.exports = router;