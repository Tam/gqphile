import { parse } from 'graphql';
import { DocumentNode, Location, DefinitionNode } from 'graphql/language/ast';

/**
 * A cache of previously parsed queries
 *
 * @type {Map<string, DocumentNode>}
 */
const docCache = new Map()

/**
 * A map of available fragments by name
 *
 * @type {Map<string, Set<string>>}
 */
const fragmentSourceMap = new Map();

/**
 * Removes guff whitespace from the given string
 *
 * @param {string} string
 * @return {string}
 */
function normalise (string) {
	return string.replace(/[\s.]+/g, ' ').trim();
}

/**
 * Convert an AST location to a cache key
 *
 * @param {Location} loc
 * @return {string}
 */
function cacheKeyFromLoc (loc) {
	return normalise(loc.source.body.substring(loc.start, loc.end));
}

/**
 * Check all fragment definitions within the given AST document, ensuring
 * name->source uniqueness, and warn if duplicates exist
 *
 * @param {DocumentNode} ast
 */
function processFragments (ast) {
	/**
	 * @type {Set<string>}
	 */
	const seenKeys = new Set();

	/**
	 * @type {DefinitionNode[]}
	 */
	const definitions = [];

	ast.definitions.forEach(fragmentDefinition => {
		if (fragmentDefinition.kind === 'FragmentDefinition') {
			const fragmentName = fragmentDefinition.name.value
				, sourceKey    = cacheKeyFromLoc(fragmentName?.loc);
		}
	});
}
