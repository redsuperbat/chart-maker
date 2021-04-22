import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDataItemComponent } from './toolbar-data-item.component';

describe('ToolbarDataItemComponent', () => {
  let component: ToolbarDataItemComponent;
  let fixture: ComponentFixture<ToolbarDataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarDataItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
