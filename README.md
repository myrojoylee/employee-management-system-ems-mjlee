# EMS - Employee Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description:

This work is an introduction to databases and management systems that have been created to handle data. A relational database is a type of database management system that stores data in tables with columns and points that are related to each other. This is the basis for modern database systems like MySQL which utilize the Structured Query Language (SQL) to perform CRUD operations. CRUD (Create, Read, Update, Delete) describes the four basic functions of the modern web application.

This Employee Management System (EMS) uses Inquirer to allow the user to enter employee data as well as information about their salaries, departments, and roles within this fictional company. The dotenv package introduced us to storing sensitive information into environment variables for use in the application.

## Installation:

- This is a [Node.js](https://nodejs.org/en) application. It is recommended to use at least v16 (up to v18) for this app to run correctly.
- MySQL is required for this app to run, so follow directions outlined [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) for a step-by-step guide depending on your operating system.

Please type the following in the terminal of your project folder in order to run the application smoothly:

- `npm i inquirer@8.2.4`
  - [Inquirer v8.2.4](https://www.npmjs.com/package/inquirer) is needed to begin user prompts.
- `npm i mysql2`
  - [MySQL2](https://www.npmjs.com/package/mysql2) is needed to connect the app to the MySQL database.
- `npm i figlet`
  - [figlet](https://www.npmjs.com/package/figlet) was used to render ASCII art at the beginning of the application.
- `npm i table`
  - [table](https://www.npmjs.com/package/table) was used to create formatted data tables.

## Usage:

- Navigate to `index.js`. Type in `node index` in the terminal once in the project directory and answer the prompts. The video below shows the full functionality of the app by showing the menus and different tables based on responses to each prompt. Find the video [here](https://drive.google.com/file/d/1msmCTMjxuWFmIr7T_WULStI8PzuOV_dM/view?usp=sharing) if the video does not play.


https://github.com/myrojoylee/employee-management-system-ems-mjlee/assets/120980593/657acfb7-ea59-4701-b3ed-c46a74e37789


## Sources/Credits:

- Information about relational databases was sourced from [Oracle](https://www.oracle.com/database/what-is-a-relational-database/#:~:text=A%20relational%20database%20is%20a,of%20representing%20data%20in%20tables.).

- More information about MySQL can be found in the docs [here](https://dev.mysql.com/doc/).

## License:

- Refer to the license in the repository.
