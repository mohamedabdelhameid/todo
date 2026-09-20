import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListServicesService } from '../../../../services/list-services.service';
import { Ilist } from '../../../../interfaces/listInterfaces/ilist.interface';
import { ToastrServices } from '../../../../services/toastrServices/toastr.services';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private readonly listServicesService = inject(ListServicesService);
  private readonly toastr = inject(ToastrServices);
  newTodo = new FormControl( '',[Validators.required , Validators.minLength(3)]);
  todoId2 : WritableSignal<string> = signal('');
  addLoading : WritableSignal<boolean> = signal(false);


  getList(): void {
      this.listServicesService.getTodos().subscribe({
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

  addNewTodo(){
    this.addLoading.set(true);
    if(this.newTodo.valid){
      this.listServicesService.addTodo({title : this.newTodo.value}).subscribe({
        next: (res)=>{
          this.newTodo.reset();
          this.getList();
          this.toastr.success(`added successfully`, `new task`, {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 3000,
          });
        this.addLoading.set(false);
      },
      error:(err)=>{
          this.addLoading.set(false);
          this.toastr.error(`added failed`, `new task`, {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 3000,
          });
      }
      })
    } else{
      
    }
  }

}
