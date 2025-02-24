import { Component, ViewChild, ElementRef, ComponentRef, ViewContainerRef, AfterViewInit, ChangeDetectorRef, Type } from '@angular/core';
import { AutoAccidentComponent } from '../InjuryForms/auto-accident/auto-accident.component';
import { MotorCycleAccidentComponent } from '../InjuryForms/motor-cycle-accident/motor-cycle-accident.component';
import { TruckAccidentComponent } from '../InjuryForms/truck-accident/truck-accident.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  @ViewChild('claimForm', { static: false }) claimForm!: ElementRef<HTMLFormElement>;
  @ViewChild('accidentComponentContainer', { read: ViewContainerRef, static: false })
  accidentComponentContainer!: ViewContainerRef;
  selectedInjuryType: string | null = null;

  currentStep = 1;
  formData: any = {};
  currentAccidentComponent: ComponentRef<any> | null = null;
  pendingInjuryType: string | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    setTimeout(() => {
      if (this.pendingInjuryType) {
        console.log('Loading pending injury type:', this.pendingInjuryType);
        this.loadAccidentComponent(this.pendingInjuryType);
      }
    });
  }

  nextStep(injuryType?: string) {
    console.log('nextStep called with injury type:', injuryType);
    if (this.currentStep < 3) {
      this.currentStep++;
      console.log('Current step is now:', this.currentStep);
      if (this.currentStep === 2 && injuryType) {
        console.log('Setting selected injury type');
        this.selectedInjuryType = injuryType;
        this.loadAccidentComponent(injuryType);
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      console.log('Current step is now:', this.currentStep);
      if (this.currentStep === 2 && this.selectedInjuryType) {
        console.log('Reloading accident component');
        this.loadAccidentComponent(this.selectedInjuryType);
      } else if (this.currentStep === 1) {
        this.clearAccidentComponent();
        this.selectedInjuryType = null;
      }
    }
  }

  loadAccidentComponent(injuryType: string) {
    console.log('loadAccidentComponent called with injury type:', injuryType);
    this.clearAccidentComponent();

    setTimeout(() => {
      if (!this.accidentComponentContainer) {
        console.error('Accident component container not available');
        return;
      }

      let componentType: Type<AutoAccidentComponent | MotorCycleAccidentComponent | TruckAccidentComponent>;
      switch (injuryType) {
        case 'Auto Accident':
          componentType = AutoAccidentComponent;
          break;
        case 'Motorcycle Accident':
          componentType = MotorCycleAccidentComponent;
          break;
        case 'Truck Accident':
          componentType = TruckAccidentComponent;
          break;
        default:
          console.error('Unknown injury type:', injuryType);
          return;
      }

      console.log('Creating component:', componentType.name);
      this.currentAccidentComponent = this.accidentComponentContainer.createComponent(componentType);
      console.log('Component created');
      this.currentAccidentComponent.instance.nextStep.subscribe(() => this.nextStep());
      this.currentAccidentComponent.instance.previousStep.subscribe(() => this.previousStep());
      this.changeDetectorRef.detectChanges();
    });
  }

  clearAccidentComponent() {
    if (this.currentAccidentComponent) {
      this.currentAccidentComponent.destroy();
      this.currentAccidentComponent = null;
    }
    if (this.accidentComponentContainer) {
      this.accidentComponentContainer.clear();
    }
  }

  scrollToForm() {
    if (this.claimForm) {
      this.claimForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.claimForm.nativeElement.classList.add('highlighted-form');

      setTimeout(() => {
        this.claimForm.nativeElement.classList.remove('highlighted-form');
      }, 3000);
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Handle form submission logic here
  }
}