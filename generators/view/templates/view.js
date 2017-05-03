import {_, Marionette} from '~/src/vendor/libs';
import Template from './<%= name %>.html';
<% if(type == "View"){ %>
export default Marionette.View.extend({

    template: _.template(Template),

    ui: {

    },

    className: '<%= name %>-container',

    events: {

    },

    triggers: {

    },

    onRender(){

    },

    onAttach() {

    }
});
<% } else { %>
import <%= childName %>Template from './<%= childName %>.html';

var ChildView = Marionette.View.extend({

    template: _.template(<%= childName %>Template),

    tagName: '',

    className: '<%= childName %>-container',

    ui: {

    },

    events: {

    },

    triggers: {

    },

    onRender(){

    },

    onAttach() {

    }
});

export default Marionette.CollectionView.extend({

    template: _.template(Template),

    tagName: '',

    className: '<%= name %>-container',

    childView: ChildView,

    ui: {

    },

    events: {

    },

    triggers: {

    },

    onRender(){

    },

    onAttach() {

    }
});
<% } %>
