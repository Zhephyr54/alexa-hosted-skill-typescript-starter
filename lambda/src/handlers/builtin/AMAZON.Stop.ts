import { RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { HandlerInputWithTranslation } from '../../i18n/customTypes/Types';

export class BuiltinAmazonStopHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInputWithTranslation): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.StopIntent'
        );
    }

    handle(handlerInput: HandlerInputWithTranslation): Response {
        const speechText = handlerInput.t('stopResponse');

        return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
}
