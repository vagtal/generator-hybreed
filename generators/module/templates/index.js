import View from './views/<%= name %>'
import {Broker} from '~/src/vendor/libs';

var view;

function start(model) {
    showExampleView(model);
}

function showExampleView(model) {
    
}

//
// API
//

Broker.channel('<%= name %>').on({
    start
});

export default {
    start
};
