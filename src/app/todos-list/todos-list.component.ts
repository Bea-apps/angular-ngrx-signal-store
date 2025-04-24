import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { TodosStore } from '../store/todos.store';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatListModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

  store = inject(TodosStore);

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  async onDeleteTodo(id: string, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }



}
