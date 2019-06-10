install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before-tree.json __tests__/__fixtures__/after-tree.json
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test