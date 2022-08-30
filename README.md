# FedExSignUp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Install Angular/cli

To install `angular/cli` we are using version `~14.2.0`, run
```shell
  npm install -g @angular/cli@~14.2.0
```

## Build the environment

```shell
  npm install
  ng build
```

## Build

After running `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io), you can also check [Angular Testing](https://angular.io/guide/testing)

# Structure

The project has been split into 2 major parts: shared and modules

## Shared

  the shared directory includes all the folders ***Enums, Models, Services*** that are deemed to be used by multiple components and the general of the application, it is worth noting that it contains constants, interfaces even regex-formats basically anything that is concidered immutable, or static and would not be changed by any component that might use it.
  
## Modules

The Modules usually contain all the major players of the application. the structure of the modules directory is built upon *lazy loading* and thus each stand alone part of the application will work seperatly and will load as such, the shared directory can be used by all these parts.

As for our application we only have one part called *Auth* uses the following structure:

    -Containers: or can be called pages, they hold the all the pages that will be rendered as a seperate page on our lazy loading route.
    -Components: all the sections are implemented here and called by the Containers.
    -Services: specific serves that will only be used by this part of the application
    -module file: loads all the modules and files that will be used in this container
    -routing module file: implements the lazy loading and adds the routes for the containers.
    
# Features

the project has *required requirements* and added *Extra Features* that have been implemented.

## Required Features:

### Build A Sign-Up form.

-The User enters: first name, last name, email, and password.

-All fields are required.

-Password validation:

    -Should be a minimum of eight characters,
    
    -Should contain lower and uppercase letters, 
    
    -Should not contain user’s first or last name
    
 -Basic Email Format Structure Validation
 
 -Send entered data as a POST request to https://demo-api.now.sh/users. following the schema provided
 
```shell
{
 firstName: "Thomas",
 lastName: "Shelby",
 email: "thomas@shelby.co.uk"
}
```

## Extra Features

### Application Level:

- Deployed the application on Netlify. [https://fed-ex-sign-up-form.netlify.app/](https://fed-ex-sign-up-form.netlify.app/).
- Deployed the application on GitHub. [https://github.com/Bloodlesss/fedex-test](https://github.com/Bloodlesss/fedex-test).
- Used [primeNg](https://www.primefaces.org/primeng) library that is built on angular material to be able to provide a wider variaty of choices in design.
- Added a loader to compensate the  gap in time between sending and recieving the HttpRequests.
- Added a Page that loads the returned result of the POST REQUEST to display the user his account credentials.
- Added Password strength tester to allow the user to know if his current password strong or not, while covering the basics.

### Technical Level:

- Added an API that validates if the email exists works and still alive or not and verifies its SMTP and MX records if on or not. **THIS API IS FREE AND CAN ONLY ALLOW 20 REQUESTS PER DAY**, after that the application will always consider the email invalid even if it is valid. [APILink](https://apilayer.com/marketplace/email_verification-api)
- Although the application is only one module Auth I have worked concidering that the app is gonna be recieving new and advanced features thus used **Lazy Loading** methodology. 
- Tests using Karma covering over 90% of all the cases in the application

### Future Plans

- Add dynamic language handling allowing the user to view the application with different languages.
- Add more tests to cover more of the scope of the application logic and design wise.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## OwnerShip

I do not own any of the images used in the app, this app is not designed to be used for commercial use and is only deployed for the specific purpose to fulfil FedEx Intreview Requirments.
