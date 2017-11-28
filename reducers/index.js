var redux = require ('redux');
import mang from './mang.js';
import isAdding from './isAdding.js';

var reducer = redux.combineReducers({mang, isAdding});

module.exports = reducer;