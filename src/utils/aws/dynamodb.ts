import { DynamoDBClient, PutItemCommand, QueryCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const ddbClient = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export interface Content {
  id: string;
  type: 'video' | 'article' | 'audio';
  title: string;
  description: string;
  s3Key: string;
  thumbnailKey?: string;
  topic: string;
  contentLevel: 'beginner' | 'intermediate' | 'advanced';
  mediaType: string;
  tags: string[];
  duration?: number;
  viewCount: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export async function saveContent(content: Content) {
  const now = new Date().toISOString();
  const contentWithTimestamps = {
    ...content,
    createdAt: content.createdAt || now,
    updatedAt: now
  };

  const command = new PutItemCommand({
    TableName: 'yesigotthis-content',
    Item: marshall(contentWithTimestamps, {
      removeUndefinedValues: true
    }),
  });

  try {
    await ddbClient.send(command);
    return contentWithTimestamps;
  } catch (error) {
    console.error('Error saving to DynamoDB:', error);
    throw error;
  }
}

export async function getContentByType(type: string) {
  const command = new QueryCommand({
    TableName: 'yesigotthis-content',
    IndexName: 'type-createdAt-index',
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type',
    },
    ExpressionAttributeValues: marshall({
      ':type': type,
    }),
    ScanIndexForward: false, // Get newest first
  });

  try {
    const response = await ddbClient.send(command);
    return response.Items?.map(item => unmarshall(item) as Content) || [];
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    throw error;
  }
}

export async function getContentByTopic(topic: string) {
  const command = new QueryCommand({
    TableName: 'yesigotthis-content',
    IndexName: 'topic-index',
    KeyConditionExpression: 'topic = :topic',
    ExpressionAttributeValues: marshall({
      ':topic': topic,
    }),
    ScanIndexForward: false, // Get newest first
  });

  try {
    const response = await ddbClient.send(command);
    return response.Items?.map(item => unmarshall(item) as Content) || [];
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    throw error;
  }
}

export async function getContentById(id: string, type: string) {
  const command = new GetItemCommand({
    TableName: 'yesigotthis-content',
    Key: marshall({
      id,
      type
    }),
  });

  try {
    const response = await ddbClient.send(command);
    return response.Item ? unmarshall(response.Item) as Content : null;
  } catch (error) {
    console.error('Error getting item from DynamoDB:', error);
    throw error;
  }
} 