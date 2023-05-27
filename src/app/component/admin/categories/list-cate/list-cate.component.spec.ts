import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCateComponent } from './list-cate.component';

describe('ListCateComponent', () => {
  let component: ListCateComponent;
  let fixture: ComponentFixture<ListCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCateComponent]
    });
    fixture = TestBed.createComponent(ListCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
