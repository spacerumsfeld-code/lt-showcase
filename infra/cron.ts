import { websocket } from "./websocket";
import { table } from "./dynamo";
import { allSecrets } from "./secret";

export const cron = new sst.aws.Cron("ZenQuoteCron", {
    schedule: "rate(1 minute)",
    function: {
      handler: "src/functions/cron.handler",
      link: [websocket, table, ...allSecrets]
    }
});