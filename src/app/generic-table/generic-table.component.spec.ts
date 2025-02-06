import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableComponent } from './generic-table.component';
import { By } from '@angular/platform-browser';

describe('GenericTableComponent', () => {
  let component: GenericTableComponent;
  let fixture: ComponentFixture<GenericTableComponent>;

  beforeEach(async () => {
    //component declaration so we can do the test on  it
    await TestBed.configureTestingModule({
      imports: [GenericTableComponent],
    }).compileComponents();
    //instance of component in test
    fixture = TestBed.createComponent(GenericTableComponent);
    //component instance
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should data get displayed correctly in the table', () => {
    component.Table = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
    ];
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];

    //display initialization
    component.pagination();
    //refresh the display
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2); //expecting to have two items = two rows
    expect(rows[0].nativeElement.textContent).toContain('1Item1');
    expect(rows[1].nativeElement.textContent).toContain('2Item2');
  });

  it('should get headers correctly', () => {
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];
    //refresh the display
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent).toBe(' ID ▲ ');
    expect(headers[1].nativeElement.textContent).toBe(' Name ▲ ');
  });

  it('should sort the table by ID', () => {
    component.Table = [
      { id: 2, name: 'Item2' },
      { id: 1, name: 'Item1' },
    ];
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];
    component.colSorting('id'); //sorting by ID
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('1Item1'); //check if item 1 is  displayed before item 2
    expect(rows[1].nativeElement.textContent).toContain('2Item2');
  });

  it('should paginate correctly', () => {
    component.Table = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' },
      { id: 4, name: 'Item4' },
      { id: 5, name: 'Item5' },
      { id: 6, name: 'Item6' },
      { id: 7, name: 'Item7' },
      { id: 8, name: 'Item8' },
      { id: 9, name: 'Item9' },
      { id: 10, name: 'Item10' },
    ];
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];
    component.pagination(); //display initialization
    fixture.detectChanges();

    expect(component.paginationTable.length).toBe(5); //test the item per page is 5 so paginationTable.length is 5
    expect(component.paginationTable[0].id).toBe(1); //test if the first page start with item the ID 1

    component.pageclicked(2); //change the page to page 2
    fixture.detectChanges();

    expect(component.currentPage).toBe(2); //test if the current page is 2
    expect(component.paginationTable[0].id).toBe(6); ////test if the second page start with item the ID 6
  });
});
