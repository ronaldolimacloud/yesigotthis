const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const ddb = new DynamoDBClient({ region: 'ap-southeast-2' });

exports.handler = async (event) => {
    try {
        const { type, topic, status, contentLevel } = event.queryStringParameters || {};
        
        let filterExpression = [];
        let expressionAttributeValues = {};
        let expressionAttributeNames = {};

        if (type) {
            filterExpression.push('#type = :type');
            expressionAttributeValues[':type'] = type;
            expressionAttributeNames['#type'] = 'type';
        }

        if (topic) {
            filterExpression.push('topic = :topic');
            expressionAttributeValues[':topic'] = topic;
        }

        if (status) {
            filterExpression.push('status = :status');
            expressionAttributeValues[':status'] = status;
        }

        if (contentLevel) {
            filterExpression.push('contentLevel = :contentLevel');
            expressionAttributeValues[':contentLevel'] = contentLevel;
        }

        const command = new ScanCommand({
            TableName: 'yesigotthis-content',
            FilterExpression: filterExpression.length > 0 ? filterExpression.join(' AND ') : undefined,
            ExpressionAttributeValues: Object.keys(expressionAttributeValues).length > 0 ? 
                marshall(expressionAttributeValues) : undefined,
            ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ?
                expressionAttributeNames : undefined
        });

        const response = await ddb.send(command);
        const items = response.Items.map(item => unmarshall(item));

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(items)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};