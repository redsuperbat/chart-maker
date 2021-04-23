import { TestBed } from '@angular/core/testing';

import { ToolbarContentService } from './toolbar-content.service';

describe('ToolbarContentService', () => {
  let service: ToolbarContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
