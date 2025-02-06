import { Component } from '@angular/core';
import { GenericTableComponent } from './generic-table/generic-table.component';

@Component({
  selector: 'app-root',
  imports: [GenericTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
