import { ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { HandlerInputWithTranslation } from '../i18n/customTypes/Types';

export class CustomErrorHandler implements ErrorHandler {
    canHandle(): boolean {
        return true;
    }

    handle(handlerInput: HandlerInputWithTranslation, error: Error): Response {
        const request = handlerInput.requestEnvelope.request;
        const speechText = handlerInput.t('errorResponse');
        const repromptSpeechText = handlerInput.t('errorReprompt');

        console.log(`Error handled: ${error.message}`);
        console.log(
            `Original Request was: ${JSON.stringify(request, null, 2)}`,
        );

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptSpeechText)
            .getResponse();
    }
}
