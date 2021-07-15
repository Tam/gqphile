# gqphile
An opinionated JS GraphQL client written with Postgraphile in mind

```js
// API
// =========================================================================

// Client
// -------------------------------------------------------------------------

import { Client } from 'gqphile';

const client = new Client({
    uri: 'https://my.api/graph',
    wsUri: 'wss://my.api/graph',
    persistentStorage: window.localStorage,
    
    onRequest: async req => {
    	if (Token.has())
            req.headers.Authorization = `Bearer ${Token.get()}`;
    },

    onResponse: async res => {
        if (res.type === 'ws' && res.body.error === 'jwt expired') {
            await Token.refresh();
            return Client.RETRY;
        }
    },
    
    onError: async (req, res, err) => {
    	if (err.status === 401) {
            await Token.refresh();
            return Client.RETRY;
        }
    	
    	Sentry.log({ req, res, err });
    },
});

// Hooks
// -------------------------------------------------------------------------

/**
 * Direct client access
 */
const useClient = () => {};

/**
 * Query
 *
 * @param query
 * @param options
 */
const useQuery = (query, options) => {};

/**
 * Lazy Query
 *
 * @param query
 * @param options
 */
const useLazyQuery = (query, options) => {};

/**
 * Mutation
 *
 * @param mutation
 * @param options
 */
const useMutation = (mutation, options) => {};

/**
 * Subscription
 *
 * @param query
 * @param options
 */
const useSubscription = (query, options) => {};

/**
 * Switches between useQuery for SSR and useSubscription for browser.
 * Intended for Postgraphile live queries
 *
 * @param query - Can be a `query {` or `subscription {`
 * @param options
 */
const useLive = (query, options) => {};

// Example Usage
// =========================================================================

import { gql, /*use...*/ } from 'gqphile';

function ExampleComponent () {

    const { data, loading, errors, refetch } = useQuery(gql`
        query ExampleQuery {
            ping
        }
    `, {
    	skip: false,
        variables: {
            // ...
        },
    });
    
    const [queryName, { data, loading, errors, called }] = useLazyQuery();
    
    const [mutationName, { data, loading, errors, progress }] = useMutation();
    
    const { data, loading, errors } = useSubscription();
    
    const { data, loading, errors } = useLive();

}
```
