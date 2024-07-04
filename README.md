## Overview
This is an Application that I am developing for my business. I run a private music studio and this app will help me create student portfolios, update and delete them.
This app can serve other types of users as well. You can create a user, store specific info about each user, update the info of each user.

## Refactor 
Initially, I used a MySQL database for this project. The database was hosted on PlanetScale's free tier. After one year, my free subscription ended, so I decided instead of paying a monthly fee to host my personal projects, to move the tables to Vercel Storage/Databases. So, I wrote my table with Prisma. However, since Vercel only accepts PostgreSQL and not MySQL, I had to make minor adjustments to the tables. Currently, both my user authentication and authorization tables and data tables are hosted on Vercel. The application is deployed on Vercel too.

## Setup
1. clone the repo
2. create a .env file similar to the .env.example file in the project root.
3. npm install
4. Set up Prisma:
   - Make sure you have Prisma installed globally or as a dev dependency in your project (npm install -D @prisma/cli).
   - If you haven't already initialized Prisma in your project, you can do so by running npx prisma init. This command will create the necessary Prisma configuration files.
   - Define your database schema in the schema.prisma file. Define models for Users, Members, and Notes, along with their respective fields and relationships.
   - Once your schema is defined, you can generate the Prisma client by running npx prisma generate.
   - To create the database tables based on your schema, run npx prisma migrate dev. This command will create a migration with the changes needed to synchronize your database schema with your - Prisma schema. Then, it applies the migration to your database.
   - Verify that the tables for Users, Members, and Notes have been created in your database.
   - creat one-to-many realationship between the Member table and the Note table.
5. npm run dev

## Issues:
No issues at the moment.

## Improvements:
   ## Features:
   1. Add the feature to take multiple notes for each member.
   2. add the ability to edit the member details such as first name last name.
   3. add the ability to upload pdf docs for each member. => add a db table, create the API endpoint, create the page. 
   ## UI/UX:
   1. Add padding for mobile view.
   2. Address style inconsistencies such as button colors, curosr: pointer, button appearnance.
   3. Make each member row clickable eather than having a button to view more details about each user. 
 
## Built with
React.
NextJS.
TypeScript.
Prisma & PostgreSQL.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
