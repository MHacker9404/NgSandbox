import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
    selector: 'ngs-own-store',
    template: `
        <div *ngIf="todos && todos.length">
            <p>
                You have <span>{{ todos.length }}</span> todos.
            </p>
            <input type="text" />
            <button type="button">Add todo</button>
            <ul class="todos">
                <!--<li *ngFor="let todo of todos">{{ todo.label }}<button type="button" attr.data-todo="{{ _stringify(todo) }}">Delete</button></li>-->

                <li *ngFor="let todo of todos">{{ todo.label }}<button type="button" (click)="delete(todo)">Delete</button></li>
            </ul>
            <button type="button" class="unsubscribe">Unsubscribe</button>
        </div>
    `,
    styleUrls: ['./own-store.component.scss'],
})
export class OwnStoreComponent implements OnInit {
    todos: Todo[] = [];
    constructor() {}

    ngOnInit() {}

    _stringify(todo: Todo): string {
        return JSON.stringify(todo);
    }
    delete(todo: Todo): void {
        console.log(todo);
    }
}
/*
const span = document.querySelector('span') as HTMLSpanElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

export function renderTodos(collection) {
  span.innerHTML = collection.length;
  todoList.innerHTML = '';
  for (const item of collection) {
    todoList.innerHTML += `
    	<li>
	      ${item.label}
        <button type="button" data-todo='${JSON.stringify(item)}'>
          Delete
        </button>
      </li>
     `;
  }
}

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    console.log(payload);

    input.value = '';
  },
  false
);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
  }
});
*/
