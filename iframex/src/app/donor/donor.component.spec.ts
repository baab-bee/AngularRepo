import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DonorComponent } from './donor.component';


describe('HomeComponent', () => {
    let component: DonorComponent;
    let fixture: ComponentFixture<DonorComponent>;

beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [DonorComponent]
        //imports: [ReactiveFormsModule]
    });

    const fixture = TestBed.createComponent(DonorComponent);
    component = fixture.componentInstance;
});

});