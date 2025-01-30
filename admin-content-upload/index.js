const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({ region: 'ap-southeast-2' });
const BUCKET_NAME = 'yesigotthis-media';

exports.handler = async (event) => {
   try {
       const { fileName, contentType } = JSON.parse(event.body);
       const key = `content/${contentType}/${Date.now()}-${fileName}`;
       
       const command = new PutObjectCommand({
           Bucket: BUCKET_NAME,
           Key: key,
           ContentType: contentType
       });
       
       const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
       
       return {
           statusCode: 200,
           headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*"
           },
           body: JSON.stringify({
               uploadUrl,
               key
           })
       };
   } catch (error) {
       console.error('Error:', error);
       return {
           statusCode: 500,
           body: JSON.stringify({ error: error.message })
       };
   }
};