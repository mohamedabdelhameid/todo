import { Component, inject } from '@angular/core';
import { ListServicesService } from '../../../../services/list-services.service';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  readonly listServicesService = inject(ListServicesService);
  math = Math;
}
