import { FormGroup } from '@angular/forms';

export interface LoginViewModel {
    token: string;
    loginForm: FormGroup;
    loginFormErrors: any;
    resetForm: FormGroup;
    resetFormErrors: any;
    resetConfirmForm: FormGroup;
    resetConfirmErrors: any;
    rememberMe: boolean;
    forgotPassword: boolean;
    isResetForm: boolean;
}
