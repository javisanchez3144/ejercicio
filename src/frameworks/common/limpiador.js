module.exports = function limpiador(data = {}, validaciones = false, recursivo = false) {

    let objetivo = {}
    let resultado = { ok: true, error: [] }

    // if (data.usuario.id) { data.usuario.id = parseInt(data.usuario.id) }
    // if (data.usuario.idpersona) { data.usuario.idpersona = parseInt(data.usuario.idpersona) }
    // if (data.usuario.idinstitucion) { data.usuario.idinstitucion = parseInt(data.usuario.idinstitucion) }
    // if (data.usuario.idusuario) { data.usuario.idusuario = parseInt(data.usuario.idusuario) }
    // if (data.usuario.idperiodo) { data.usuario.idperiodo = parseInt(data.usuario.idperiodo) }
    // if (data.usuario.idrol) { data.usuario.idrol = parseInt(data.usuario.idrol) }
    //if (data.cuerpo.idpersona_estudiante) { data.cuerpo.idpersona_estudiante = parseInt(data.cuerpo.idpersona_estudiante) }
    //if (data.cuerpo.idactividad) { data.cuerpo.idactividad = parseInt(data.cuerpo.idactividad) }

    const datos = Object.assign({}, data.usuario, data.cuerpo, { accion: accion(data.accion) });

    //FALTA VALIDAR POR SI EL PARÁMETRO QUE SE QUIER VALIDAR, ESTÁ LLEGANDO O NO, EXISTE O NO.

    // validaciones.id = { tipo: 'number' };
    // validaciones.idinstitucion = { tipo: 'number', necesario: true };
    // validaciones.idpersona = { tipo: 'number', necesario: true };
    // validaciones.idusuario = { tipo: 'number', necesario: true };
    // validaciones.idperiodo = { tipo: 'number', necesario: true };
    // validaciones.idrol = { tipo: 'number' };
    // validaciones.idpersona_estudiante = { tipo: 'number' };
    // validaciones.idactividad = { tipo: 'number', necesario: true };
    // validaciones.accion = { tipo: 'string', necesario: true, limpiar: true };
    // validaciones.estado = { tipo: 'bool', nombre: 'Estado' };

    for (let key of Object.keys(datos)) {

        let valor = datos[key]
        if (!validaciones) objetivo[key] = valor ? valor : null;
        else {

            let validacion = validaciones[key];

            if (typeof validacion === 'object') {

                if (validacion.tipo === 'object' && typeof valor === 'object') {

                    const { target, error } = limpiador(valor, validacion.datos, true);

                    objetivo[key] = target;
                    !error.ok ? resultado.error.push(...error.error) : ''

                } else {

                    let error = {}
                    let dato = valor

                    if (validacion.necesario) {
                        !validarTipo(valor) ? error.necesario = `El parámetro "${validacion.nombre || key}" es requerido.` : ''
                    }

                    if (validacion.limpiar) {
                        typeof valor === 'string' ?
                            dato = valor.trim().replace(/[ ]{2,}/, ' ') :
                            error.limpiar = `El parámetro "${validacion.nombre || key}" no se puede limpiar porque no es de tipo "string".`
                    }

                    if (validacion.tipo) {
                        if (validacion.necesario) {
                            !(validacion.tipo === typeof valor) ?
                            error.tipo = `El parámetro "${validacion.nombre || key}" debe ser de tipo "${validacion.tipo}".`: ''
                        } else {
                            validarTipo(valor) ?
                                !(validacion.tipo === typeof valor) ?
                                error.tipo = `El parámetro "${validacion.nombre || key}" debe ser de tipo "${validacion.tipo}".` : '' :
                                ''
                        }
                    }

                    (Object.values(error).length > 0) ? (resultado.ok = false, resultado.error.push(error)) : ''
                    objetivo[key] = dato
                }
            } else objetivo[key] = valor ? valor : null;
        }
    }
    if (resultado.error.length > 0) console.log(resultado.error)
    return { target: objetivo, error: { ok: resultado.ok, mensaje: mensajeError(resultado.error) } };
}

function validarTipo(dato = '') {

    if (dato === null || dato === undefined || !dato) return false;

    const tipo = typeof dato
    let vacio = false;

    switch (tipo) {
        case 'object':
            vacio = Object.values(dato).length > 0 ? true : false;
            break;
        case 'string':
            vacio = dato.trim().replace(/[ ]{2,}/, ' ') !== '' ? true : false;
            break;
        case 'object':
            vacio = Object.values(dato).length > 0 ? true : false;
            break;
        case 'number':
            vacio = (!dato || dato === "" || dato === undefined || dato === null || dato === '0' || dato === 0) ? false : true;
            break;
        case 'bool':
            vacio = (!dato || dato === "" || dato === undefined || dato === null || dato === '0' || dato === 0) ? false : true;
            break;
    }

    return vacio
}

function accion(dato) {
    switch (dato) {
        case 'GET':
            return 'ver';
            break;
        case 'POST':
            return 'registrar';
            break;
        case 'PUT':
            return 'modificar';
            break;
        case 'DELETE':
            return 'eliminar';
            break;
        case 'PATCH':
            return 'archivo';
            break;
        default:
            return 'ninguno';
            break;
    }
}

function mensajeError(data = []) {
    let mensaje = ''
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if (data[key].necesario) { mensaje = data[key].necesario; break }
            if (data[key].limpiar) { mensaje = data[key].limpiar; break }
            if (data[key].tipo) { mensaje = data[key].tipo; break }
        }
    }
    return mensaje
}