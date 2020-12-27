import '../css/componentes.css';


//      Para poder usar la funcion fuera del archivo, le agrego la palabra clave export

export const saludar = ( nombre ) =>
{
    console.log('Creando etiqueta h1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }. The fastest man alive !!!`;

    document.body.append( h1 );

}
