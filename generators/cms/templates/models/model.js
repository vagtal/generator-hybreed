const <%= name.charAt(0).toUpperCase() + name.slice(1); %> = Backbone.Model.extend({

    urlRoot: '',

    defaults: {
    }
});

const <%= name.charAt(0).toUpperCase() + name.slice(1); %>s = Backbone.Collection.extend({

    model: <%= name.charAt(0).toUpperCase() + name.slice(1); %>,

    url: ''
});

var <%= name %>s = null;

function get<%= name.charAt(0).toUpperCase() + name.slice(1); %>sCollection() {

    var deferred = $.Deferred();

    if(<%= name %>s) {

        deferred.resolve(<%= name %>s);

    } else {

        var temp<%= name.charAt(0).toUpperCase() + name.slice(1); %>s = new <%= name.charAt(0).toUpperCase() + name.slice(1); %>s();

        temp<%= name.charAt(0).toUpperCase() + name.slice(1); %>s.fetch()
            .then(() => {
                <%= name %>s = temp<%= name.charAt(0).toUpperCase() + name.slice(1); %>s;
                deferred.resolve(<%= name %>s);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

function save<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>) {

    var deferred = $.Deferred();

    <%= name %>.save()
        .then(() => {
            <%= name %>s.add(<%= name %>); //It will be ignore if it was already added
            deferred.resolve();
        })
        .fail((e) => {
            deferred.reject(e)
        });

    return deferred.promise();
}

function delete<%= name.charAt(0).toUpperCase() + name.slice(1); %>(<%= name %>) {
    return <%= name %>.destroy(); //It will be also deleted from the collection
}

function getEmpty<%= name.charAt(0).toUpperCase() + name.slice(1); %>() {
    return new <%= name.charAt(0).toUpperCase() + name.slice(1); %>();
}

export default {
    get<%= name.charAt(0).toUpperCase() + name.slice(1); %>sCollection,
    save<%= name.charAt(0).toUpperCase() + name.slice(1); %>,
    delete<%= name.charAt(0).toUpperCase() + name.slice(1); %>,
    getEmpty<%= name.charAt(0).toUpperCase() + name.slice(1); %>
};
