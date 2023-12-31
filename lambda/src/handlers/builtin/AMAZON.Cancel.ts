import { RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { HandlerInputWithTranslation } from '../../i18n/customTypes/Types';

export class BuiltinAmazonCancelHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInputWithTranslation): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.CancelIntent'
        );
    }

    handle(handlerInput: HandlerInputWithTranslation): Response {
        const speechText = handlerInput.t('cancelResponse');

        return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
}
