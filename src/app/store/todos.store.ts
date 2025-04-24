import { Todo } from "../model/todo.model";
import { signalStore, withState } from "@ngrx/signals";

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
} 

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "all",
};

// Capital T because is an angular injectable.
// Singelton store provided in root => it will be available in the whole app.
export const TodosStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialState),
);