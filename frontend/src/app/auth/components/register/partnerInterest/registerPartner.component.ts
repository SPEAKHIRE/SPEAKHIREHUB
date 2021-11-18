import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { registerPartnerService } from './registerPartner.service';


@Component({
  selector: 'app-registerPartner',
  templateUrl: './registerPartner.component.html',
  styleUrls: ['./registerPartner.component.css']
})
export class registerPartnerComponent implements OnInit { 
  @ViewChild('stepper') stepper: MatStepper
  multistep!: FormGroup;

  buttonClicked: Boolean = false
  activeStepper: boolean = true;
  stepper2active: boolean = false;

  selected = -1
  principalList: Array<string> = [
    'Yes', 'No'
  ]


  locationList: Array<string> = [
    'Remote', 'In Person'
  ]

  formOfContactList: Array<string> = [
    'Phone', 'Email', 'Either'
  ]

  genderList: Array<string> = [
    'Female-identifying', 'Male-identifying', 'Non-Binary', 'Other'
  ]

  preferredPronounsList: Array<string> = [
    'He/Him/His', 'She/Her/Hers', 'They/Them/Theirs', 'Other'
  ]

  constructor(private cd:ChangeDetectorRef, private registerPartnerService: registerPartnerService) { 

  }
  
  ngOnInit(){

    this.multistep = new FormGroup({
      partnerInformation: new FormGroup({
        partnerName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        partnerLocation: new FormControl('', Validators.required),
        partner_street_address: new FormControl('', [Validators.required, Validators.minLength(2)]),
        partner_city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        partner_state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        partner_zipcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
        partner_phone_number: new FormControl('',[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    }),
      profileInformation: new FormGroup({
        fname: new FormControl(null,[Validators.required, Validators.minLength(2)]),
        lname: new FormControl('',[Validators.required, Validators.minLength(2)]),
        jobTitle: new FormControl('',[Validators.required, Validators.minLength(3)]),
        form_of_contact: new FormControl('',Validators.required),
        gender: new FormControl('',Validators.required),
        pNumber: new FormControl('',[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
        pNumberExtension: new FormControl(''),
        preferred_pronouns: new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl(null,[Validators.required, Validators.email]),
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
  submitPartner(){
    const data = this.multistep
    console.log(data.value)
    this.registerPartnerService.getPartner(data.value).subscribe(res=>{
      console.log(res)
    },
    err=>{
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
  // partnerInformation
  get partnerName() { return this.multistep.get('partnerInformation')?.get('partnerName'); }
  get partnerLocation() { return this.multistep.get('partnerInformation')?.get('partnerLocation'); }
  get partner_street_address() { return this.multistep.get('partnerInformation')?.get('partner_street_address'); }
  get partner_city() { return this.multistep.get('partnerInformation')?.get('partner_city'); }
  get partner_state() { return this.multistep.get('partnerInformation')?.get('partner_state'); }
  get partner_zipcode() { return this.multistep.get('partnerInformation')?.get('partner_zipcode'); }
  get partner_phone_number() { return this.multistep.get('partnerInformation')?.get('partner_phone_number'); }

  // profileInformation
  get fname() { return this.multistep.get('profileInformation')?.get('fname'); }
  get lname() { return this.multistep.get('profileInformation')?.get('lname'); }
  get jobTitle() { return this.multistep.get('profileInformation')?.get('jobTitle'); }
  get form_of_contact() { return this.multistep.get('profileInformation')?.get('form_of_contact'); }
  get gender() { return this.multistep.get('profileInformation')?.get('gender'); }
  get pNumber() { return this.multistep.get('profileInformation')?.get('pNumber'); }
  get pNumberExtension() { return this.multistep.get('profileInformation')?.get('pNumberExtension'); }
  get preferred_pronouns() { return this.multistep.get('profileInformation')?.get('preferred_pronouns'); }
  get email() { return this.multistep.get('profileInformation')?.get('email'); }

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
  // get jobTitle() { return this.multistep.get('personalProfProfessional')?.get('jobTitle'); }
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
  validate(form:string, check?: boolean) { 
    var bool = true
    //console.log(this.multistep.get("profileInformation")?.value)
    if ((form === "profileInformation") && check){
      return false
    } 
    //console.log()
    for (const field in this.multistep.get(form)?.value){ // 'field' is a string
      //console.log(field + ": " + this.multistep.get(form)?.get(field)?.valid)
      if(!this.multistep.get(form)?.get(field)?.valid){
        return false
      }
    }
    return true
  }

  checkStepper(toggleFlag: boolean){
    if(toggleFlag){
      this.activeStepper = true;
      this.stepper2active = true;
    } else {
      this.activeStepper = false;
      this.stepper2active = false;
    }
  }

  showErrors(form:string){
    // if(form === "profileInformation"){
    //   this.checkUsername()
    // }
    // console.log(this.multistep.get("profileInformation")?.value)
    for (const field in this.multistep.get(form)?.value){ // 'field' is a string
      //console.log(field + ": " + this.multistep.get(form)?.get(field)?.valid)
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

  checkIfYes(){
    const yes : any = this.multistep.get('profileInformation')?.get('confirmEligible'); 
    console.log(yes.value)
    if(this.multistep.get('profileInformation')?.get('confirmEligible')?.touched==false && this.multistep.get('profileInformation')?.get('confirmEligible')?.invalid){
      this.multistep.get('profileInformation')?.get('confirmEligible')?.markAllAsTouched()
    }
    if(!yes.value) {alert("Please select yes to continue")}
  }


  checkUsername(){
    const username : any = this.multistep.get('profileInformation')?.get('uname')
    console.log(username.value)
    //this.showErrors('profileInformation')
    this.registerPartnerService.getPartnerUsername(username.value).subscribe(res => {
      console.log(res)
      if(res.user_exists){
        this.multistep.get('profileInformation')?.get('uname')?.setErrors({invalidUser : res.user_exists})
      }
      console.log(this.multistep.get('profileInformation')?.get('uname'))
      this.showErrors('profileInformation')
      this.validate('profileInformation', false)
    }, err => {
      console.log(err)
      this.showErrors('profileInformation')
    })
  }

  // isUsernameValid(control: AbstractControl): ValidationErrors | null {
    
  // }

}