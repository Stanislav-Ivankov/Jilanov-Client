import { element, browser, by } from 'protractor';



export class AppPage {

	navigateTo() {

		return browser.get('/');
	}

	getTitleText() {

		return element(by.css('app-root h1')).getText();
	}
}