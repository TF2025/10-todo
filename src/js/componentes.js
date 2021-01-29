import { Todo } from "../classes";
import { todoList } from '../index';

//      Referencias en el HTML
const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const btnBorrar         = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');

//      En relacion al todo que yo reciba, eso construire en el HTML
export const crearTodoHTML = ( todo ) =>
{
    /*
        Uso backtip porque me permite usar multilinea
        Permite tambien hacer interpolacion de string para cambiar ciertas cosas. Se usa asi :      ${ } 
    */
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } >
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    /*
    Explico porque creo un DIV y no un LI
    Es por la configuracion que posee el LI; y las clases y id que carga
    Ademas que un DIV contendra mejor
    */
    const div = document.createElement('li');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}


//      Eventos

/*
    Me voy a centrar en 2 cosas :
    value       =   Valor ingresado ( la cadena de caracteres )
    keycode     =   Valor de tecla ingresada ( ascii code )
*/
txtInput.addEventListener('keyup', ( event ) => 
{
    if( event.keyCode == 13 )
    {
        console.log( txtInput.value );
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHTML( nuevoTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => 
{
    const nombreElemento    = event.target.localName;                                       //      Prinero hare referencia a ese valor obtenido:    input, label o button
    const todoElemento      = event.target.parentElement.parentElement;                     //      Despues hare referencia al elemento LI
    const todoId            = todoElemento.getAttribute('data-id');                         //      Con este codigo obtengo el ID

    //      Click en el checkbox
    if( nombreElemento.includes('input') )
    {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }
    else if( nombreElemento.includes('button') )                                            //      Hay que borrar el todo
    {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );                                            //      Ahora debo borrarlo del HTML
    }
});

btnBorrar.addEventListener('click', () => 
{
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i-- )
    {
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed'))
        {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', ( event ) => 
{
    const filtro = event.target.text;
    if( !filtro ){ return; }

    //  Aqui necesito remover la clase selected, lo hago porque puedo hacer click en cualquiera de las opciones
    anchorFiltros.forEach( elem => elem.classList.remove('selected') );

    //  Con esto el boton donde haga click queda rodeado de un borde
    event.target.classList.add('selected');

    //  Usare la clase hidden localizada en el archivo styles.css
    for( const elemento of divTodoList.children )
    {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro )
        {
            case 'Pendientes':
                if( completado )
                {
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':
                if( !completado )
                {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});




