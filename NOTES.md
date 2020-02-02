# Step 1. Review

Ran out of time to do too much on this. No test data was supplied so I didn't run it.

1. Could certainly do with some code formatting and a few comments on key logic.

1. Why is `FROM` not configurable (in `credentials`, say)?

1. Twilio is quite flexible with phone number formats - why insist on integers?

1. Related, the caught exception is too generic. At the very least it should be `ValueError` but I think it should be caught at its source and thrown with a custom message.

1. I've no idea what "Mason code" is :-)

1. I'm curious about the need for `flush()`. If anything, isn't it more critcal on `csrf`? (Or is only STDOUT buffered?)

1. No checks on the response code - the message is always added to `SentList`, regardless. Should ideally be able to distinguish between permanent and temporary errors (e.g., "rate limit exceeded"). Obviously, a "full" solution would be able to query the API to check status, etc, but I don't think that copes with all cases.

# Step 2. Code

See code! Notes in README.md

# Step 3a. Database

Not much time but initial thoughts:

1. Create message.
2. Map customer to message (either all, via group, or individually).
3. Start send process, log.

I didn't quite understand what "re-use phone numbers" is.

## Group (`group`)

-    `id` PK
-    `name`

## Customer (`cust`)

1-N with group. Could also do N-N, perhaps.

-    `id` PK
-    `group.id` FK
-    `name` Maybe given/family/title, etc.
-    `phone` unique (when canonical)
-    `active` (boolean)
-    `cr_date`
-    ...other meta

## Message (`message`)

-    `id` PK
-    `message`
-    `cr_date`

## Customer Message (`custmessage`)

N-N with `cust`/`message`, but unique.

-    `id` PK
-    `cust.id` FK
-    `message.id` FK
-    `unique(cust.id, message.id)`

I might be tempted to de-normalize the schema by adding the "last status" columns here. Depends on the breaks.

## Customer Message Log

1-N with `custmessage`

-    `id` PK
-    `custmessage.id` FK
-    `cr_date`
-    `{twilio response meta}`

I feel a cheeky correlated sub-query coming on... (Can Django ORM do that in a single shot?)

# Step 3b. Deploy

My initial thought is that this is an extremely low usage app so a serverless infrastructure would seem the most cost effective for running costs so that's what I'll talk about. Dev/DevOps time I can't comment on.

All AWS (as that's what I know)

-    AWS Incognito (can federate if needed).
-    CloudFront
-    S3 for static assets (UI, etc)
-    Serverless backend. Either Lambda or Fargate (latter seems overkill)
-    State via RDS
-    SSM for secrets
-    CloudWatch, obvs.
