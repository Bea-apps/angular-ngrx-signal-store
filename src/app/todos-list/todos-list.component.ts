import { Component, effect, inject, viewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    CommonModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {

    // Notify when the signal filter emits a value.
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  async onAddTodo(title: string): Promise<void> {
    await this.store.addTodo(title);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  async onDeleteTodo(id: string, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onToggle(id: string, completed: boolean): Promise<void> {
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }

}
