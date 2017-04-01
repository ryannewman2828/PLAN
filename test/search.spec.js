/*var mongoose = require('mongoose');
var User = require('../main/server/model/users');
var user = mongoose.model('User');

process.env.mode = 'TESTING';
require('../main/bin/www');

describe('Search', function() {
    beforeEach(function () {
        var secret = new user();
        secret.username = 'secret';
        secret.email = 'fake@gmail.com';
        secret.characters = '0';
        secret.setPassword('fake');
        secret.save(function (err) {});
        var secret2 = new user();
        secret2.username = 'secret2';
        secret2.email = 'fake2@gmail.com';
        secret2.characters = '0';
        secret2.setPassword('fake');
        secret2.save(function (err) {});
    });
    afterEach(function () {
        User.remove({}, function () {});
    });
    it('search for a user should return that users page', function() {
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
            })
            .then(function () {
                element(by.model('searchID')).sendKeys("secret2\n");
                browser.waitForAngular();
            })
            .then(function () {
                expect(element(by.xpath('//*[@id="profile"]/h1')).getText()).toBe("secret2's profile");
                var button1 = element(by.css('[ng-click="addFriend()"]'));
                var button2 = element(by.css('[ng-click="open()"]'));
                var button3 = element(by.css('a[href="/settings"]'));
                expect(button1.isDisplayed()).toBeTruthy();
                expect(button2.isDisplayed()).toBeTruthy();
                expect(button3.isDisplayed()).toBeFalsy();
            });
    });
    it('search for yourself should return your profile page', function() {
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
            })
            .then(function () {
                element(by.model('searchID')).sendKeys("secret\n");
                browser.waitForAngular();
            })
            .then(function () {
                expect(element(by.xpath('//*[@id="profile"]/h1')).getText()).toBe("secret's profile");
                var button1 = element(by.css('[ng-click="addFriend()"]'));
                var button2 = element(by.css('[ng-click="open()"]'));
                var button3 = element(by.css('a[href="/settings"]'));
                expect(button1.isDisplayed()).toBeFalsy();
                expect(button2.isDisplayed()).toBeFalsy();
                expect(button3.isDisplayed()).toBeTruthy();
            });
    });
});
*/