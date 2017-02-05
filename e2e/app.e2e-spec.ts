import { GameOfGiffPage } from './app.po';

describe('game-of-giff App', function() {
  let page: GameOfGiffPage;

  beforeEach(() => {
    page = new GameOfGiffPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
