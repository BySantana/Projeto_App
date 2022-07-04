/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InteracaoService } from './interacao.service';

describe('Service: Interacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteracaoService]
    });
  });

  it('should ...', inject([InteracaoService], (service: InteracaoService) => {
    expect(service).toBeTruthy();
  }));
});
