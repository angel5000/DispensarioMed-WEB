import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMedicoComponent } from './gestion-medico.component';

describe('GestionMedicoComponent', () => {
  let component: GestionMedicoComponent;
  let fixture: ComponentFixture<GestionMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
