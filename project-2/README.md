# TO DO
## Description
This is the second portfolio project of the SideHustle Bootcamp Cohort 6.0

It consists of the following
features:
- User Sign Up
- User Sign In
- Add Todo
- Get all Todo
- Get a specific Todo
- Update a Todo
- Delete a Todo
## Contribution Guidelines
1. Fork the project to your own repository
2. Clone the the project into your local computer
3. Create a remote url called upstream to point to the main project
>`git remote add upstream https://github.com/Rahdeg/crudeapi.git`
3. Switch to the development branch of the project
> `git checkout development`
4. Create a new branch to work on your features
 >`git checkout feature-branch`
5. Create a .env file and fill in the following variables to use the database:
  * DB_HOST=hostname e.g localhost
  * DB_USER=user e.g root
  * DB_PASSWORD=password
  * DB_NAME=nameofdatabasetouse

6. Initialize your database with the following command
>`npm run initDB`
7. Once you have finished implementing your feature, commit your changes, switch back to the development branch and merge your feature branch
>`git checkout development`

>`git merge feature-branch`
8. Pull changes from the upstream(the main repository you forked from).If there are conflicts, resolve them.
 >`git pull upstream development`
9. Once step 9 is done, push to your forked repository.
 `git push origin development`
10. Make a pull request to the development branch and request for a review
11. Wait for your pull request to be merged or receive a feedback