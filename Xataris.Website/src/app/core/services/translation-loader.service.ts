import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { resolveDefinition } from '@angular/core/src/view/util';

export interface Locale
{
    lang: string;
    data: Object;
}

@Injectable()
export class FuseTranslationLoaderService
{
    constructor(private translate: TranslateService)
    {
    }

    public loadTranslations(...args: Locale[]): void
    {
        const locales = [...args];

        locales.forEach((locale) => {
            this.translate.setTranslation(locale.lang, locale.data, true);
        });
    }

    public getTranslation = async (key: string) => this.translate.get(key).toPromise();
}
