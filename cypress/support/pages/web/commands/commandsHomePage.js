// ***********************************************
// This Commands Home Page.js shows the
// create various custom commands and overwrite
// existing commands.
// ***********************************************

import locators from '../locators.js';


// -- This is a Home Page command --
class homePage{
    login(){
        locators.enterLoginCredentials.email().type('fcbob90+2111@gmail.com');
        locators.enterLoginCredentials.password().type('fcTest@123')
        locators.enterLoginCredentials.continue().click({force:true});
    }
    
}

module.exports = new homePage();
