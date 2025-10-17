# MCP Server for LocalStack (AWS Emulator)

This MCP server exposes simple tools for S3, SQS, and DynamoDB against a LocalStack instance.

## Run LocalStack
- Dev compose: `docker-compose -f infra/docker/docker-compose.dev.yml up -d localstack`
- Prod compose: `docker-compose -f infra/docker/docker-compose.yml up -d localstack`

## Install and run MCP server
```
npm install --prefix tools/mcp-localstack
npm run start --prefix tools/mcp-localstack
```

Environment variables (optional):
- `AWS_ENDPOINT_URL` (default: http://localhost:4566)
- `AWS_REGION` (default: us-east-1)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (default: test/test)

## Claude Desktop configuration (example)
Create or edit `~/Library/Application Support/Claude/mcp.json`:
```
{
  "mcpServers": {
    "aws-localstack": {
      "command": "npm",
      "args": ["run", "start", "--prefix", "{REPO_PATH}/tools/mcp-localstack"],
      "env": {
        "AWS_ENDPOINT_URL": "http://localhost:4566",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```
Replace `{REPO_PATH}` with the absolute path to this repository.

## Tools
- `s3_list_buckets()`
- `s3_put_object(bucket, key, body, contentType?)`
- `s3_get_object(bucket, key)`
- `sqs_list_queues()`
- `sqs_send_message(queueUrl, messageBody)`
- `dynamodb_list_tables()`
