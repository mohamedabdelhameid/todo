import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilist } from '../interfaces/listInterfaces/ilist.interface';
import { ApiLink } from '../environment/apiLink';

@Injectable({
  providedIn: 'root',
})
export class ListServicesService {
  private readonly httpClient = inject(HttpClient);
  listCount: WritableSignal<number> = signal<number>(0);
  listData: WritableSignal<Ilist[]> = signal([]);


  getTodos(): Observable<Ilist[]> {
    return this.httpClient.get<Ilist[]>(ApiLink.apiLink + 'todos');
  }

  getTodo(todoId : string): Observable<Ilist> {
    return this.httpClient.get<Ilist>(ApiLink.apiLink + `todos/${todoId}`);
  }

  addTodo(todo : {title : string | null}): Observable<Ilist> {
    return this.httpClient.post<Ilist>(ApiLink.apiLink + 'todos' , todo);
  }

  deleteTodo(todoId : string): Observable<Ilist[]> {
    return this.httpClient.delete<Ilist[]>(ApiLink.apiLink + `todos/${todoId}`);
  }

  updateStatus(todoId : string , todoStatus : {completed : boolean}):Observable<Ilist[]> {
    return this.httpClient.put<Ilist[]>(ApiLink.apiLink + `todos/${todoId}` , todoStatus);
  }

  updateContent(todoId : string , todoContent : {title : string , completed? : boolean}) :Observable<Ilist[]> {
    return this.httpClient.put<Ilist[]>(ApiLink.apiLink + `todos/${todoId}` , todoContent);
  }
}
