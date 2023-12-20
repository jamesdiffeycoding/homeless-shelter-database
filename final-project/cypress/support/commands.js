// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getByData", (selector)=> {
    return cy.get (`[data-test=${selector}]`)
  });


  Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    // cy.contains('email').type(username);
  
    cy.get('input[name=email]').type(username)
  
    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`, { log: false })
  
    // we should be redirected to /dashboard
    cy.url().should('include', '/')
  
    // our auth cookie should be present
    cy.getCookie('your-session-cookie')  
    // .should('exist')
  
    // UI should reflect this user being logged in
    // cy.get('h1').should('contain', username)
  })
  

// // cypress/support/commands.js
// import { createClient } from '@supabase/supabase-js';

// Cypress.Commands.add('signInDashboard', (redirectPath = '/') => {
//   // Check if required environment variables are defined
//   const supabaseUrl = Cypress.env('SUPABASE_URL');
//   const supabaseAnonKey = Cypress.env('SUPABASE_ANON_KEY');

// //   if (!supabaseUrl || !supabaseAnonKey) {
// //     throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env variable');
// //   }

//   const credentials = {
//     email: 'mdjasimrchowdhury@gmail.com', // Replace with your actual email
//     password: '123456',      // Replace with your actual password
//   };

//   cy.session([credentials.email, credentials.password], () => {
//     cy.log(`Signing in with ${credentials.email}`);
//     signInProgrammatically(credentials, supabaseUrl, supabaseAnonKey);
//   });

//   cy.visit(redirectPath);
// });

// function getClient(url, key) {
//   return createClient(url, key);
// }

// function signInProgrammatically(credentials, supabaseUrl, supabaseAnonKey) {
//   const { email, password } = credentials;

//   const client = getClient(supabaseUrl, supabaseAnonKey);

//   return client.auth
//     .signIn({
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.error) {
//         return Promise.reject(response.error.message);
//       }
//     })
//     .catch((e) => {
//       console.error(e);
//       return Promise.reject(e);
//     });
// }


