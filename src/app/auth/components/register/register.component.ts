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
  step: any = 1;
  submitted: any = false;
  

  
  multistep = new FormGroup({
    confirm: new FormGroup({
      confirmEligible: new FormControl('',[Validators.required, Validators.requiredTrue]),

  }),
    profileInformation: new FormGroup({
      fname: new FormControl('my name',Validators.required),
      lname: new FormControl('',Validators.required),
      uname: new FormControl('',Validators.required),
      dBirth: new FormControl('',Validators.required),
      passWord: new FormControl('',[Validators.required, Validators.minLength(8)]),
      reenterPassWord: new FormControl('',[Validators.required, Validators.minLength(8)]),
      email: new FormControl(null,[Validators.required, Validators.email]),
      pNumber: new FormControl('',[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      gender: new FormControl('',Validators.required),
      citizenship: new FormControl('',Validators.required),
      religion: new FormControl('',Validators.required),
      ifnotreligion: new FormControl('',Validators.required)
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

  constructor() { 
    
  }

  ngOnInit(){
    // this.multistep = new FormGroup({
    //   confirm: new FormGroup({
    //     confirmEligible: new FormControl(null,Validators.required),
    //   })
    // });
  }


//   get userDetails() {
//     return this.multistep.controls['userDetails']['controls'];
// }

  submit() { 
    this.submitted = true;
    // if(this.multistep.controls.userDetails.invalid && this.step == 1) {
    //   return;
    // }
    this.step = this.step + 1
  }
  previous() {
    this.step = this.step - 1;
  }


}