import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProviderComponent } from './browse-provider.component';

describe('BrowseProviderComponent', () => {
  let component: BrowseProviderComponent;
  let fixture: ComponentFixture<BrowseProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
