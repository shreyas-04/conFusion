import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display welcome message', () => {
    page.navigateTo('/');
    expect(page.getTitleText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about us page', () => {
    page.navigateTo('/');
    let navlink = page.getAllElement('a').get(1);
    navlink.click();

    expect(page.getTitleText('h3')).toBe('About Us');
  });

  it('should add a new comment', () => {
    page.navigateTo('/dishdetail/0');
    const newAuthor = page.getElement('input[type=text]');
    newAuthor.sendKeys('Test Auhtor');
    const newComment = page.getElement('textarea');
    newComment.sendKeys('Good food');

    const newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();
  });
});
