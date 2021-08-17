import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthModule  } from '../../auth.module';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  multistep!: FormGroup;



  
 

  constructor() { 
    
  }

  ngOnInit(){
    this.multistep = new FormGroup({
      confirm: new FormGroup({
        confirmEligible: new FormControl('',[Validators.required, Validators.requiredTrue]),
  
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
        ifnotreligion: new FormControl('',[Validators.required, Validators.minLength(5)])
    }),
      personalProfProfessional: new FormGroup({
        mailingAddress: new FormControl('',Validators.required),
        linkedlnURL: new FormControl(''),
        cityOfResident: new FormControl(''),
        resume: new FormControl(''),
        highestDegreeAchieved: new FormControl(''),
        careerField:new FormControl(''),
        university:new FormControl(''),
        major:new FormControl(''),
        companyName:new FormControl(''),
        jobTitle:new FormControl(''),
        hearAboutus:new FormControl(''),
        ifnothearAboutus:new FormControl(''),
    }),
      demographicInformation: new FormGroup({
        region: new FormControl('',Validators.required),
        otherregion: new FormControl(''),
        raceEthnicity: new FormControl(''),
        languages: new FormControl(''),
        immigrant: new FormControl(''),
    }),
      thankyou: new FormGroup({
        thanks: new FormControl('',Validators.required),
    }),
  
  })
  
  }
  
    // confirm
  get confirmEligible() { return this.multistep.get('profileInformation')?.get('confirmEligible'); }

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




}