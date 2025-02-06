import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css',
})
export class GenericTableComponent {
  //Get a data table dynamically
  @Input() Table: any[] = [];
  //Get columns headers dynamically
  @Input() columns: { key: string; label: string }[] = [];

  //Sorting Variables
  keySelected: string | null = null;
  direction: 'asc' | 'des' = 'asc';
  sign: '▲' | '▼' = '▲';

  //Pagination Variables
  totalItems!: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  paginationTable: any[] = [];
  pages: number[] = [];

  //-----------------------------SORTING------------------------------------
  colSorting(key: string) {
    //toggle direction
    if (key === this.keySelected) {
      this.direction = this.direction === 'asc' ? 'des' : 'asc';
      this.sign = this.sign === '▲' ? '▼' : '▲';
    } else {
      this.keySelected = key;
      this.direction = 'asc';
      this.sign = '▲';
    }
    //sorting the table based on the direction
    this.Table.sort((a, b) => {
      //get the values of the column dynamically
      const value1 = a[key];
      const value2 = b[key];

      // if the value returned is negative we put value1 before value2
      // if the value returned is positive we put value2 before value1

      //String Values
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return this.direction === 'asc'
          ? value1.localeCompare(value2) //for the ascending sorting
          : value2.localeCompare(value1); //for the descending sorting
      }
      //Number values
      return this.direction === 'asc'
        ? value1 - value2 //for the ascending sorting
        : value2 - value1; //for the descending sorting
    });
    this.paginationTable = this.Table;
    this.getPaginationTable();
  }

  //-----------------------------PAGINATION------------------------------------

  //do the pagination once we get the table of data
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Table']) {
      this.pagination();
    }
  }

  pagination() {
    this.totalItems = this.Table.length;
    //round the number to the nearest whole number
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    //Pages array
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
      //update the table that we're going to display
      this.getPaginationTable();
    }
  }
  pageclicked(page: number) {
    if (page > this.totalPages || page <= 0) return;
    //get the curent page clciked
    this.currentPage = page;
    //update the table that we're going to display
    this.getPaginationTable();
  }

  getPaginationTable() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    //slice the table (start index  &   end index)
    this.paginationTable = this.Table.slice(start, end);
  }
}
