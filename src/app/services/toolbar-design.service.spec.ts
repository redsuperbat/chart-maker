import { TestBed } from '@angular/core/testing';

import { ToolbarDesignService } from './toolbar-design.service';

describe('ToolbarDesignService', () => {
  let service: ToolbarDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
