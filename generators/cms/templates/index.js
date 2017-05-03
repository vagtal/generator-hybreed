import <%= name.charAt(0).toUpperCase() + name.slice(1); %>s from './models/<%= name %>s';

function get<%= name.charAt(0).toUpperCase() + name.slice(1); %>sCollection() {
    return <%= name.charAt(0).toUpperCase() + name.slice(1); %>s.get<%= name.charAt(0).toUpperCase() + name.slice(1); %>sCollection();
}

function save<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>) {
    return <%= name.charAt(0).toUpperCase() + name.slice(1); %>s.save<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>);
}

function delete<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>) {
    return <%= name.charAt(0).toUpperCase() + name.slice(1); %>s.delete<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>);
}

function getEmpty<%= name.charAt(0).toUpperCase() + name.slice(1); %>() {
    return <%= name.charAt(0).toUpperCase() + name.slice(1); %>s.getEmpty<%= name.charAt(0).toUpperCase() + name.slice(1); %>();
}

//
// API
//

var API = {
    get<%= name.charAt(0).toUpperCase() + name.slice(1); %>sCollection,
    save<%= name.charAt(0).toUpperCase() + name.slice(1); %>,
    delete<%= name.charAt(0).toUpperCase() + name.slice(1); %>,
    getEmpty<%= name.charAt(0).toUpperCase() + name.slice(1); %>
};

Broker.channel('CMS').reply(API);
export default API;
