import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { registerChampionService } from './registerChampion.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registerChampion',
  templateUrl: './registerChampion.component.html',
  styleUrls: ['./registerChampion.component.css']
})
export class registerChampionComponent implements OnInit {
  multistep!: FormGroup;

  buttonClicked: Boolean = false

  constructor(private cd: ChangeDetectorRef, private registerChampionService: registerChampionService) {

  }

  ngOnInit() {

    this.multistep = new FormGroup({
      confirm: new FormGroup({
        confirmEligible: new FormControl(false, Validators.requiredTrue),

      }),
      profileInformation: new FormGroup({
        fname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        lname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        uname: new FormControl('', [Validators.required, Validators.minLength(5)]),
        dBirth: new FormControl('', Validators.required),
        passWord: new FormControl('', [Validators.required, Validators.minLength(8)]),
        reenterPassWord: new FormControl('', [Validators.required, Validators.minLength(8)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        pNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
        gender: new FormControl('', Validators.required),
        citizenship: new FormControl('', Validators.required),
        religion: new FormControl('', Validators.required),
        ifnotreligion: new FormControl('')
      }),
      personalProfProfessional: new FormGroup({
        mailingAddress: new FormControl('', Validators.required),
        linkedlnURL: new FormControl('', Validators.required),
        cityOfResident: new FormControl('', Validators.required),
        resume: new FormControl(''),
        highestDegreeAchieved: new FormControl('', Validators.required),
        careerField: new FormControl('', Validators.required),
        university: new FormControl('', Validators.required),
        major: new FormControl('', Validators.required),
        companyName: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),
        hearAboutus: new FormControl('', Validators.required),
        ifnothearAboutus: new FormControl(),
      }),
      demographicInformation: new FormGroup({
        region: new FormControl('', Validators.required),
        otherregion: new FormControl('', Validators.required),
        raceEthnicity: new FormControl('', Validators.required),
        languages: new FormControl('', Validators.required),
        immigrant: new FormControl(),
      }),
      thankyou: new FormGroup({
        thanks: new FormControl(),
      }),

    })
    this.multistep.get('profileInformation')?.get('uname')?.valueChanges.pipe(debounceTime(1000))
      .subscribe(value => {
        if (value) {
          this.registerChampionService.getChampionUsername(value).subscribe(res => {
            if (res.user_exists) {
              this.multistep.get('profileInformation')?.get('uname')?.setErrors({ invalidUser: res.user_exists })
              this.showErrors('profileInformation')
              return this.validate('profileInformation')
            }
            else {
              this.showErrors('profileInformation')
              return this.validate('profileInformation')
            }
          }, err => {
            console.log(err)
            this.showErrors('profileInformation')
            return this.validate('profileInformation')
          })
        }
      })

  }
  submitChampion() {
    const data = this.multistep
    console.log(data.value)
    this.registerChampionService.getChampion(data.value).subscribe(res => {
      console.log(res)
    },
      err => {
        console.log(err)
        //show the errors here 
      })
  }

  // confirm
  get confirmEligible() { return this.multistep.get('profileInformation')?.get('confirmEligible'); }

  confirmValidate() {
    // console.log(this.multistep.get('confirmEligible')?.)
    return this.confirmEligible?.invalid
    // return true
  }



  // profileInformation
  get fname() { return this.multistep.get('profileInformation')?.get('fname'); }
  get lname() { return this.multistep.get('profileInformation')?.get('lname'); }
  get uname() { return this.multistep.get('profileInformation')?.get('uname'); }
  get dBirth() { return this.multistep.get('profileInformation')?.get('dBirth'); }
  get passWord() { return this.multistep.get('profileInformation')?.get('passWord'); }
  get reenterPassWord() { return this.multistep.get('profileInformation')?.get('reenterPassWord'); }
  get email() { return this.multistep.get('profileInformation')?.get('email'); }
  get pNumber() { return this.multistep.get('profileInformation')?.get('pNumber'); }
  get gender() { return this.multistep.get('profileInformation')?.get('gender'); }
  get citizenship() { return this.multistep.get('profileInformation')?.get('citizenship'); }
  get religion() { return this.multistep.get('profileInformation')?.get('religion'); }
  get ifnotreligion() { return this.multistep.get('profileInformation')?.get('ifnotreligion'); }



  // personalProfProfessional
  get mailingAddress() { return this.multistep.get('personalProfProfessional')?.get('mailingAddress'); }
  get linkedlnURL() { return this.multistep.get('personalProfProfessional')?.get('linkedlnURL'); }
  get cityOfResident() { return this.multistep.get('personalProfProfessional')?.get('cityOfResident'); }
  get resume() { return this.multistep.get('personalProfProfessional')?.get('resume'); }
  get highestDegreeAchieved() { return this.multistep.get('personalProfProfessional')?.get('highestDegreeAchieved'); }
  get careerField() { return this.multistep.get('personalProfProfessional')?.get('careerField'); }
  get university() { return this.multistep.get('personalProfProfessional')?.get('university'); }
  get major() { return this.multistep.get('personalProfProfessional')?.get('major'); }
  get companyName() { return this.multistep.get('personalProfProfessional')?.get('companyName'); }
  get jobTitle() { return this.multistep.get('personalProfProfessional')?.get('jobTitle'); }
  get hearAboutus() { return this.multistep.get('personalProfProfessional')?.get('hearAboutus'); }
  get ifnothearAboutus() { return this.multistep.get('personalProfProfessional')?.get('ifnothearAboutus'); }

  // demographicInformation
  get region() { return this.multistep.get('demographicInformation')?.get('region'); }
  get otherregion() { return this.multistep.get('demographicInformation')?.get('otherregion'); }
  get raceEthnicity() { return this.multistep.get('demographicInformation')?.get('raceEthnicity'); }
  get languages() { return this.multistep.get('demographicInformation')?.get('languages'); }
  get immigrant() { return this.multistep.get('demographicInformation')?.get('immigrant'); }

  validate(form: string) {
    for (const field in this.multistep.get(form)?.value) {
      if (!this.multistep.get(form)?.get(field)?.valid) {
        return false
      }
    }
    return true
  }

  showErrors(form: string) {
    for (const field in this.multistep.get(form)?.value) {
      if (this.multistep.get(form)?.get(field)?.touched == false && this.multistep.get(form)?.get(field)?.invalid) {
        this.multistep.get(form)?.get(field)?.markAllAsTouched()
      }
    }
    return true
  }

  showConfirmErrors() {
    if (this.confirmEligible?.touched == false && this.confirmEligible?.invalid) {
      this.confirmEligible?.markAllAsTouched();
    }
    return
  }

  checkIfYes() {
    const yes: any = this.multistep.get('profileInformation')?.get('confirmEligible');
    if (this.multistep.get('profileInformation')?.get('confirmEligible')?.touched == false && this.multistep.get('profileInformation')?.get('confirmEligible')?.invalid) {
      this.multistep.get('profileInformation')?.get('confirmEligible')?.markAllAsTouched()
    }
    if (!yes.value) { alert("Please select yes to continue") }
  }
}