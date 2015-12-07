/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have urls', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).toBeTruthy();
      });
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have names', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).toBeTruthy();
      });
    });
  });


  /* A new test suite named "The menu" */
  describe('The menu', function() {
    /* This test ensures the menu element is
     * hidden by default.
     */
    it('should be hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    /* This test ensures the menu changes
     * visibility when the menu icon is clicked. It has
     * two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('change visibility when menu item is clicked', function() {
      // Trigger the click event on menu icon
      $('.menu-icon-link').trigger( 'click' );
      expect($('body').hasClass('menu-hidden')).toBeFalsy();
      $('.menu-icon-link').trigger( 'click' );
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });
  });


  /* Test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      var feed = allFeeds[0]
      // Call loadFeed for the first element in allFeeds
      loadFeed(feed.id, function() {
        // This signals the framework that our async function is done
        // doing what it needed to do, which here signals loading the feed
        done();
      });
    });

    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('should have at least one .entry element inside .feed container', function(done) {
      expect($('.feed').find('.entry').length).not.toBe(0);
      done();
    });
  });

  /* Test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    var firstFeedEntry1, firstFeedEntry2;

    beforeEach(function(done) {
      var feedToLoad1 = allFeeds[1],
        feedToLoad2 = allFeeds[2];
      // Call loadFeed for the second element in allFeeds
      loadFeed(feedToLoad1.id, function() {
        // Get first entry of first loaded feed
        firstFeedEntry1 = $('.feed a:first');
        // Call loadFeed for the third element in allFeeds
        loadFeed(feedToLoad2.id, function() {
          // Get first entry of second loaded feed
          firstFeedEntry2 = $('.feed a:first');
          done();
        });
      });
    });
    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it('should change feed content when new feed is loaded', function(done) {
      expect(firstFeedEntry1).not.toBe(firstFeedEntry2);
      done();
    });
  });

  /* Test suit for like button */
  describe('The like button pending specs', function() {
    var article;

    // Load first article of feed
    beforeEach(function() {
      article = $('.feed a:first');
    });

    /* This test ensures when the like button is clicked
     * It adds the liked class
     *
     * This can be implemented by adding a button with 'like' class name
     * to each article added to the feed.
     * The like functionality adds an 'activated' class name to the button
     * which styles it to indicate the article is liked
     */
    xit('should be styled when clicked', function() {
      var likebutton = article.find('button.like');
      likebutton.trigger('click');
      expect(article.hasClass('activated')).toBeTruthy();
    });
  });
}());
