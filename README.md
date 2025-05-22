# Fleet Card (Bobtail)



**Description:**

This project contains the code for the automation of the FleetCard(Bobtail). The main objective of the code is to automate the whole regression testing checkist and E2E test cases This file will contain all the info related to automated test cases, how to run the code, and reports generated after running the code.

**Folder Structure:**

We have used the **Page Object Model(POM)** to achieve this task. So following is the description of the files:

**commandsHomePage.JS**: This file contains all the functions and their definitions. 

**locators.JS:** This file contains all the XPATH or locators which were required to complete the test cases.

**Adminflow.JS:** This file contains all the test cases and calling of functions.

**testdata.json:** All the testing data will be placed here  


**How to run the code:**

Run this command in the terminal:
```
npm run open
```

We have stored command to run the code in “open” variable in package.json file. That’s why this command is required to run the code.

**Note:** If xpath is not installed in your system then you will need to run the following command first before running the code: 
```
npm install -D cypress-xpath
```

**Test Cases:**

Following test cases are automated in this code:

**Login to the app:**
In this test case, we will enter the email and password of the user and click on the continue button, further validations are pending 


**Reports:**

To generate the reports, We have used mochawesome. This provides the complete report of the test cases after running them. To generate the reports, run the following commands:
```
npx cypress run --config-file cypress.config.js
```

Note: First make changes in cypress.config.json and give the directory path of your system in the reportDir variable so that cypress can save the report in your local directory.




















