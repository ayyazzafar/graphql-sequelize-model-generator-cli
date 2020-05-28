import gql from "graphql-tag";

export const typeDef = gql`

  extend type Query{
    ${LOWERCASE_MODEL_NAME}:[${MODEL_NAME}]
  }

  extend type Subscription{
    ${LOWERCASE_MODEL_NAME}:  ${MODEL_NAME}Payload
  }

  type ${MODEL_NAME}Payload {
    action: String!
    data: ${MODEL_NAME}! 
  }

  type ${MODEL_NAME} {
    id: ID,
    createdAt: String
    updatedAt: String
  }

`;

