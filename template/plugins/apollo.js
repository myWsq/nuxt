import { ApolloLink, {{#isAuth}}concat,{{/isAuth}} split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
{{#isWs}}
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
{{/isWs}}

export default (ctx) => {
	let link = new HttpLink({
		uri: '{{httpUrl}}'
	});

	// Create a WebSocket link:
	{{#isWs}}
	if (process.client) {
		let wsLink = new WebSocketLink({
			uri: '{{wsUrl}}',
			options: {
				reconnect: true
			}
		});

		link = split(
			({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			wsLink,
			link
		);
	}
	{{/isWs}}

  {{#isAuth}}
	const authMiddleware = new ApolloLink((operation, forward) => {
		// add the authorization to the headers
		operation.setContext({
			headers: {
				authorization: `Bearer {{token}}`
			}
		});
		return forward(operation);
	});
  {{/isAuth}}
	return {
		link: {{#if isAuth}}concat(authMiddleware,link){{#else if}}link{{/if}}
		cache: new InMemoryCache()
	};
};
