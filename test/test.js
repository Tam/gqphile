const assert = require('assert');
const gqphile = require('..');

// assert.strictEqual(1, 1);
assert.ok(new gqphile.Client({
	uri: '',
}), 'Failed to construct client');

console.dir(gqphile.gql`
	query TestQuery ($id: UUID!) {
		ping
		getById (id: $id) {
			__typename
			nodeId
			${'XYZZY'}
			name
			thing (a: 10) {
				do
				not
			}
		}
		...Thing
	}
	query Another {
		ping
	}
	fragment Thing on Query {
		a
		b
	}
`, {
	maxArrayLength: null,
});
