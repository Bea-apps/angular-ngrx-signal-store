import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, TodosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  store = inject(TodosStore);

  ngOnInit(): void {

    this.loadTodos().then(() => console.log("Todos loaded"));

  }

  async loadTodos() { 
    await this.store.loadAll()
  }

  
}
