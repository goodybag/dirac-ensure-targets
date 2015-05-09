# Dirac Ensure Targets

> Ensure insert/update documents only contain keys specified in dal schema

[Dirac Middleware](https://github.com/jrf0110/dirac)

__install__

```
npm i -S dirac-ensure-targets
```

__usage__

```
dirac.use( require('dirac-ensure-targets')() );
```

__api__

The api exports a single function whose options are:

```javascript
{
  // Which operations does this middleware apply to
  // Default values:
  operations: ['insert', 'update']
}
```