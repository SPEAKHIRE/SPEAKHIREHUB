import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { RegisterPartnerService } from './registerPartner.service';
import { registerPartnerConfig } from './registerPartner.config'
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-registerPartner',
    templateUrl: './registerPartner.component.html',
    styleUrls: ['./registerPartner.component.css']
})

export class registerPartnerComponent implements OnInit {
    checkboxes = [
        { option:'Foundational Year - Lean-2', hoverText: 'Lean-2 Career Pathways coaching with 2 professionals.', description: 'Lean-2 includes career pathways coaching for each student with two different career professionals, called Career Pathways Champions (CPCs).', formControlName: 'interestedPrograms1'},
        { option:'Foundational Year - Lean-2+', hoverText: 'Lean 2+ includes the above plus peer leadership development.', description:  'Lean-2+ includes career pathways coaching for each student with two different career professionals, called Career Pathways Champions (CPCs), and includes Ambassadorship, peer leadership development to support the Partner Support Liaison.', formControlName: 'interestedPrograms2'},
        { option:'Foundational Year - Lean-3', hoverText: 'Lean-3 Career Pathways coaching with 3 professionals.', description:  'Lean-3 includes career pathways coaching for each student with three different career professionals, called Career Pathways Champions (CPCs).', formControlName: 'interestedPrograms3'},
        { option:'Foundational Year - Lean-3+', hoverText: 'Lean 3+ includes the above plus peer leadership development.', description: 'Lean-3+ includes career pathways coaching for each student with three different career professionals, called Career Pathways Champions (CPCs), and includes Ambassadorship, peer leadership development to support the Partner Support Liaison.', formControlName: 'interestedPrograms4'},
        { option:'Foundational Year - Full', hoverText: 'Full includes all from Lean 3+ plus a SPEAKHIRE Chapter Club.', description:  'Full includes career pathways coaching for each student with three different career professionals, called Career Pathways Champions (CPCs), Ambassadorship, peer leadership development to support the Partner Support Liaison, and the SPEAKHIRE Chapter Club.', formControlName: 'interestedPrograms5'},
        { option:'Leadership and Empowerment (L&E) Course', hoverText: 'LE Course - Ten leadership workshops.', description:  'L&E - Ten 2-hour workshops around inclusive and collaborative leadership development using a case study based approach highlighting real narratives of diverse career professionals.', formControlName: 'interestedPrograms6'},
        { option:'SPEAKHIRE Seminars', hoverText: 'Seminars - Career skills based Seminars with live professionals.', description:  'SPEAKHIRE Seminars - 45 minute long presentations by one of our Champions on professional development topics. Each presentation is for 20 - 30 students maximum, with 20 recommended for optimal results.', formControlName: 'interestedPrograms7'},
        { option:'Career Day', hoverText: 'Career Day - Personalized Career Day for your audience.', description: 'Career Day - Customized Career Day with our Champions for your needs. Can include panels, key notes, presenters and more...', formControlName: 'interestedPrograms8'},
        { option:'I would like more information', hoverText: 'Try to select a program you are interested in!', description: 'I would like more information.', formControlName: 'interestedPrograms9'},
    ];
    checkboxGroup: FormGroup;
    submittedValue: any;
    subscription: Subscription;
    // multistep!: FormGroup;
    partnerInformationStep: FormGroup;
    adminInformationStep: FormGroup;
    mailingAddressInformationStep: FormGroup;
    primarySupportLiasonInformationStep: FormGroup;
    secondarySupportLiasonInformationStep: FormGroup;
    profileInformationStep: FormGroup;
    demographicInformationStep: FormGroup;
    speakhirePrograms1InformationStep: FormGroup;
    speakhirePrograms2InformationStep: FormGroup;
    getToKnowYouInformationStep: FormGroup;
    activeStepper: boolean = true;
    stepper2active: boolean = false;
    ifAdminPronounsActive: boolean = false;
    ifProfilePronounsActive: boolean = false;
    ifPrimaryPronounsActive: boolean = false;
    ifSecondaryPronounsActive: boolean = false;
    principalChecked: boolean = false;
    isMailDiff: boolean = false;
    isPrimarySupport: boolean = false;
    isSecondarySupport: boolean = false;
    config: any = registerPartnerConfig;
    ifnothearAboutusActive: boolean = false;
    isSpeakhireProgramSelected: boolean = false;
    hoverData: string;
    fyYearSelectedActive: boolean = false;
    yfYearFullSelectedActive: boolean = false;
    [key: string]: any;
    ifSpeakHireFYSelected: boolean = false;
    isCheckedAtLeastOne: boolean = false;
    ifSpeakHireFYFullSelected: boolean = false;
    checkboxDatas: Array<string> = [];

    constructor(private cd: ChangeDetectorRef, private registerPartnerService: RegisterPartnerService, private fb: FormBuilder) { }

    ngOnInit() {
        this.partnerInformationStep = new FormGroup({
            partnerName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            partnerLocation: new FormControl('', Validators.required),
            partner_streetAddress: new FormControl('', [Validators.required, Validators.minLength(2)]),
            partner_city: new FormControl('', [Validators.required, Validators.minLength(2)]),
            partner_state: new FormControl('', [Validators.required, Validators.minLength(2)]),
            partner_zipcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
            partner_phoneCode: new FormControl('', Validators.required),
            partner_phone_number: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
            partner_pNumberExtension: new FormControl(''),
            partner_country: new FormControl('', Validators.required),
        })

        this.adminInformationStep = new FormGroup({
            confirmPrincipal: new FormControl(''),
            adminFname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            adminLname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            adminJobTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
            adminForm_of_contact: new FormControl('', Validators.required),
            adminGender: new FormControl('', Validators.required),
            adminPNumberCode: new FormControl('', Validators.required),
            adminPNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
            adminpPNumberExtension: new FormControl(''),
            adminPreferred_pronouns: new FormControl('', [Validators.required, Validators.minLength(3)]),
            adminOtherPronouns: new FormControl('',),
            adminEmail: new FormControl(null, [Validators.required, Validators.email]),
        })

        this.mailingAddressInformationStep = new FormGroup({
            confirmMailingAddress: new FormControl(''),
            streetAddress: new FormControl('', [Validators.required, Validators.minLength(2)]),
            city: new FormControl('', [Validators.required, Validators.minLength(2)]),
            state: new FormControl('', [Validators.required, Validators.minLength(2)]),
            zipcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
            country: new FormControl('', Validators.required),
        })
        this.primarySupportLiasonInformationStep = new FormGroup({
            confirmPrimarySuport: new FormControl(''),
            primarySuportFname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            primarySuportLname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            primarySuportJobTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
            primarySuportForm_of_contact: new FormControl('', Validators.required),
            primarySuportGender: new FormControl('', Validators.required),
            primarySuportPNumberCode: new FormControl(''),
            primarySuportPNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
            primarySuportPNumberExtension: new FormControl(''),
            primarySuportPreferred_pronouns: new FormControl('', [Validators.required, Validators.minLength(3)]),
            primaryOtherPronouns: new FormControl('',),
            primarySuportEmail: new FormControl(null, [Validators.required, Validators.email]),
        })
        this.secondarySupportLiasonInformationStep = new FormGroup({
            confirmSecondarySuport: new FormControl(''),
            secondarySuportFname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            secondarySuportLname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            secondarySuportJobTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
            secondarySuportForm_of_contact: new FormControl('', Validators.required),
            secondarySuportGender: new FormControl('', Validators.required),
            secondarySuportPNumberCode: new FormControl(''),
            secondarySuportPNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
            secondarySuportPNumberExtension: new FormControl(''),
            secondarySuportPreferred_pronouns: new FormControl('', [Validators.required, Validators.minLength(3)]),
            secondaryOtherPronouns: new FormControl('',),
            secondarySuportEmail: new FormControl(null, [Validators.required, Validators.email]),
        })
        this.profileInformationStep = new FormGroup({

            fname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            lname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            jobTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
            form_of_contact: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            pNumberCode: new FormControl(''),
            pNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
            pNumberExtension: new FormControl(''),
            preferred_pronouns: new FormControl('', [Validators.required, Validators.minLength(3)]),
            other_pronouns: new FormControl('',),
            email: new FormControl(null, [Validators.required, Validators.email]),

        })
        this.demographicInformationStep = new FormGroup({
            totalPopulationServed: new FormControl('', Validators.required),
            percentageOfLowIncome: new FormControl('', Validators.required),
            genderBreakdown: new FormControl('', [Validators.required]),
            percentageOfEllMll: new FormControl('', Validators.required),
            languageNeeds: new FormControl('', Validators.required),
            percentageOfMinority: new FormControl('', [Validators.required]),
            ethnicBreakdown: new FormControl('', [Validators.required]),
            districtNetworkContact: new FormControl(''),

        })


        this.speakhirePrograms1InformationStep = new FormGroup({
            fyStudentConsideration: new FormControl(''),
            fyFullChapterActivities: new FormControl(''),
            checkboxes: this.fb.array(this.checkboxes.map(x => false), Validators.required)
        })

        const checkboxControl = (this.speakhirePrograms1InformationStep.controls.checkboxes as FormArray);
        this.subscription = checkboxControl.valueChanges.subscribe(checkbox => {
          checkboxControl.setValue(
            checkboxControl.value.map((value: any, i: any) => value ? this.checkboxes[i].description : false),
            { emitEvent: false }
          );
          this.checkboxDatas = checkboxControl.value.filter((val: any)=>val !== false)
      });

        this.speakhirePrograms2InformationStep = new FormGroup({

            programFunds: new FormControl('', Validators.required),
            philadelphiaPartnerships: new FormControl(''),
            advisoryPeriodBool: new FormControl('', [Validators.required]),
            iUnderstand: new FormControl('', Validators.required),

        })
        this.getToKnowYouInformationStep = new FormGroup({
            personInterests: new FormControl('', Validators.required),
            howToSupportYou: new FormControl('', Validators.required),
            howToHelpStudents: new FormControl('', Validators.required),
            howToHelpPartner: new FormControl('', [Validators.required]),
            hearAboutUs: new FormControl('', Validators.required),
            ifnothearAboutus: new FormControl(''),
            questionsComments: new FormControl(''),
        })

        this.getToKnowYouInformationStep?.get('hearAboutUs')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifnothearAboutusActive = true;
            } else {
                this.ifnothearAboutusActive = false;
            }
        })
        this.adminInformationStep?.get('adminPreferred_pronouns')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifAdminPronounsActive = true;
            } else {
                this.ifAdminPronounsActive = false;
            }
        })
        this.primarySupportLiasonInformationStep?.get('primarySuportPreferred_pronouns')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifPrimaryPronounsActive = true;
            } else {
                this.ifPrimaryPronounsActive = false;
            }
        })
        this.secondarySupportLiasonInformationStep?.get('secondarySuportPreferred_pronouns')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifSecondaryPronounsActive = true;
            } else {
                this.ifSecondaryPronounsActive = false;
            }
        })
        this.secondarySupportLiasonInformationStep?.get('secondarySuportPreferred_pronouns')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifSecondaryPronounsActive = true;
            } else {
                this.ifSecondaryPronounsActive = false;
            }
        })
        this.profileInformationStep?.get('preferred_pronouns')?.valueChanges.subscribe(res => {
            if (res === 'Other') {
                this.ifProfilePronounsActive = true;
            } else {
                this.ifProfilePronounsActive = false;
            }
        })

    }

    // submitPartner() {
    //     this.registerPartnerService.getPartner(this.multistep.value).subscribe(res => {
    //         console.log(res)
    //     },
    //         err => {
    //             console.log(err)
    //             //show the errors here 
    //         })
    // }

    // partnerInformation
    get partnerName() { return this.partnerInformationStep?.get('partnerName'); }
    get partnerLocation() { return this.partnerInformationStep?.get('partnerLocation'); }
    get partner_streetAddress() { return this.partnerInformationStep?.get('partner_streetAddress'); }
    get partner_city() { return this.partnerInformationStep?.get('partner_city'); }
    get partner_state() { return this.partnerInformationStep?.get('partner_state'); }
    get partner_zipcode() { return this.partnerInformationStep?.get('partner_zipcode'); }
    get partner_phoneCode() { return this.partnerInformationStep?.get('partner_phoneCode'); }
    get partner_phone_number() { return this.partnerInformationStep?.get('partner_phone_number'); }
    get partner_pNumberExtension() { return this.partnerInformationStep?.get('partner_pNumberExtension'); }
    get partner_country() { return this.partnerInformationStep?.get('partner_country'); }

    // adminInformation
    get confirmPrincipal() { return this.adminInformationStep?.get('confirmPrincipal'); }
    get adminFname() { return this.adminInformationStep?.get('adminFname'); }
    get adminLname() { return this.adminInformationStep?.get('adminLname'); }
    get adminJobTitle() { return this.adminInformationStep?.get('adminJobTitle'); }
    get adminForm_of_contact() { return this.adminInformationStep?.get('adminForm_of_contact'); }
    get adminGender() { return this.adminInformationStep?.get('adminGender'); }
    get adminPNumberCode() { return this.adminInformationStep?.get('adminPNumberCode'); }
    get adminPNumber() { return this.adminInformationStep?.get('adminPNumber'); }
    get adminpPNumberExtension() { return this.adminInformationStep?.get('adminpPNumberExtension'); }
    get adminPreferred_pronouns() { return this.adminInformationStep?.get('adminPreferred_pronouns'); }
    get adminOtherPronouns() { return this.adminInformationStep?.get('adminOtherPronouns'); }
    get adminEmail() { return this.adminInformationStep?.get('adminEmail'); }

    // mailingAddressInformation
    get confirmMailingAddress() { return this.mailingAddressInformationStep?.get('confirmMailingAddress'); }
    get streetAddress() { return this.mailingAddressInformationStep?.get('streetAddress'); }
    get city() { return this.mailingAddressInformationStep?.get('city'); }
    get state() { return this.mailingAddressInformationStep?.get('state'); }
    get zipcode() { return this.mailingAddressInformationStep?.get('zipcode'); }
    get country() { return this.mailingAddressInformationStep?.get('country'); }

    // primarySupportLiasonInformation
    get confirmPrimarySuport() { return this.primarySupportLiasonInformationStep?.get('confirmPrimarySuport'); }
    get primarySuportFname() { return this.primarySupportLiasonInformationStep?.get('primarySuportFname'); }
    get primarySuportLname() { return this.primarySupportLiasonInformationStep?.get('primarySuportLname'); }
    get primarySuportJobTitle() { return this.primarySupportLiasonInformationStep?.get('primarySuportJobTitle'); }
    get primarySuportForm_of_contact() { return this.primarySupportLiasonInformationStep?.get('primarySuportForm_of_contact'); }
    get primarySuportGender() { return this.primarySupportLiasonInformationStep?.get('primarySuportGender'); }
    get primarySuportPNumberCode() { return this.primarySupportLiasonInformationStep?.get('primarySuportPNumberCode'); }
    get primarySuportPNumber() { return this.primarySupportLiasonInformationStep?.get('primarySuportPNumber'); }
    get primarySuportPNumberExtension() { return this.primarySupportLiasonInformationStep?.get('primarySuportPNumberExtension'); }
    get primarySuportPreferred_pronouns() { return this.primarySupportLiasonInformationStep?.get('primarySuportPreferred_pronouns'); }
    get primaryOtherPronouns() { return this.primarySupportLiasonInformationStep?.get('primaryOtherPronouns'); }
    get primarySuportEmail() { return this.primarySupportLiasonInformationStep?.get('primarySuportEmail'); }

    // secondarySupportLiasonInformation
    get confirmSecondarySuport() { return this.secondarySupportLiasonInformationStep?.get('confirmSecondarySuport'); }
    get secondarySuportFname() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportFname'); }
    get secondarySuportLname() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportLname'); }
    get secondarySuportJobTitle() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportJobTitle'); }
    get secondarySuportForm_of_contact() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportForm_of_contact'); }
    get secondarySuportGender() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportGender'); }
    get secondarySuportPNumberCode() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportPNumberCode'); }
    get secondarySuportPNumber() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportPNumber'); }
    get secondarySuportPNumberExtension() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportPNumberExtension'); }
    get secondarySuportPreferred_pronouns() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportPreferred_pronouns'); }
    get secondaryOtherPronouns() { return this.secondarySupportLiasonInformationStep?.get('secondaryOtherPronouns'); }
    get secondarySuportEmail() { return this.secondarySupportLiasonInformationStep?.get('secondarySuportEmail'); }

    // profileInformation
    get fname() { return this.profileInformationStep?.get('fname'); }
    get lname() { return this.profileInformationStep?.get('lname'); }
    get jobTitle() { return this.profileInformationStep?.get('jobTitle'); }
    get form_of_contact() { return this.profileInformationStep?.get('form_of_contact'); }
    get gender() { return this.profileInformationStep?.get('gender'); }
    get pNumberCode() { return this.profileInformationStep?.get('pNumberCode'); }
    get pNumber() { return this.profileInformationStep?.get('pNumber'); }
    get pNumberExtension() { return this.profileInformationStep?.get('pNumberExtension'); }
    get preferred_pronouns() { return this.profileInformationStep?.get('preferred_pronouns'); }
    get other_pronouns() { return this.profileInformationStep?.get('other_pronouns'); }
    get email() { return this.profileInformationStep?.get('email'); }

    // demographicInformation
    get totalPopulationServed() { return this.demographicInformationStep?.get('totalPopulationServed'); }
    get percentageOfLowIncome() { return this.demographicInformationStep?.get('percentageOfLowIncome'); }
    get genderBreakdown() { return this.demographicInformationStep?.get('genderBreakdown'); }
    get percentageOfEllMll() { return this.demographicInformationStep?.get('percentageOfEllMll'); }
    get languageNeeds() { return this.demographicInformationStep?.get('languageNeeds'); }
    get percentageOfMinority() { return this.demographicInformationStep?.get('percentageOfMinority'); }
    get ethnicBreakdown() { return this.demographicInformationStep?.get('ethnicBreakdown'); }
    get districtNetworkContact() { return this.demographicInformationStep?.get('districtNetworkContact'); }

    // speakhirePrograms1
    get interestedPrograms() { return this.speakhirePrograms1InformationStep?.get('interestedProgram'); }
    get fyStudentConsideration() { return this.speakhirePrograms1InformationStep?.get('fyStudentConsideration'); }
    get fyFullChapterActivities() { return this.speakhirePrograms1InformationStep?.get('fyFullChapterActivities'); }

    // speakhirePrograms2

    get programFunds() { return this.speakhirePrograms2InformationStep?.get('programFunds'); }
    get philadelphiaPartnerships() { return this.speakhirePrograms2InformationStep?.get('philadelphiaPartnerships'); }
    get advisoryPeriodBool() { return this.speakhirePrograms2InformationStep?.get('advisoryPeriodBool'); }
    get iUnderstand() { return this.speakhirePrograms2InformationStep?.get('iUnderstand'); }

    // getToKnowYou
    get personInterests() { return this.getToKnowYouInformationStep?.get('personInterests'); }
    get howToSupportYou() { return this.getToKnowYouInformationStep?.get('howToSupportYou'); }
    get howToHelpStudents() { return this.getToKnowYouInformationStep?.get('howToHelpStudents'); }
    get howToHelpPartner() { return this.getToKnowYouInformationStep?.get('howToHelpPartner'); }
    get hearAboutUs() { return this.getToKnowYouInformationStep?.get('hearAboutUs'); }
    get ifnothearAboutus() { return this.getToKnowYouInformationStep?.get('ifnothearAboutus'); }
    get questionsComments() { return this.getToKnowYouInformationStep?.get('questionsComments'); }

    checkboxChanged(event: any) {
        this.principalChecked = event.checked
    }

    differentMail(event: any) {
        this.isMailDiff = event.checked
    }

    validate(form: string, check?: boolean) {
        const checkbox = this.speakhirePrograms1InformationStep.controls.checkboxes.value.every((val: boolean)=>!val)
        this.isCheckedAtLeastOne = !checkbox
        if ((form === "profileInformationStep") && check) {
            return false
        } else if (form === 'mailingAddressInformationStep' && !this.isMailDiff) {
            return true
        } else if (form === 'primarySupportLiasonInformationStep' && !this.isPrimarySupport) {
            return true
        } else if (form === 'secondarySupportLiasonInformationStep' && !this.isSecondarySupport) {
            return true
        } else if (form === 'speakhirePrograms1Step' && !this.isSpeakhireProgramSelected) {
            return true
        } else if (form === 'speakhirePrograms1InformationStep' && checkbox) {
            return false
        }
        for (const field in this[form]?.value) { // 'field' is a string
            if (!this[form]?.get(field)?.valid) {
                return false
            }
        }
        return true
    }

    checkStepper(toggleFlag: boolean) {
        if (toggleFlag) {
            this.activeStepper = true;
            this.stepper2active = true;
        } else {
            this.activeStepper = false;
            this.stepper2active = false;
        }
    }

    checkIfPrimarySupport(event: any) {
        this.isPrimarySupport = event.checked
        // if(this.isPrimarySupport){
        //     this.multistep?.patchValue({
        //         primarySuportFname: this.adminFname?.value,
        //         primarySuportLname: this.adminLname?.value,
        //         primarySuportJobTitle: this.adminJobTitle?.value,
        //         primarySuportForm_of_contact: this.adminForm_of_contact?.value,
        //         primarySuportGender: this.adminGender?.value,
        //         primarySuportPNumber: this.adminPNumber?.value,
        //         primarySuportPNumberExtension: this.adminpPNumberExtension?.value,
        //         primarySuportPreferred_pronouns: this.adminPreferred_pronouns?.value,
        //         primarySuportEmail: this.adminEmail?.value
        //     })
        // } else {
        //     this.multistep?.reset()
        // }
    }

    checkIfSecondarySupport(event: any) {
        this.isSecondarySupport = event.checked
        // if(this.isSecondarySupport){
        //     this.multistep?.patchValue({
        //         secondarySuportFname: this.adminFname?.value,
        //         secondarySuportLname: this.adminLname?.value,
        //         secondarySuportJobTitle: this.adminJobTitle?.value,
        //         secondarySuportForm_of_contact: this.adminForm_of_contact?.value,
        //         secondarySuportGender: this.adminGender?.value,
        //         secondarySuportPNumber: this.adminPNumber?.value,
        //         secondarySuportPNumberExtension: this.adminpPNumberExtension?.value,
        //         secondarySuportPreferred_pronouns: this.adminPreferred_pronouns?.value,
        //         secondarySuportEmail: this.adminEmail?.value
        //     })
        // } else {
        //     this.multistep?.reset()
        // }
    }

    checkIfSpeakhireProgram(event: any) {
        this.isSecondarySupport = event.checked
    }

    showErrors(form: string) {
        for (const field in this[form]?.value) {
            if (!this[form]?.get(field)?.touched && this[form]?.get(field)?.invalid) {
                this[form]?.get(field)?.markAllAsTouched()
            }
        }
        return true
    }

    checkIfProgramsChecked() {

    }

    mouseOverRow(hoverText: any) {
        this.hoverData = hoverText
    }

    mouseLeaveRow() {
        this.hoverData = ''
    }

    onCheckboxChange(e: any) {
        const interestedProgram: FormArray = this.speakhirePrograms1InformationStep?.get('interestedProgram') as FormArray;

        if (e.target.checked) {
            interestedProgram.push(new FormControl(e.target.value));
        } else {
            let i: number = 0;
            interestedProgram.controls.forEach((item) => {
                if (item.value == e.target.value) {
                    interestedProgram.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }
}