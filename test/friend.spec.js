var mongoose = require('mongoose');
var User = require('../main/server/model/users');
var user = mongoose.model('User');

process.env.mode = 'TESTING';
require('../main/bin/www');

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
    var args = arguments;

    // queue 100ms wait
    origFn.call(browser.driver.controlFlow(), function() {
        return protractor.promise.delayed(50);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Friend', function() {
    beforeEach(function () {
        var secret = new user();
        secret.username = 'secret';
        secret.email = 'fake@gmail.com';
        secret.setPassword('fake');
        secret.save(function (err) {});
        var secret2 = new user();
        secret2.username = 'secret2';
        secret2.email = 'fake2@gmail.com';
        secret2.setPassword('fake');
        secret2.save(function (err) {});
    });
    afterEach(function () {
        User.remove({}, function () {});
    });
    it('should send, accept,view a friend request and delete it successfully', function() {
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/profile/secret2');
            })
            .then(function () {
                element(by.css('[ng-click="addFriend()"]')).click();
                browser.wait(function() {
                    return browser.switchTo().alert().then(
                        function() { return true; },
                        function() { return false; }
                    );
                });
                browser.switchTo().alert().accept();
                element(by.css('[ng-click="logOut()"]')).click();
                browser.waitForAngular();
                browser.get('/login');

            })
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake2@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/profile');
                element.all(by.repeater('friend in user.pendingFriends')).get(0).element(by.css('[ng-click="acceptFriend(friend)"]')).click();
                browser.waitForAngular();
                return element.all(by.repeater('friend in user.friends')).get(0).element(by.xpath('/html/body/div/div/div[3]/ul[2]/li/a')).getText();
            })
            .then(function (friend) {
                expect(friend).toEqual('secret');
                element(by.css('[ng-click="logOut()"]')).click();
                browser.get('/login');
                browser.waitForAngular();
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.get('/profile');
                return element.all(by.repeater('friend in user.friends')).get(0).element(by.xpath('/html/body/div/div/div[3]/ul[2]/li/a')).getText();
            })
            .then(function (friend) {
                expect(friend).toEqual('secret2');
                element.all(by.repeater('friend in user.friends')).get(0).element(by.css('[ng-click="deleteFriend(friend)"]')).click();
                browser.waitForAngular();
                element.all(by.repeater('friend in user.friends')).then(function(items) {
                    expect(items.length).toBe(0);
                });
                element(by.css('[ng-click="logOut()"]')).click();
                browser.get('/login');
                browser.waitForAngular();
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                element.all(by.repeater('friend in user.friends')).then(function(items) {
                    expect(items.length).toBe(0);
                });
            });
    });
});
