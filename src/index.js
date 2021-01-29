import './styles.css';

//  Si yo dejo asi esta liena de codigo, buscare el archivo index.js por defecto
import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';

export const todoList =  new TodoList();

todoList.todos.forEach( crearTodoHTML );

/*
const newTodo = new Todo('Aprender JavaScript');

todoList.nuevoTodo( newTodo );

//  Si pongo esta linea, causara error porque imprimirClase() no es una funcion
todoList.todos[0].imprimirClase();

//  Con esta linea si funciona
newTodo.imprimirClase();
*/

console.log( 'todos', todoList.todos );

