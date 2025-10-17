import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { SQSClient, ListQueuesCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { z } from "zod";

const endpoint = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";
const region = process.env.AWS_REGION || "us-east-1";
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
};

const s3 = new S3Client({ endpoint, region, credentials, forcePathStyle: true });
const sqs = new SQSClient({ endpoint, region, credentials });
const dynamodb = new DynamoDBClient({ endpoint, region, credentials });

const server = new Server(
  { name: "aws-localstack", version: "0.1.0" },
  { capabilities: { tools: {} } },
  new StdioServerTransport()
);

server.tool(
  "s3_list_buckets",
  {
    description: "List S3 buckets in LocalStack",
    inputSchema: z.object({}),
  },
  async () => {
    const res = await s3.send(new ListBucketsCommand({}));
    const buckets = (res.Buckets || []).map((b) => b.Name);
    return { content: [{ type: "text", text: JSON.stringify({ buckets }, null, 2) }] };
  }
);

server.tool(
  "s3_put_object",
  {
    description: "Put an object into S3",
    inputSchema: z.object({
      bucket: z.string(),
      key: z.string(),
      body: z.string(),
      contentType: z.string().optional(),
    }),
  },
  async ({ bucket, key, body, contentType }) => {
    await s3.send(
      new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType })
    );
    return { content: [{ type: "text", text: `PutObject ok: s3://${bucket}/${key}` }] };
  }
);

server.tool(
  "s3_get_object",
  {
    description: "Get an object from S3",
    inputSchema: z.object({ bucket: z.string(), key: z.string() }),
  },
  async ({ bucket, key }) => {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const stream = res.Body;
    const text = await streamToString(stream);
    return { content: [{ type: "text", text }] };
  }
);

server.tool(
  "sqs_list_queues",
  {
    description: "List SQS queues",
    inputSchema: z.object({}),
  },
  async () => {
    const res = await sqs.send(new ListQueuesCommand({}));
    return { content: [{ type: "text", text: JSON.stringify({ queueUrls: res.QueueUrls || [] }, null, 2) }] };
  }
);

server.tool(
  "sqs_send_message",
  {
    description: "Send a message to an SQS queue",
    inputSchema: z.object({ queueUrl: z.string(), messageBody: z.string() }),
  },
  async ({ queueUrl, messageBody }) => {
    const res = await sqs.send(new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: messageBody }));
    return { content: [{ type: "text", text: JSON.stringify({ messageId: res.MessageId }, null, 2) }] };
  }
);

server.tool(
  "dynamodb_list_tables",
  {
    description: "List DynamoDB tables",
    inputSchema: z.object({}),
  },
  async () => {
    const res = await dynamodb.send(new ListTablesCommand({}));
    return { content: [{ type: "text", text: JSON.stringify({ tableNames: res.TableNames || [] }, null, 2) }] };
  }
);

await server.connect();

async function streamToString(stream) {
  if (typeof stream?.transformToString === "function") {
    return await stream.transformToString();
  }
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}
