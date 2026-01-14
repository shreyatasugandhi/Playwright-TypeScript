import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { getTestData } from '../testdata/testDataHelper';

type LoginData = {
  validUser: {
    username: string;
    password: string;
  };
};

let loginPage: LoginPage;

Given('user launches the banking application', async function () {
  await this.page.goto(process.env.BASE_URL as string);
});

When('user logs in with valid credentials', async function () {
  const data = getTestData<LoginData>('loginData.json');
  loginPage = new LoginPage(this.page);

  await loginPage.login(
    data.validUser.username,
    data.validUser.password
  );
});

Then('user should be logged in successfully', async function () {
  await loginPage.verifyLoginSuccess();
});
