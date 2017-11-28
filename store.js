var redux = require ('redux');
import reducer from './reducers/index.js';

var store = redux.createStore(reducer);

module.exports = store;