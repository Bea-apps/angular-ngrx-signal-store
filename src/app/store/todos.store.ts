import { TodosService } from './../services/todos.service';
import { Todo } from "../model/todo.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from '@angular/core';

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
} 

// The signal store creates a signal for each property of the initial state.
// The main feature of the signal store is that it turns the state into signals.
// That means that we can consume the data in the application and when a new version
// of the data is emitted, only the parts of the user interface that need to be updated will be updated.
const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "completed",
};

// Capital T because is an angular injectable.
// Singelton store provided in root => it will be available in the whole app.
export const TodosStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialState),
    withMethods((store, todosService = inject(TodosService)) => ({
        async loadAll() {
            patchState(store, { loading: true });

            const todos = await todosService.getTodos();

            patchState(store, {todos, loading: false});
        },

        async addTodo(title: string): Promise<void> {

            const todo = await todosService.addTodo({title, completed: false});
            patchState(store, (state) => ({
                todos: [...state.todos, todo]
            }));
        },

        async deleteTodo(id: string): Promise<void> {

            await todosService.deleteTodo(id);
            patchState(store, (state) => ({
                todos: state.todos.filter(todo => todo.id !== id)
            }));

        },

        async updateTodo(id: string, completed: boolean): Promise<void> {
            await todosService.updateTodo(id, completed);
            patchState(store, (state) => ({
                todos: state.todos.map(todo => 
                    todo.id === id ? {...todo, completed} : todo)
            }));
        },

        updateFilter(filter: TodosFilter) {
            patchState(store, {filter}); // partial state object.
        }


    })),
    // use of concept derived signals for update filtered list items in the signal store.
    // 'withComputed' allow us to derive a new signal property.
    withComputed((state) => ({
        filteredTodos: computed(() => {
            const todos = state.todos();
            switch(state.filter()) {
                case "all": 
                    return todos;
                case "pending":
                    return todos.filter((todo: Todo) => !todo.completed);
                case "completed":
                    return todos.filter((todo: Todo) => todo.completed);
            }
        })
    }))


);