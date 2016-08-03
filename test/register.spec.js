var mongoose = require('mongoose');
var User = require('../main/server/model/users');

process.env.mode = 'TESTING';
require('../main/bin/www');

describe('Register', function() {
    afterEach(function () {
        User.remove({}, function () {});
    });
    it('should register a user successfully', function() {
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
                browser.waitForAngular();
                return browser.getCurrentUrl();
            })
            .then(function (url) {
                expect(url).toEqual('http://localhost:3000/profile');
            });
    });
    it('should give an error if email is blank', function () {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual('One or more fields have been left blank');
            });
    });
    it('should give an error if username is blank', function () {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual('One or more fields have been left blank');
            });
    });
    it('should give an error if password is blank', function () {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return [element.all(by.css("li.ng-binding.ng-scope")).get(0).getText(), element.all(by.css("li.ng-binding.ng-scope")).get(1).getText()];
            })
            .then(function (error) {
                expect(error[0]).toEqual('One or more fields have been left blank');
                expect(error[1]).toEqual("Passwords don't match");
            });
    });
    it('should give an error if confirm password is blank', function () {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake')
                element(by.model('credentials.confirmPass')).clear();
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return [element.all(by.css("li.ng-binding.ng-scope")).get(0).getText(), element.all(by.css("li.ng-binding.ng-scope")).get(1).getText()];
            })
            .then(function (error) {
                expect(error[0]).toEqual('One or more fields have been left blank');
                expect(error[1]).toEqual("Passwords don't match");
            });
    });
    it('should give an error if everything is blank', function () {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.confirmPass')).clear();
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual('One or more fields have been left blank');
            });
    });
    it('register with non-matching passwords returns an error', function() {
        browser.get('/register')
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake2');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual("Passwords don't match");
            });
    });
    it('conflicting user names should return an error', function() {
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
                browser.waitForAngular();
                browser.get('/register');
            })
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake2@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual('This Username already exists');
            })
    });
    it('conflicting emails should return an error', function() {
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
                browser.waitForAngular();
                browser.get('/register');
            })
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret2');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return element(by.css("li.ng-binding.ng-scope")).getText();
            })
            .then(function (error) {
                expect(error).toEqual('This email is already in use');
            })
    });
    it('conflicting user names emails should return an error', function() {
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
                browser.waitForAngular();
                browser.get('/register');
            })
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
                browser.waitForAngular();
                return [element.all(by.css("li.ng-binding.ng-scope")).get(0).getText(), element.all(by.css("li.ng-binding.ng-scope")).get(1).getText()];
            })
            .then(function (error) {
                expect(error[0]).toEqual('This Username already exists');
                expect(error[1]).toEqual('This email is already in use');
            })
    });
    it('conflicting user names emails should return an error', function() {
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
                browser.waitForAngular();
                browser.get('/register');
            })
            .then(function () {
                element(by.model('credentials.username')).clear();
                element(by.model('credentials.username')).sendKeys('secret');
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.model('credentials.confirmPass')).clear();
                element(by.model('credentials.confirmPass')).sendKeys('');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                return [element.all(by.css("li.ng-binding.ng-scope")).get(0).getText(), element.all(by.css("li.ng-binding.ng-scope")).get(1).getText(),
                    element.all(by.css("li.ng-binding.ng-scope")).get(2).getText(), element.all(by.css("li.ng-binding.ng-scope")).get(3).getText()];
            })
            .then(function (error) {
                expect(error[0]).toEqual('One or more fields have been left blank');
                expect(error[1]).toEqual("Passwords don't match");
                expect(error[2]).toEqual('This Username already exists');
                expect(error[3]).toEqual('This email is already in use');
            })
    });
});
