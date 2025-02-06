export const table = new sst.aws.Dynamo("ConnectionTable", {
    fields: {
        connectionId: "string",
    },
    primaryIndex: { hashKey: "connectionId" }
})
