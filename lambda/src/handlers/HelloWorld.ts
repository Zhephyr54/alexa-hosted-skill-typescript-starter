import { RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { HandlerInputWithTranslation } from '../i18n/customTypes/Types';

export class HelloWorldHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInputWithTranslation): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' &&
            request.intent.name === 'HelloWorldIntent'
        );
    }

    handle(handlerInput: HandlerInputWithTranslation): Response {
        const speechText = handlerInput.t('helloWorld');
        const cardTitle = handlerInput.t('simpleCardTitle');

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(cardTitle, speechText)
            .getResponse();
    }
}
