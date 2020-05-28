import { pubsub } from '../../../../app'
import { withFilter } from 'apollo-server';
import { ContextInterface } from '../../../../../Shared/middleware/middleware'
export let ${LOWERCASE_MODEL_NAME} = {
    subscribe: withFilter(
        () => pubsub.asyncIterator('${LOWERCASE_MODEL_NAME}'),
        (payload, variables, {request}: ContextInterface) => {
            //Use middleware to return true only if the new message.account matches the account id of the user
            return true
        },
    ) 
}
