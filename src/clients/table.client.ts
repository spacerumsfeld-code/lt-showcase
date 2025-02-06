import { DeleteItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

export const clearOldConnections = async () => {
  
    const command = new DeleteItemCommand({
        TableName: Resource.ConnectionTable.name,
        Key: { connectionId: { S: 'old-connection' } }
    });

    await dynamoClient.send(command);
}

export const addConnection = async (connectionId: string) => {
    const command = new PutItemCommand({
        TableName: Resource.ConnectionTable.name,
        Item: { connectionId: { S: connectionId } }
    });

    await dynamoClient.send(command);
}
export const getAllConnections = async (): Promise<string[]> => {
    try {
      const command = new ScanCommand({
        TableName: Resource.ConnectionTable.name,
        ProjectionExpression: 'connectionId'
      });

      const response = await dynamoClient.send(command);
      
      if (!response.Items) {
        return [];
      }

      return response.Items.map(item => {
        return item.connectionId?.S || '';
      }).filter(id => id !== '');
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  }

export const deleteAllConnections = async () => {
  try {
    // First get all connections
    const connections = await getAllConnections();
    
    // Delete each connection
    const deletePromises = connections.map(connectionId => {
      const command = new DeleteItemCommand({
        TableName: Resource.ConnectionTable.name,
        Key: { connectionId: { S: connectionId } }
      });
      return dynamoClient.send(command);
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting all connections:', error);
    throw error;
  }
}

export const deleteConnection = async (connectionId: string) => {
    const command = new DeleteItemCommand({
        TableName: Resource.ConnectionTable.name,
        Key: { connectionId: { S: connectionId } }
    });

    await dynamoClient.send(command);
}