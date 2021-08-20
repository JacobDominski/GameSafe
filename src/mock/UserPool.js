import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_eEzxcdrX3",
  ClientId: "3s4jpcqmmsqbv652qff74vk2ng",
}

export default new CognitoUserPool(poolData);