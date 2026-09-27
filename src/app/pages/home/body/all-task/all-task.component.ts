import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ilist } from '../../../../interfaces/listInterfaces/ilist.interface';
import { ListServicesService } from '../../../../services/list-services.service';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrServices } from '../../../../services/toastrServices/toastr.services';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-all-task',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css',
})
export class AllTaskComponent {
  readonly listServicesService = inject(ListServicesService);
  subscription!: Subscription;
  todoStatus: WritableSignal<boolean> = signal(false);
  @Output() dataEvent = new EventEmitter<string>();
  isEditModalOpen: boolean = false;
  // editedTitle: string = '';
  private editingTodoId: string = '';
  statusLoadingId: WritableSignal<string | null> = signal(null);
  deleteLoadingId: WritableSignal<string | null> = signal(null);
  modifyLoadingId: WritableSignal<string | null> = signal(null);

  editedTitle = new FormControl( '',[Validators.required , Validators.minLength(3)]);


  private readonly toastr = inject(ToastrServices);

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.subscription = this.listServicesService.getTodos().subscribe({
      next: (res: Ilist[]) => {
        this.listServicesService.listData.set(res);
        this.listServicesService.listCount.set(res.length);
      },
      error: (err) => {
        this.toastr.error(`get tasks failed`, `failed`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
      },
    });
  }

  deleteTodo(todoId: string): void {
    this.deleteLoadingId.set(todoId);
    this.listServicesService.deleteTodo(todoId).subscribe({
      next: (res) => {
        this.getList();
        this.deleteLoadingId.set(null);
        this.toastr.success(`deleted successfully`, `deleted`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
      },
      error: (err) => {
        this.deleteLoadingId.set(null);
        this.toastr.error(`delete task failed`, `failed`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
      },
    });
  }

  updateTodo(todoId: string): void {
    this.statusLoadingId.set(todoId);
    this.listServicesService.getTodo(todoId).subscribe({
      next: (res: Ilist) => {
        this.todoStatus.set(res.completed);
        this.listServicesService.updateStatus(todoId, { completed: !this.todoStatus() }).subscribe({
          next: (res) => {
            this.getList();
            this.toastr.success(`status updated successfully`, `status`, {
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 3000,
            });
            this.statusLoadingId.set(null);
          },
          error: (err) => {
            this.toastr.error(`status updated failed`, `status`, {
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 3000,
            });
            this.statusLoadingId.set(null);
          },
        });
      },
      error: (err) => {
        this.statusLoadingId.set(null);
      },
    });
  }

  openEditModal(todo: Ilist): void {
    this.editingTodoId = todo._id;
    this.editedTitle.setValue(todo.title);
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedTitle.setValue('');
    this.editingTodoId = '';
  }

  saveEdit(): void {
    if (!this.editedTitle.value?.trim()) {
      return;
    }

    this.modifyLoadingId.set(this.editingTodoId);
    if(this.editedTitle.valid){
      this.listServicesService.getTodo(this.editingTodoId).subscribe({
      next: (res: Ilist) => {
        this.todoStatus.set(res.completed);
        this.listServicesService.updateContent(this.editingTodoId, { title: this.editedTitle.value!, completed: false }).subscribe({
          next: (res) => {
            this.modifyLoadingId.set(null);
            this.getList();
            this.closeEditModal();
            this.toastr.success(`task updated successfully`, `update task`, {
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 3000,
            });
          },
          error: (err) => {
            this.modifyLoadingId.set(null);
            this.toastr.error(`task updated failed`, `update task`, {
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 3000,
            });
          },
        });
      },
      error: (err) => {
        this.modifyLoadingId.set(null);
      },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}