# LT Showcase

Hello and welcome to my showcase. I hope you have a good time. I ran afoul of time an angry girlfriend was wondering why I was still cloistered away in the office this evening, so didn't quite get to all I wanted to, but I hope I have submitted something worthwhile all the same.

# How to evaluate

The application is live at 

https://dl0arth2h8hvs.cloudfront.net

for your viewing pleasure!

# Key Features.
1. Server-first data fetching pattern and display in a next-gen frontend.
2. Search functionality for photos (on the "title" key).
3. Zen quote of the day delivered to the application every minute on the minute and displayed in a toast (and logged in console) via Websocket.

# Key technical points:
1. Domain-driven design ("/core' directory and "services" to keep business logic separate) to make code organized and scalable.
2. Full stack type safety with Typescript.
3. AWS infrastructure spun up with SST, infrastructure as code.
4. Next-gen frontend with React+NextJS and Tailwind.
5. Integration test suite
6. AWS components used: AWS Lambda for serverless API and to host Next.js application, EventBridge to make cron job for zen quote feature, ApiGateway for websocket connection, DynamoDB to store connectionIds, and sensible secrets management /w S3 (SST handles that for you, encyrpting the secrets and putting them in a bucket).

# Stretch Goals, not quite achieved
1. Github action to lint, typecheck, test, then deploy code. Almost made it!
2. Image optimization. I wanted to do a second-pass to get these images loading in faster.
3. E2E test suite. I wanted to use Playwright to do a series of automated tests on different browsers.
4. Mobile compatibility.

# Thanks for viewing!
