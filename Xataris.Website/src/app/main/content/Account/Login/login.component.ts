import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { locale as fr } from './i18n/fr';
import * as _ from 'lodash';
import { SimpleResult } from '../../Scrabble/scrabble.models';
import { LoginViewModel } from './login.models';

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    data: LoginViewModel;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private translationLoader: FuseTranslationLoaderService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        public snackBar: MatSnackBar,
        private apiService: ApiService
    ) {
        this.data = {} as LoginViewModel;
        this.translationLoader.loadTranslations(en, af, fr);
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.data.loginFormErrors = {
            email   : {},
            password: {}
        };
        this.data.resetFormErrors = {
            email: {}
        };
        this.data.resetConfirmErrors = {
            email: {},
            password: {},
            confirmPassword: {}
        };
        this.data.forgotPassword = false;
        this.data.isResetForm = false;
        this.data.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
        this.data.resetForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]]
        });
        this.data.resetConfirmForm = this.formBuilder.group({
            email   : [''],
            password: [''],
            confirmPassword: ['']
        });
     }

    toggleForgotPassword(){
        this.data.forgotPassword = !this.data.forgotPassword;
    }

    public resetPassword = () => {
        const input = _.cloneDeep(this.data.resetConfirmForm.value);
        input.token = this.data.token;
        this.apiService.post('User/ForgotPassword', input).then((res: SimpleResult) => {
            if (res.isSuccess) {
                this.data.resetForm.reset();
                this.data.forgotPassword = false;
            }
        });
    }

    public login(){
        const input = {
            email: this.data.loginForm.value.email,
            password: this.data.loginForm.value.password,
            rememberMe: this.data.rememberMe
        };
        this.apiService.post('User/Login', input).then((res: SimpleResult) => {
          if (res.isSuccess){
              localStorage.setItem('userId', res.id.toString());
              this.router.navigate(['PTM/MyTimesheet']);
          } else {
            this.translateService.get(res.error).subscribe(result => {
                this.snackBar.open(result, '', { duration: 5000 });
            });
          }
        });
    }

    public async ngOnInit()
    {
        await this.data.loginForm.valueChanges.subscribe();
        await this.data.resetForm.valueChanges.subscribe();
        await this.data.resetConfirmForm.valueChanges.subscribe();
        await this.onLoginFormValuesChanged();
        await this.onResetFormValuesChanged();
        await this.onConfirmResetFormValuesChanged();
        this.route.params.subscribe((params) => {
            if (params.token === null || params.token === undefined) {
                this.data.isResetForm = false;
            } else {
                this.data.token = params.token;
                this.data.isResetForm = true;
            }
        });
    }

    public async onConfirmResetFormValuesChanged(){
        for ( const field in this.data.resetConfirmErrors )
        {
            if ( !this.data.resetConfirmErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.data.resetConfirmErrors[field] = {};

            // Get the control
            const control = this.data.resetConfirmForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.data.resetConfirmErrors[field] = control.errors;
            }
        }
    }

    resetPasswordConfirm(){
            const input = {
                email: this.data.resetConfirmForm.controls.email.value,
                password: this.data.resetConfirmForm.controls.password.value,
                confirmPassword: this.data.resetConfirmForm.controls.confirmPassword.value,
                token: this.data.token
            };
            if (input.password !== input.confirmPassword) {
                return;
            }
            this.apiService.post('User/ResetPassword', input).then((res: SimpleResult) => {
                if (res.isSuccess) {
                    this.data.resetConfirmForm.reset();
                    this.data.forgotPassword = false;
                    this.data.isResetForm = false;
                }
            });
    }

    public async onResetFormValuesChanged(){
        for ( const field in this.data.resetFormErrors )
        {
            if ( !this.data.resetFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.data.resetFormErrors[field] = {};

            // Get the control
            const control = this.data.resetForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.data.resetFormErrors[field] = control.errors;
            }
        }
    }

    public async onLoginFormValuesChanged()
    {
        for ( const field in this.data.loginFormErrors )
        {
            if ( !this.data.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.data.loginFormErrors[field] = {};

            // Get the control
            const control = this.data.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.data.loginFormErrors[field] = control.errors;
            }
        }
    }
}
