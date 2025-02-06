import {
    awsLambdaRequestHandler,
  } from "@trpc/server/adapters/aws-lambda";
  import { appRouter } from "../root";
  
  export const handler = awsLambdaRequestHandler({
    router: appRouter,
    onError: ({ path, error }) => {
          console.error(
            `❌ server failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
  });
  