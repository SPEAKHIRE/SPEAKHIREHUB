import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  multistep!: FormGroup;

  buttonClicked: Boolean = false

  constructor(private cd:ChangeDetectorRef) { 
    
  }

  ngOnInit(){

    this.multistep = new FormGroup({
      confirm: new FormGroup({
        confirmEligible: new FormControl(null,Validators.required),
  
    }),
      profileInformation: new FormGroup({
        fname: new FormControl(null,[Validators.required, Validators.minLength(2)]),
        lname: new FormControl('',[Validators.required, Validators.minLength(2)]),
        uname: new FormControl('',[Validators.required, Validators.minLength(5)]),
        dBirth: new FormControl('',Validators.required),
        passWord: new FormControl('',[Validators.required, Validators.minLength(8)]),
        reenterPassWord: new FormControl('',[Validators.required, Validators.minLength(8)]),
        email: new FormControl(null,[Validators.required, Validators.email]),
        pNumber: new FormControl('',[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
        gender: new FormControl('',Validators.required),
        citizenship: new FormControl('',Validators.required),
        religion: new FormControl('',Validators.required),
        ifnotreligion: new FormControl('')
    }),
      personalProfProfessional: new FormGroup({
        mailingAddress: new FormControl('',Validators.required),
        linkedlnURL: new FormControl('',Validators.required),
        cityOfResident: new FormControl('',Validators.required),
        resume: new FormControl(''),
        highestDegreeAchieved: new FormControl('',Validators.required),
        careerField:new FormControl('',Validators.required),
        university:new FormControl('',Validators.required),
        major:new FormControl('',Validators.required),
        companyName:new FormControl('',Validators.required),
        jobTitle:new FormControl('',Validators.required),
        hearAboutus:new FormControl('',Validators.required),
        ifnothearAboutus:new FormControl(),
    }),
      demographicInformation: new FormGroup({
        region: new FormControl('',Validators.required),
        otherregion: new FormControl('',Validators.required),
        raceEthnicity: new FormControl('',Validators.required),
        languages: new FormControl('',Validators.required),
        immigrant: new FormControl(),
    }),
      thankyou: new FormGroup({
        thanks: new FormControl(),
    }),
  
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


  // get isValid() { return this.fname?.invalid && this.lname?.invalid && this.fname?.invalid this.fname?.invalid
  //   this.fname?.invalid}
  validate(form:string) { 
    var bool = true
    // console.log(this.multistep.get("profileInformation")?.value)
    for (const field in this.multistep.get(form)?.value){ // 'field' is a string
      console.log(field + ": " + this.multistep.get(form)?.get(field)?.valid)
      if(!this.multistep.get(form)?.get(field)?.valid){
        return false
      }
    }
    return true
  }

  showErrors(form:string){
    // console.log(this.multistep.get("profileInformation")?.value)
    for (const field in this.multistep.get(form)?.value){ // 'field' is a string
      console.log(field + ": " + this.multistep.get(form)?.get(field)?.valid)
      if(this.multistep.get(form)?.get(field)?.touched==false && this.multistep.get(form)?.get(field)?.invalid){
        this.multistep.get(form)?.get(field)?.markAllAsTouched()
      }
    }
    return true
  }

  showConfirmErrors(){
  if (this.confirmEligible?.touched==false && this.confirmEligible?.invalid) {
    this.confirmEligible?.markAllAsTouched();
    } 
    return
  } 

}