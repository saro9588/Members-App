## Overview

This is an Application that I am developing for my business. I run a private music studio and this app will help me create student portfolios, update and delete them.
This app can serve other types of users as well. You can create a user, store specific info about each user, update the info of each user.

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

1.  As I have been trying to implement the “edit note” functionality, I somehow broke another feature. The issue is that, once I create a new member for a user, then I proceed to creating a new note associated with the member I created earlier, the note is being created and stored in the database successfully (I am checking that by running queries in the back-end). However; I am getting a 404 page not found error when the domain is trying to render the newly created member note.

## Improvements

1. fix the above bug, then:
2. create and implement the edit Note functionality:
   I am trying to edit a notes taken previously. I will need a PATCH back-end http request API and in the front-end: axios.patch() function.

## Built with

React.
NextJS.
TypeScript.
Prisma & PostgreSQL.
MySql.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
