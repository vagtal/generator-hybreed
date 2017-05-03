import {_, Marionette} from '~/src/vendor/libs';
import Template from './<%= name %>.html'

export default Marionette.<%= type %>.extend({

    template: _.template(Template),

    ui: {

    },

    className: '<%= name %>',

    onRender(){

    }

    onAttach() {
	
    }
});
