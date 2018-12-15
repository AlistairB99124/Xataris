import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import * as _ from 'lodash';
import { SimpleResult } from '../../Scrabble/scrabble.models';

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    resetForm: FormGroup;
    resetFormErrors: any;
    resetConfirmForm: FormGroup;
    resetConfirmErrors: any;
    rememberMe: boolean;
    forgotPassword: boolean;
    isResetForm: boolean;
    token: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private translationLoader: FuseTranslationLoaderService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        public snackBar: MatSnackBar,
        private apiService: ApiService
    )
    {
        this.translationLoader.loadTranslations(english, afrikaans);
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
        this.resetFormErrors = {
            email: {}
        };
        this.resetConfirmErrors = {
            email: {},
            password: {},
            confirmPassword: {}
        };
        this.forgotPassword = false;
        this.isResetForm = false;
    }

    toggleForgotPassword(){
        this.forgotPassword = !this.forgotPassword;
    }

    resetPassword(){
        this.apiService.post('User/ForgotPassword', this.resetForm.value).then((res: SimpleResult) => {
            if (res.isSuccess) {
                this.resetForm.reset();
                this.forgotPassword = false;
            }
        });
    }

    login(){
        const input = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
            rememberMe: this.rememberMe
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

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
        this.resetForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]]
        });

        this.resetForm.valueChanges.subscribe(() => {
            this.onResetFormValuesChanged();
        });
        this.resetConfirmForm = this.formBuilder.group({
            email   : [''],
            password: [''],
            confirmPassword: ['']
        });
        this.resetConfirmForm.valueChanges.subscribe(() => {
            this.onConfirmResetFormValuesChanged();
        });
        this.route.params.subscribe(params => {
            if (params['token'] === null || params['token'] === undefined) {
                this.isResetForm = false;
            } else {
                this.isResetForm = true;
            }
        });
    }

    onConfirmResetFormValuesChanged(){
        for ( const field in this.resetConfirmErrors )
        {
            if ( !this.resetConfirmErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.resetConfirmErrors[field] = {};

            // Get the control
            const control = this.resetConfirmForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.resetConfirmErrors[field] = control.errors;
            }
        }
    }

    resetPasswordConfirm(){
            const input = {
                email: this.resetConfirmForm.controls.email.value,
                password: this.resetConfirmForm.controls.password.value,
                confirmPassword: this.resetConfirmForm.controls.confirmPassword.value
            };
            if (input.password !== input.confirmPassword) {
                return;
            }
            this.apiService.post('User/ResetPassword', input).then((res: SimpleResult) => {
                if (res.isSuccess) {
                    this.resetConfirmForm.reset();
                    this.forgotPassword = false;
                    this.isResetForm = false;
                }
            });
    }

    onResetFormValuesChanged(){
        for ( const field in this.resetFormErrors )
        {
            if ( !this.resetFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.resetFormErrors[field] = {};

            // Get the control
            const control = this.resetForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.resetFormErrors[field] = control.errors;
            }
        }
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
