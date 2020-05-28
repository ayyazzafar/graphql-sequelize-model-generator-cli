
import { ContextInterface } from '../../../../../Shared/middleware/middleware';
import { ${MODEL_NAME} } from '../../../../../Shared/sequelize/models/${MODEL_NAME}';

export let ${LOWERCASE_MODEL_NAME}s = async (parent, params, context: ContextInterface, info) => {
    context.request.middleware.mustBeUser()
    let ${LOWERCASE_MODEL_NAME}s = await ${MODEL_NAME}.findAll();
    return ${LOWERCASE_MODEL_NAME}s;
}