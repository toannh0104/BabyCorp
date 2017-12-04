var redux = require ('redux');
import reducer from './reducers/index';

var store = redux.createStore(reducer);

module.exports = store;