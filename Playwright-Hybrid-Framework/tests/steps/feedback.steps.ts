import { When, Then } from '@cucumber/cucumber';
import { FeedbackPage } from '../pages/FeedbackPage';
import { testContext } from './test-context';

let feedbackPage: FeedbackPage;

When('user navigates to feedback page', async () => {
  feedbackPage = new FeedbackPage(testContext.page);
  await feedbackPage.navigateToFeedbackPage();
});

When('user submits feedback', async () => {
  await feedbackPage.submitFeedback();
});

Then('feedback should be submitted successfully', async () => {
  await feedbackPage.isFeedbackSubmittedSuccessfully();
});
