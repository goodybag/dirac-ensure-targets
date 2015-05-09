var _ = require('lodash');

module.exports = function( options ){
  options = _.defaults( options || {}, {
    operations: [ 'insert', 'update' ]
  });

  return function( dirac ){
    var ensureTargets = function( $query, schema, next ){
      module.exports.ensureTargets( $query, schema );
      next();
    };

    Object.keys( dirac.dals ).forEach( function( table ){
      options.operations.forEach( function( op ){
        dirac.dals[ table ].before( op, ensureTargets );
      });
    });
  }
};

module.exports.ensureTargets = function( $query, schema ){
  var columns = Object.keys( schema ), vals, target;

  var wasArray = false;

  if ( $query.type === 'insert' ){
    wasArray = Array.isArray( $query.values );
    vals = wasArray ? $query.values : [ $query.values ];
  } else if ( $query.type === 'update' ){
    vals = [ $query.updates ];
  }

  vals = vals.map( function( val ){
    val = _.pick( val, columns );

    if ( Object.keys( val ).length === 0 ){
      console.warn('Dirac.ensureTargets Deleted all keys!');
    }

    return val;
  });

  if ( $query.type === 'update' ){
    $query.updates = vals[0];
  } else {
    $query.values = wasArray ? vals : vals[0];
  }
};