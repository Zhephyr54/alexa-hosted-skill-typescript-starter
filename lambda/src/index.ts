import * as Alexa from 'ask-sdk-core';

import { LaunchHandler } from './handlers/Launch';
import { BuiltinAmazonCancelHandler } from './handlers/builtin/AMAZON.Cancel';
import { BuiltinAmazonHelpHandler } from './handlers/builtin/AMAZON.Help';
import { BuiltinAmazonStopHandler } from './handlers/builtin/AMAZON.Stop';
import { BuiltinAmazonFallbackHandler } from './handlers/builtin/AMAZON.Fallback';
import { SessionEndedHandler } from './handlers/SessionEndedRequest';
import { HelloWorldHandler } from './handlers/HelloWorld';

import { CustomErrorHandler } from './handlers/Error';

import { LocalizationInterceptor } from './interceptors/LocalizationInterceptor';
import { ResponseLoggingInterceptor } from './interceptors/ResponseLoggingInterceptor';

function buildLambdaSkill(): Alexa.LambdaHandler {
    const skillBuilder = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
            new LaunchHandler(),
            new BuiltinAmazonCancelHandler(),
            new BuiltinAmazonHelpHandler(),
            new BuiltinAmazonStopHandler(),
            new BuiltinAmazonFallbackHandler(),
            new SessionEndedHandler(),
            new HelloWorldHandler(),
        )
        .addErrorHandlers(new CustomErrorHandler())
        .addRequestInterceptors(new LocalizationInterceptor());

    if (process.env.NODE_ENV === 'development') {
        console.log('DEVELOPMENT MODE');
        skillBuilder.addResponseInterceptors(new ResponseLoggingInterceptor());
    }

    return skillBuilder.lambda();
}

export const handler = buildLambdaSkill();
