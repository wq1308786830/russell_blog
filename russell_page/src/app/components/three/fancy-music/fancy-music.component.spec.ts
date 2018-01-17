import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyMusicComponent } from './fancy-music.component';

describe('FancyMusicComponent', () => {
  let component: FancyMusicComponent;
  let fixture: ComponentFixture<FancyMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
