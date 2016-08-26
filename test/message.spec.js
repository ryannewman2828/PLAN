var mongoose = require('mongoose');
var User = require('../main/server/model/users');
var user = mongoose.model('User');

process.env.mode = 'TESTING';
require('../main/bin/www');

describe('Message', function() {
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
    it('should send and view a message successfully', function() {
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake2@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/profile/secret');
            })
            .then(function () {
                element(by.xpath('//*[@id="profile"]/ul[1]/li[1]/button')).click();
                element(by.name('messageBody')).sendKeys("Test Message");
                element(by.css('[ng-click="ok()"]')).click();
                element(by.css('[ng-click="logOut()"]')).click();
                browser.waitForAngular();
                browser.get('/login');
            })
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/message');
                return element.all(by.repeater('message in messages')).get(0).getText();
            })
            .then(function (message) {
                expect(message).toContain('Message: Test Message');
                expect(message).toContain('Sender: secret2');
            });
    });
    it('should delete multiple messages successfully', function() {
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake2@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/profile/secret');
            })
            .then(function () {
                element(by.xpath('//*[@id="profile"]/ul[1]/li[1]/button')).click();
                element(by.name('messageBody')).sendKeys("Test Message");
                element(by.css('[ng-click="ok()"]')).click();
                browser.waitForAngular();
                element(by.xpath('//*[@id="profile"]/ul[1]/li[1]/button')).click();
                element(by.name('messageBody')).sendKeys("Test Message");
                element(by.css('[ng-click="ok()"]')).click();
                element(by.css('[ng-click="logOut()"]')).click();
                browser.waitForAngular();
                browser.get('/login');
            })
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/message');
                var message1 = element.all(by.repeater('message in messages')).get(0);
                var message2 = element.all(by.repeater('message in messages')).get(1);
                message2.element(by.css('[ng-click="deleteMessage(message._id)"]')).click();
                message1.element(by.css('[ng-click="deleteMessage(message._id)"]')).click();
                element.all(by.repeater('friend in user.friends')).then(function(items) {
                    expect(items.length).toBe(0);
                });
            });
    });
});
