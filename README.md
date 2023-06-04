# Xdio JS library

This is a simple API wrapper for Xdio.

## Supported radios

- CBF (Radio-Canada) — completed
- CBC — pending
- QUB — pending

## Install

```bash
npm install xdio-api-js
```

Here is how you can import and use it now.

```javascript
import api from 'xdio-api-js';

const data = await api.getStats();

// ...
```

## Tests

```bash
cp .env.example .env
npm run test
```

## Todo

- [ ] Migrate to `axios` instead of using `fetch`.
- [ ] Documentation.

## Documentation

...

## Contributing

...

## Links

...

## Sponsors

...
