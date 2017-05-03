import {Broker} from '~/src/vendor/libs';

var view;

function start(model) {
    showView(model);
}

function showView(model) {
    
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
