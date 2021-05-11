Dependencies

To Install this project you first need these libraries and executables:

Node.JS and NPM
Git 
Yarn
MongoDB
VSCode (or a comparable IDE)


Install and Run
After installing these components, git-clone our repo, open it in an IDE and from the CMD type yarn in the root directory. This should install all of the dependencies in the root folder. Now type cd nuxt to go to the nuxt component and type yarn. This will install all of the yarn dependencies.

Now you need to run 2 commands.

From the nuxt directory in your CMD type yarn dev. Now open a new CMD, go to the root of the project and type yarn start-dev. This will start the backend and the front-end. 

Open a browser and navigate to localhost:3000. Please be sure to wait for initialization to complete if window does not show yet. Also make sure to install MongoDB.

User Guide

On the page you should be able to sign up setting the fields. After signing up you can login with your sign up details. Then from the documents page click the + button to open a new document. You can save this document by click the save button. You can also remove a document by clicking the remove button.


Run Client API Tests
 
To run my tests navigate to the nuxt directory and type  yarn test. You should see the results of the test after it completes.

Run Storybook Tests

To run my storybook tests navigate to the nuxt directory and type yarn storybook. This should open a window showing you UI Tests.


Code Location
 My code is located in 
nuxt/pages and nuxt/services/clientAPI.ts

Test code is located at nuxt/test and nuxt/stories
