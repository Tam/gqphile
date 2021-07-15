# gqphile
An opinionised JS GraphQL client written with Postgraphile in mind

```js
// API
// =========================================================================

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

function ExampleComponent () {

	const { data, loading, errors, refetch } = useQuery();

	const [queryName, { data, loading, errors, called }] = useLazyQuery();

	const [mutationName, { data, loading, errors, progress }] = useMutation();

	const { data, loading, errors } = useSubscription();

	const { data, loading, errors } = useLive();

}
```
