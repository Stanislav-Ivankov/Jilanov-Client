import { AppPage } from './app.po';



describe('Workspace Project App', () => {

	let page: AppPage;

	beforeEach(() => page = new AppPage());

	it('Should Display Welcome Message', () => {
		page.navigateTo();
		expect(page.getTitleText()).toEqual('Welcome To jilanov !');
	});
});