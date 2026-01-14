import { BasePage } from './BasePage';

export class FeedbackPage extends BasePage {

  private nameInput = '#name';
  private emailInput = '#email';
  private subjectInput = '#subject';
  private commentInput = '#comment';
  private submitButton = 'input[name="submit"]';
  private successMessage = '.alert-success';

  async navigateToFeedbackPage() {
    await this.page.click('#feedback');
  }

  async submitFeedback() {
    await this.page.fill(this.nameInput, 'Test User');
    await this.page.fill(this.emailInput, 'test@test.com');
    await this.page.fill(this.subjectInput, 'Feedback');
    await this.page.fill(this.commentInput, 'Good application');
    await this.page.click(this.submitButton);
  }

  async isFeedbackSubmittedSuccessfully() {
    await this.page.waitForSelector(this.successMessage);
  }
}
