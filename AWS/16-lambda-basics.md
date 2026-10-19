# Lambda Basics

A Lambda function consists of a handler (the entry point function), an event (input data triggering execution), and a context (runtime information). Functions are stateless and ephemeral—each invocation may run in a fresh environment, so persistent data must be stored externally (e.g., in S3 or DynamoDB). Lambda automatically scales by running multiple concurrent instances of a function as needed, and billing is based on number of requests and execution duration/memory used.
