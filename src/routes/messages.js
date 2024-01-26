const { Router } = require('express');
const router = Router();

//2da Api, Obtener mensajes


router.get('/:tipoMensaje', (req, res) => {
    const mensajes = require('../modelos/' + req.params.tipoMensaje + '.json');

    //realizo un filter para filtrar los mensajes segun las querys
    //desde la variable mensaje filtro por un from, por un name y un subject ==
    const mensajesFiltrados = mensajes.data.filter((mensaje) => {
        let cumpleCondicionFrom;
        let cumpleCondicionTo;
        let cumpleCondicionSubject;

        if (req.query.from != undefined) {
            if (mensaje.from.name.includes(req.query.from)) {
                cumpleCondicionFrom = true;
            } else {
                cumpleCondicionFrom = false;
            }
        } else {
            cumpleCondicionFrom = true;
        }

        if (req.query.to != undefined) {
            if (mensaje.to[0].name.includes(req.query.to)) {
                cumpleCondicionTo = true;
            } else {
                cumpleCondicionTo = false;
            }
        } else {
            cumpleCondicionTo = true;
        }

        if (req.query.subject != undefined) {
            if (mensaje.subject.includes(req.query.subject)) {
                cumpleCondicionSubject = true;
            } else {
                cumpleCondicionSubject = false;
            }
        } else {
            cumpleCondicionSubject = true;
        }


        return cumpleCondicionFrom == true && cumpleCondicionTo == true && cumpleCondicionSubject == true;

        //si mi query "from" tiene valor y...
        //si mi query "from" incluye con "mensaje.from.name" => guardar respuesta en "cumpleCondicionFrom"

        //si mi query "to" tiene valor...
        // y si este valor coiincide con "mensaje.to.name" =>  guardar respuesta en "cumpleCondicionTo"

        //si mi query "subject" tiene valor y...
        //si mi query "subject" coincide con "mensaje.from.name" => guardar respuesta en "cumpleCondicionsubject"

        //
        //toma desicion:
        // si se cumple mi condicionFrom y condicionTo y condicionSubject => lo filtro
        //si se cumple mi condicion from y no se cumple mi condicioon to => no lo filtro
        //si no se cumple mi condicion From y si se cumple mi condicion to => no lo filtro 
        //si no se cumple mi condicion from y no se cumple mi condicion to => no lo filtro
        //







    });
    res.json(mensajesFiltrados);
});
// PETICION POST
// indico mi ruta con una peticion post = post.('/api/nuevoMensaje)

//creo una variable que contenga mi objeto y/o valores en el Body

// ya que es lo que considero valores para crear un mensaje
/*=> const primerMensaje = {
        "from": {
            "name": "Facundo Almon",
            "avatar": "assets/images/avatars/vincent.jpg",
            "email": "lawrencecollins@creapond.com"
        },
        "to": [
            {
                "name": "me",
                "email": "johndoe@creapond.com"
            }
        ],
        "subject": "Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "message": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>",
        "time": "28 Jun",
        "read": true,
        "starred": false,
        "important": true,
        "hasAttachments": false,
        "labels": []
    }
    */

// si mi nuevo mensaje tiene un "from" y un "to"
// si mi condicion se cumple ()
//

//sino tengo los dtos suficientes de from y to de quien y para quien entonces
// no quiero que me cree un mensaje. 

// y me devuelva un mensaje nuevo true;

router.post('/:tipoMensaje', (req, res) => {
    const mensajes = require('../modelos/' + req.params.tipoMensaje + '.json');
    const id = new Date().getTime();
    const nuevoMensaje = { ...req.body, id };

    mensajes.data.push(nuevoMensaje);
    res.json({ respuesta: 'mensaje creado', mensajes: mensajes });
});

router.delete('/:tipoMensaje/:id', (req, res) => {
    const { id } = req.params;
    let mensajes = require('../modelos/' + req.params.tipoMensaje + '.json');
    let mensajeindex;

    mensajes.data.forEach((mensaje, i) => {
        if (mensaje.id == id) {
            mensajeindex = i;
            console.log('mensaje encontrado');
        }
    });
    if(mensajeindex !=undefined) {
        mensajes.data.splice(mensajeindex, 1);
        res.json({ respuesta: 'mensaje eliminado', mensajes: mensajes });

    }else{
        res.json({respuesta: 'mensaje no encontrado'});
    }
   
});

module.exports = router;