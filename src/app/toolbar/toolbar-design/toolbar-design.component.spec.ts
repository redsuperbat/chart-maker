import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDesignComponent } from './toolbar-design.component';

describe('ToolbarDesignComponent', () => {
  let component: ToolbarDesignComponent;
  let fixture: ComponentFixture<ToolbarDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
