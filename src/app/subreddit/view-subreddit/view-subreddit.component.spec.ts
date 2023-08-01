import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubredditComponent } from './view-subreddit.component';

describe('ViewSubredditComponent', () => {
  let component: ViewSubredditComponent;
  let fixture: ComponentFixture<ViewSubredditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubredditComponent]
    });
    fixture = TestBed.createComponent(ViewSubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
