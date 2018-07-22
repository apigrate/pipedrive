# pipedrive
A Node Pipedrive API connector library.

This library has minimal dependencies and makes use of ES6 native promises. 

Currently it supports Manual apps only. OAuth support will be coming soon.

## Installation and Usage

Install.
```javascript
npm install @apigrate/pipedrive
```

Configure.
```javascript
var Pipedrive = require('@apigrate/pipedrive');

var pipedrive = new Pipedrive(your_domain, your_api_token);
```

Use.
```javascript
pipedrive.findOrganizations('Test Company')
.then(function(result){
  //result --> see https://pipedrive.readme.io/docs/core-api-concepts-responses
})
.catch(function(err){
  //The libary returns a subclass of Error that includes both:
  // err.message containing the summary error message and...
  // err.payload which contains the error response specified at --> https://pipedrive.readme.io/docs/core-api-concepts-responses
});
```

## API Behavior

Pipedrive provides very good documentation on both the [overall behavior of their API](https://pipedrive.readme.io/docs/core-api-concepts-about-pipedrive-api) and [specific API documentation](https://developers.pipedrive.com/docs/api/v1).

A few points are worth emphasizing:

### when updating entities
* Pipedrive supports **sparse updates**; omitting a property does not change data on the property. Thus, you only need to pass properties you want to change.
* setting a property to `null` on a property will clear it. For example, setting `{ address: null }` when updating an organization will clear the address on the organization.

### when retrieving entities by id
The Pipedrive API returns a status code 404 error. This is a REST convention, but for ease-of-use, the connector handles the error and returns a null in the promise payload. This allows you to perform a simple empty check instead of dedicating a catch function for error handling a "not found" case.

## Currently Supported Methods
* Deals
  * findDeals
  * getAllDeals
  * getDeal
  * addDeal
  * updateDeal
  * deleteDeal
* DealFields
  * getAllDealFields
  * getDealField
  * addDealField
  * updateDealField
  * deleteDealField
* Organizations
  * findOrganizations
  * getAllOrganizations
  * getOrganization
  * addOrganization
  * updateOrganization
  * deleteOrganization
  * getOrganizationPersons
  * getOrganizationFiles
* OrganizationFields
  * getAllOrganizationFields
  * getOrganizationField
  * addOrganizationField
  * updateOrganizationField
  * deleteOrganizationField
* Persons
  * findPersons
  * getAllPersons
  * getPerson
  * addPerson
  * updatePerson
  * deletePerson
* PersonFields
  * getAllPersonFields
  * getPersonField
  * addPersonField
  * updatePersonField
  * deletePersonField
* Webhooks
  * getAllWebhooks
  * addWebhook
  * deleteWebhook
