var request = require('request-promise-native');
class Pipedrive {
  constructor(domain, api_token, opts){
    this.domain = domain;
    this.api_token = api_token;
    this.opts = opts;
    this.base_request = request.defaults({
      baseUrl: `https://${domain}.pipedrive.com/v1`,
      qs: {
        api_token: api_token
      },
      json: true
    })
  }

  // deals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  findDeals(term, person_id, org_id){
    var qs = { term: term };
    if(person_id) qs.person_id = person_id;
    if(org_id) qs.org_id = org_id;
    return this.doGet(`/deals/find`, qs);
  }


  getAllDeals(qs){
    return this.doGet(`/deals`, qs);
  }


  getDeal(id){
    return this.doGet(`/deals/${id}`);
  }


  addDeal(deal){
    return this.doPost(`/deals`, deal);
  }


  updateDeal(id, deal){
    return this.doPut(`/deals/${id}`, deal);
  }


  deleteDeal(id){
    return this.doDelete(`/deals/${id}`);
  }

  // deal fields - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  getAllDealFields(){
    return this.doGet(`/dealFields/`);
  }


  getDealField(id){
    return this.doGet(`/dealFields/${id}`);
  }


  addDealField(field){
    return this.doPost(`/dealFields`, field);
  }


  updateDealField(field_id, field){
    return this.doPut(`/dealFields/${field_id}`, field);
  }


  deleteDealField(field_id){
    return this.doDelete(`/dealFields/${field_id}`);
  }

  // organization - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  findOrganizations(name, start, limit){
    var qs = { term: name };
    if(start) qs.start = start;
    if(limit) qs.limit = limit;
    return this.doGet(`/organizations/find`, qs);
  }


  getAllOrganizations(qs){
    return this.doGet(`/organizations/`, qs);
  }


  getOrganization(org_id){
    return this.doGet(`/organizations/${org_id}`);
  }


  addOrganization(org){
    return this.doPost(`/organizations`, org);
  }


  updateOrganization(org_id, org){
    return this.doPut(`/organizations/${org_id}`, org);
  }


  deleteOrganization(org_id){
    return this.doDelete(`/organizations/${org_id}`);
  }


  getOrganizationPersons(org_id, start, limit){
    var qs = {};
    if(start) qs.start = start;
    if(limit) qs.limit = limit;
    return this.doGet(`/organizations/${org_id}/persons`, qs);
  }


  getOrganizationFiles(org_id, start, limit, include_deleted_files, sort){
    var qs = {};
    if(start) qs.start = start;
    if(limit) qs.limit = limit;
    return this.doGet(`/organizations/${org_id}/files`, qs);
  }

  // organization fields - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  getAllOrganizationFields(){
    return this.doGet(`/organizationFields/`);
  }


  getOrganizationField(id){
    return this.doGet(`/organizationFields/${id}`);
  }


  addOrganizationField(field){
    return this.doPost(`/organizationFields`, field);
  }


  updateOrganizationField(field_id, field){
    return this.doPut(`/organizationFields/${field_id}`, field);
  }


  deleteOrganizationField(field_id){
    return this.doDelete(`/organizationFields/${field_id}`);
  }

  // persons - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  findPersons(term, org_id, search_by_email, start, limit){
    var qs = { term: term };
    if(org_id) qs.org_id = org_id;
    if(search_by_email) qs.search_by_email = search_by_email;
    if(start) qs.start = start;
    if(limit) qs.limit = limit;
    return this.doGet(`/persons/find`, qs);
  }


  getAllPersons(qs){
    return this.doGet(`/persons/`, qs);
  }


  getPerson(id){
    return this.doGet(`/persons/${id}`);
  }


  addPerson(person){
    return this.doPost(`/persons`, person);
  }


  updatePerson(id, person){
    return this.doPut(`/persons/${id}`, person);
  }


  deletePerson(id){
    return this.doDelete(`/persons/${id}`);
  }

  // person fields - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  getAllPersonFields(){
    return this.doGet(`/personFields/`);
  }


  getPersonField(id){
    return this.doGet(`/personFields/${id}`);
  }


  addPersonField(field){
    return this.doPost(`/personFields`, field);
  }


  updatePersonField(field_id, field){
    return this.doPut(`/personFields/${field_id}`, field);
  }


  deletePersonField(field_id){
    return this.doDelete(`/personFields/${field_id}`);
  }


  // webhooks - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  getAllWebhooks(){
    return this.doGet(`/webhooks/`);
  }


  addWebhook(webhook){
    return this.doPost(`/webhooks`, webhook);
  }


  deleteWebhook(id){
    return this.doDelete(`/webhooks/${id}`);
  }



  // generalized API call methods - - - - - - - - - - - - - - - - - - - - - - -

  doGet(uri, qs, opts){
    var self = this;
    return new Promise(function(resolve, reject) {
      var req = {
        method: 'GET',
        uri: uri
      };
      if(qs) req.qs = qs;
      self.base_request(req)
      .then(function(result){
        resolve(result);
      })
      .catch(handleError)
      .then(function(result){ resolve(result); })
      .catch(function(err){ reject(err); });
    });
  }

  doPost(uri, body, qs, opts){
    var self = this;
    return new Promise(function(resolve, reject) {
      var req = {
        method: 'POST',
        uri: uri,
        body: body
      };
      if(qs) req.qs = qs;
      self.base_request(req)
      .then(function(result){
        resolve(result);
      })
      .catch(handleError)
      .then(function(result){ resolve(result); })
      .catch(function(err){ reject(err); });
    });
  }

  doPut(uri, body, qs, opts){
    var self = this;
    return new Promise(function(resolve, reject) {
      var req = {
        method: 'PUT',
        uri: uri,
        body: body
      };
      if(qs) req.qs = qs;
      self.base_request(req)
      .then(function(result){
        resolve(result);
      })
      .catch(handleError)
      .then(function(result){ resolve(result); })
      .catch(function(err){ reject(err); });
    });
  }

  doDelete(uri, body, qs, opts){
    var self = this;
    return new Promise(function(resolve, reject) {
      var req = {
        method: 'DELETE',
        uri: uri
      };
      if(qs) req.qs = qs;
      self.base_request(req)
      .then(function(result){
        resolve(result);
      })
      .catch(handleError)
      .then(function(result){ resolve(result); })
      .catch(function(err){ reject(err); });
    });
  }

}//end class


function handleError(err){
  return new Promise(function(resolve, reject) {
    var message = err.message;
    if(err.statusCode
      && err.statusCode == 404
      && err.error.error
      && err.error.error.indexOf('not found') >= 0){
        resolve( null );//Not found returns a null.
    } else {
      var pde = new PipedriveError(err.message, err.error);
      reject(pde);
    }
  });
}

class PipedriveError extends Error{
  constructor(message, payload) {
    super(message);
    this.name = 'PipedriveError';
    this.payload = payload;
  }
}
module.exports=Pipedrive
