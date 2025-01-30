const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

const ddb = new DynamoDBClient({ region: 'ap-southeast-2' });

exports.handler = async (event) => {
    try {
        const content = JSON.parse(event.body);
        const timestamp = new Date().toISOString();
        
        const item = {
            id: content.id,
            type: content.type,
            title: content.title,
            description: content.description,
            url: content.s3Key,
            topic: content.topic,
            createdAt: timestamp,
            updatedAt: timestamp,
            status: content.status || 'draft',
            mediaType: content.mediaType,
            thumbnailUrl: content.thumbnailUrl || null,
            // New fields
            authorId: content.authorId || null,
            duration: content.duration || null,
            viewCount: 0,
            tags: content.tags || [],
            contentLevel: content.contentLevel || 'beginner',
            relatedContentIds: content.relatedContentIds || []
        };

        await ddb.send(new PutItemCommand({
            TableName: 'yesigotthis-content',
            Item: marshall(item)
        }));

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(item)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};