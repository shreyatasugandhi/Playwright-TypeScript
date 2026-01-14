import { Given, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { ENV } from '../config/env.config';

let homePage: HomePage;

Given('user launches the banking application', async function () {
  homePage = new HomePage(this.page);
  await homePage.openApplication(ENV.url);
});

Then('home page should be displayed', async function () {
  await homePage.verifyHomePageLoaded();
});
