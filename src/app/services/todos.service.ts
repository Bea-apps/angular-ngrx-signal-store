import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { Todo } from "../model/todo.model";

@Injectable(
    {
        providedIn: "root",
    }
)
export class TodosService {

    async getTodos(): Promise<Todo[]> {
        await sleep(1000); // Simulate a delay for loading data from the backend.
        return TODOS;
    }

    // Partial<Todo> because we are going simulate that the backend 
    // has generated the unique identifier of the Todo.
    async addTodo(todo: Partial<Todo>): Promise<Todo> {
        await sleep(1000);
        return {
            id: Math.random().toString(36).substring(2, 9),
            ...todo
        } as Todo;
    }

}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));

}