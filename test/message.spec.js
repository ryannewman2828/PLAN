var mongoose = require('mongoose');
var User = require('../main/server/model/users');

process.env.mode = 'TESTING';
require('../main/bin/www');

describe('Message', function() {
    afterEach(function () {
        User.remove({}, function () {});
    });
    it('should send and view a message successfully', function() {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                element(by.css('[ng-click="logOut()"]')).click();
                browser.get('/register');
            })
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret2');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake2@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.get('/login');
                browser.waitForAngular();
            })
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
                element(by.xpath('//*[@id="profile"]/ul[1]/li[1]/button')).click()
                element(by.name('messageBody')).sendKeys("Test Message");
                element(by.css('[ng-click="ok()"]')).click();
                element(by.css('[ng-click="logOut()"]')).click();
                browser.waitForAngular();
                browser.get('/login')

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
                expect(message).toEqual('Test Message');
            });
    });
});
