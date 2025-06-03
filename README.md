AWS Serverless Job Tracker App
Track your job applications, referral status, and progress — securely and efficiently — with a fully serverless cloud-native architecture.

Architecture Diagram and Flow: 
![Arch ](https://github.com/user-attachments/assets/ca574540-eb28-4cb9-a0db-88c3b7bd4cff)

![Home](https://github.com/user-attachments/assets/cfbc1112-f6de-41eb-8f6d-79b4feb512ef)

🎯 Objective:

Managing job applications and their statuses can become overwhelming, especially when applying to numerous companies. This project addresses that challenge by providing a centralized portal to:

Log applications
Update status and referral information
Delete or edit entries as needed

This solution leverages modern AWS serverless services to provide a secure, scalable, and cost-efficient experience.

🏗️ Architecture Overview

This app is built entirely on AWS’s serverless stack and consists of the following key components:

⚙️ Core Flow:
Frontend (React.js)
A responsive UI allowing users to interact with job data (Create, Read, Update, Delete)

Deployed using AWS CloudFront for global delivery and fast load times
Authentication (Amazon Cognito)
Handles secure sign-up and login
Provides JWT tokens to verify user identity and authorize API requests

API Layer (Amazon API Gateway)
Exposes secure REST endpoints for frontend interaction
Validates JWT tokens and routes requests to Lambda functions

Business Logic (AWS Lambda)
Stateless backend logic for all CRUD operations
Written in Node.js with the AWS SDK and connected to DynamoDB

Database (Amazon DynamoDB)
NoSQL database to store job entries (jobId, name, appliedDate, status, referral, etc.)
Designed for fast lookups and scalability

🛠️ AWS Services Used
Service	Purpose
Cognito	User sign-up/login, token-based auth (JWT)
API Gateway	Serves as the interface for the frontend to access backend functions
Lambda	Executes business logic for Create, Read, Update, Delete operations
DynamoDB	Stores job application data in a scalable NoSQL table
CloudFront	Distributes the static frontend globally with low latency
S3 (optional)	For frontend hosting if not using Vercel or other services

🚀 How to Run the App
✅ Deployed Version:
The app is hosted using CloudFront. Owner can access it at:

🔗 https://d3stgb1bbo1aaq.cloudfront.net

👤 Access:
Once the app loads, sign up or log in using your email (handled by Cognito).

After login, the portal displays your job applications.

Use the interface to:

Add a new job entry
Edit/update an application
Delete entries if needed

All operations are secured and user-scoped using Cognito’s JWT tokens and verified by API Gateway.

🔍 Problem This Solves
Tracking job applications across different portals is chaotic.
Many students and professionals use spreadsheets or notes to manage this. This app replaces the need for manual entry systems with a robust, cloud-native job tracking portal.

It offers:

🔒 Secure access via login
✍️ Easy form-based job logging
🗂️ Real-time updates with DynamoDB
💨 Low-latency performance via CloudFront

![Jobsection](https://github.com/user-attachments/assets/4c97cfab-4e9e-4836-b502-d9b74ff62928)


🔮 Upcoming Features / Improvements
✅ Multi-user database isolation using Cognito-sub-based partitioning in DynamoDB
✅ Pagination and filtering to better manage large job lists




🧑‍💻 Tech Stack
Frontend: React.js, TailwindCSS (optional), Vite
Backend: Node.js on AWS Lambda
Database: DynamoDB (NoSQL)
Auth: Amazon Cognito (JWT Token-based)
Hosting: CloudFront + API Gateway + Lambda

🙌 Acknowledgments
This project was inspired by a real-world problem faced during internship application cycles. The architecture and flow were refined from AWS best practices and enhanced beyond common tutorials for production-readiness.
