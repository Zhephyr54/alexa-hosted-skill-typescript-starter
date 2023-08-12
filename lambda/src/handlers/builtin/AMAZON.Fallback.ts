import { RequestHandler } from 'ask-sdk-core';
import { HandlerInputWithTranslation } from '../../i18n/customTypes/Types';
import { Response } from 'ask-sdk-model';

export class BuiltinAmazonFallbackHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInputWithTranslation): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.FallbackIntent'
        );
    }

    handle(handlerInput: HandlerInputWithTranslation): Response {
        const speechText = handlerInput.t('fallbackResponse');
        const repromptSpeechText = handlerInput.t('fallbackReprompt');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptSpeechText)
            .getResponse();
    }
}
