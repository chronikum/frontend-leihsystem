import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUserGroupsComponent } from './chart-user-groups.component';

describe('ChartUserGroupsComponent', () => {
  let component: ChartUserGroupsComponent;
  let fixture: ComponentFixture<ChartUserGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartUserGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
