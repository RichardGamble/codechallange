# Steps to Run Project

The following steps will you get started in installing and running the application.

## Build Database

### Create DB

  1. Create a database in SSMS named EmployeeDB.
  
### Create Tables and Populate

  1. Run the CreateEmployeeDbScript.sql script found here: [DB Script](https://github.com/RichardGamble/codechallenge/blob/master/CreateEmployeeDbScript.sql).
  2. Run the EFMigrationsInsertScript.sql script found here: [EF Migration Script](https://github.com/RichardGamble/codechallenge/blob/master/EFMigrationsInsertScript.sql).
  
## API

### Build WebAPI Solution

  1. Download WebAPI and open project from Visual Studio
  2. Build the Project to generate the solution
  3. Verify connection string is pointing to the database created in previous step
  4. Run WebAPI

## Client

### Run WebAPI Client

  1. Download the WebAPI.Client 
  2. Using VS Code open the folder
  3. Open terminal in VS code and run **npm install** 
  4. After client project has been installed, run **npm start**

## Done

  You should be good to go to start using application.
