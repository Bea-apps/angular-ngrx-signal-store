import { Component, inject, OnInit } from '@angular/core';
import { TodosStore } from './store/todos.store';
import { TodosListComponent } from "./todos-list/todos-list.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    TodosListComponent,
    MatProgressSpinnerModule
  ],
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
