import { TestBed } from '@angular/core/testing';

import { ToastrServices } from './toastr.services';

describe('ToastrServices', () => {
  let service: ToastrServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
