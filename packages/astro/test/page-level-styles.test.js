import { expect } from 'chai';
import { load as cheerioLoad } from 'cheerio';
import { loadFixture } from './test-utils.js';

// Asset bundling
describe('Page-level styles', () => {
	let fixture;

	before(async () => {
		fixture = await loadFixture({
			projectRoot: './fixtures/page-level-styles/',
		});
		await fixture.build();
	});

	it("Doesn't add page styles for a page without style imports", async () => {
		let html = await fixture.readFile('/index.html');
		let $ = await cheerioLoad(html);
		expect($('link').length).to.equal(0);
	});

	it('Does add page styles for pages with style imports (or deps)', async () => {
		let html = await fixture.readFile('/blog/index.html');
		let $ = await cheerioLoad(html);
		expect($('link').length).to.equal(1);
	});
});
