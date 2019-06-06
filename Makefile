install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js /home/dexer/diffs/before.json /home/dexer/diffs/after.json
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test