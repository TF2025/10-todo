import { Todo } from './index';

export class TodoList
{
    constructor()
    {
        //      this.todos = [];
        this.cargarLocalStorage();
    }    

    nuevoTodo( todo )
    {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id )
    {
        /*
        Aqui usare el metodo FILTER
        Esa instruccion regresara un nuevo arreglo excluyendo el todo que coincidira con el ID que tengo
        */
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id )
    {
        for( const todo of this.todos )
        {
            //      console.log( id, todo.id );
            if( todo.id = id )
            {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados()
    {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage()
    {
        //      Aqui convertire los datos de mis todos en JSON
        localStorage.setItem('todo', JSON.stringify( this.todos ) );
    }

    cargarLocalStorage()
    {
        this.todos = ( localStorage.getItem('todo') ) 
                        ? JSON.parse( localStorage.getItem('todo') ) 
                        : [];

        /*
            Haremos uso de la funcion MAP ( permite barrer cada uno de los elementos dentro de un arreglo y retorna un nuevo arreglo con cada uno de los objetos mutados )
        */
        this.todos = this.todos.map( obj => Todo.fromJSON( obj ) );

        //  this.todos = this.todos.map( Todo.fromJSON );       Esta linea de codigo es igual que la anterior
    }
}
