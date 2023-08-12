import { RequestInterceptor, getLocale } from 'ask-sdk-core';
import i18n, { TFunction } from 'i18next';
import FsBackend, { FsBackendOptions } from 'i18next-fs-backend';
import { HandlerInputWithTranslation } from '../i18n/customTypes/Types';
import { join } from 'path';

export class LocalizationInterceptor implements RequestInterceptor {
    process(handlerInput: HandlerInputWithTranslation): Promise<void> {
        return i18n
            .use(FsBackend)
            .init<FsBackendOptions>({
                lng: getLocale(handlerInput.requestEnvelope),
                fallbackLng: 'en-US',
                backend: {
                    loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
                },
            })
            .then((t: TFunction) => {
                handlerInput.t = (...args) => t(...args);
            });
    }
}
