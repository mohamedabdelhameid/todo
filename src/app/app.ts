import { Component } from '@angular/core';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { ReviewComponent } from './pages/home/body/review/review.component';
import { NewTaskComponent } from './pages/home/body/new-task/new-task.component';
import { AllTaskComponent } from './pages/home/body/all-task/all-task.component';
import { FooterComponent } from './pages/home/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [NavbarComponent, ReviewComponent, NewTaskComponent, AllTaskComponent, FooterComponent]
})
export class App {
}
