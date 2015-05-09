var assert = require('assert');
var ensureTargets = require('../').ensureTargets;

describe('Dirac Ensure Targets', function(){
  var schema = {
    id: { type: 'serial', primaryKey: true }
  , name: { type: 'text' }
  };

  it('insert', function(){
    var query = {
      type: 'insert'
    , table: 'users'
    , values: {
        name: 'Bill'
      , beep: 'boop'
      }
    };

    ensureTargets( query, schema );

    assert.equal( query.values.name, 'Bill' );
    assert.equal( query.values.beep, undefined );
  });

  it('insert multiple values', function(){
    var nameIdx = {
      0: 'Bill', 1: 'Bob', 2: 'Shelly'
    }

    var query = {
      type: 'insert'
    , table: 'users'
    , values: [ { name: nameIdx[0], beep: 'boop' }
              , { name: nameIdx[1], beep: 'boop' }
              , { name: nameIdx[2], beep: 'boop' }
              ]
    };

    ensureTargets( query, schema );

    query.values.forEach( function( value, i ){
      assert.equal( value.name, nameIdx[i] );
      assert.equal( value.beep, undefined );
    });
  });

  it('update', function(){
    var query = {
      type: 'update'
    , table: 'users'
    , updates: {
        name: 'Bill'
      , beep: 'boop'
      }
    };

    ensureTargets( query, schema );

    assert.equal( query.updates.name, 'Bill' );
    assert.equal( query.updates.beep, undefined );
  });
});