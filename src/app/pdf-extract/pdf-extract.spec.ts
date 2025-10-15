import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExtract } from './pdf-extract';

describe('PdfExtract', () => {
  let component: PdfExtract;
  let fixture: ComponentFixture<PdfExtract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfExtract]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfExtract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
