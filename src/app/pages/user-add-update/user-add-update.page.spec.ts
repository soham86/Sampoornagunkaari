import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAddUpdatePage } from './user-add-update.page';

describe('UserAddUpdatePage', () => {
  let component: UserAddUpdatePage;
  let fixture: ComponentFixture<UserAddUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
