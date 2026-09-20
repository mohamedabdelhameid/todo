import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListServicesService } from '../../../services/list-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly listServicesService = inject(ListServicesService)
}
