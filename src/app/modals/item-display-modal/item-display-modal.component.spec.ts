import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDisplayModalComponent } from './item-display-modal.component';

describe('ItemDisplayModalComponent', () => {
  let component: ItemDisplayModalComponent;
  let fixture: ComponentFixture<ItemDisplayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDisplayModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
