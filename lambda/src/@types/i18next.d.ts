import 'i18next';
import translation from '../locales/en-US/translation.json';

/*
Adding type-safe translations to i18next. 
https://www.i18next.com/overview/typescript
*/

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            translation: typeof translation;
        };
    }
}
