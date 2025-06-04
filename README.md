                                                                    AWS Serverless Job Tracker App
AWS Job Tracker helps you track your Jobs/Internships application and their statuses with ease. Built on top of AWS's popular services( Lambda, API Gateway, S3, AWS Cognito, DynamoDB, CloudFront) and React. 

![Home](https://github.com/user-attachments/assets/cfbc1112-f6de-41eb-8f6d-79b4feb512ef)

Demo Link (YouTube): https://www.youtube.com/watch?v=72-YyrL5o9s

Architecture Diagram and Flow: 
![Stuffs](https://github.com/user-attachments/assets/02127faf-6f86-40d4-a523-80241f627c7c)

What problem does it solve:

This project simplifies job application tracking by offering a centralized, serverless AWS-powered portal to log, update, and manage application statuses efficiently.

Service Overview:

Cognito – Handles user sign-up/login with JWT-based auth
API Gateway – Connects frontend to backend APIs
Lambda – Runs CRUD logic
DynamoDB – Stores job data in a NoSQL table
CloudFront – Delivers frontend globally with low latency
S3 – Hosts frontend static files 

Currently deployed in CLoudfront:
The app is hosted using CloudFront. Owner can access it at:
🔗 https://d3stgb1bbo1aaq.cloudfront.net

Access:
Once the app loads, sign up or log in using your email (handled by Cognito).
After login, the portal displays your job applications.
Use the interface to:
Add a new job entry
Edit/update an application
Delete entries if needed

All operations are secured and user-scoped using Cognito’s JWT tokens and verified by API Gateway.


![Jobsection](https://github.com/user-attachments/assets/4c97cfab-4e9e-4836-b502-d9b74ff62928)

Upcoming Features / Improvements
* Multi-user database isolation using Cognito-sub-based partitioning in DynamoDB
* Pagination and filtering to better manage large job lists

Tech Stack Used
Frontend: React.js (Vite)
Backend: Node.js on AWS Lambda
Database: DynamoDB (NoSQL)
Auth: Amazon Cognito (JWT Token-based)
Hosting: CloudFront + API Gateway + Lambda

#Acknowledgments
This project was inspired by a real-world problem faced during internship application cycles. The architecture and flow were refined from AWS best practices and enhanced beyond common tutorials for production-readiness.
