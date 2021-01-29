
export class Todo
{
    static fromJSON({ id, tarea, completado, creado })
    {
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    //      Aqui recibire la tarea o descripcion de lo que hare    
    constructor( tarea )
    {
        this.tarea = tarea;

        this.id         = new Date().getTime();         //      Arrojara numeros del tiempo exacto. La hora, minuto, segundo y milisegundo actual
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase()
    {
        console.log(`${ this.tarea } - ${ this.id }`);
    }
}
