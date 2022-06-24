/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InteracoesComponent } from './interacoes.component';

describe('InteracoesComponent', () => {
  let component: InteracoesComponent;
  let fixture: ComponentFixture<InteracoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteracoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
