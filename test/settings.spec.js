/*var mongoose = require('mongoose');
var User = require('../main/server/model/users');
var user = mongoose.model('User');

process.env.mode = 'TESTING';
require('../main/bin/www');

describe('Settings', function() {
    beforeEach(function () {
        var secret = new user();
        secret.username = 'secret';
        secret.email = 'fake@gmail.com';
        secret.characters = '7';
        secret.profilePic = 'Brand';
        secret.setPassword('fake');
        secret.save(function (err) {});
        browser.get('/login')
            .then(function () {
                element(by.model('credentials.email')).clear();
                element(by.model('credentials.email')).sendKeys('fake@gmail.com');
                element(by.model('credentials.password')).clear();
                element(by.model('credentials.password')).sendKeys('fake');
                element(by.css("button.btn.btn-default")).click();
                browser.waitForAngular();
                browser.get('/settings');
            });
    });
    afterEach(function () {
        User.remove({}, function () {});
    });
    it('should successfully change the password', function() {
        element(by.model('passwords.origPass')).clear();
        element(by.model('passwords.origPass')).sendKeys('fake');
        element(by.model('passwords.newPass')).clear();
        element(by.model('passwords.newPass')).sendKeys('new');
        element(by.model('passwords.confirmPass')).clear();
        element(by.model('passwords.confirmPass')).sendKeys('new');
        element(by.xpath('/html/body/div/div/div[1]/form/button')).click();
        element(by.css('[ng-click="logOut()"]')).click();
        browser.waitForAngular();
        browser.get('/login');
        element(by.model('credentials.email')).clear();
        element(by.model('credentials.email')).sendKeys('fake@gmail.com');
        element(by.model('credentials.password')).clear();
        element(by.model('credentials.password')).sendKeys('new');
        element(by.css("button.btn.btn-default")).click();
        browser.get('/profile');
        browser.waitForAngular();
        expect(element(by.xpath('//*[@id="profile"]/h1')).getText()).toBe("secret's profile");
    });
    it('should throw an error if the old password is incorrect', function () {
        element(by.model('passwords.origPass')).clear();
        element(by.model('passwords.origPass')).sendKeys('notFake');
        element(by.model('passwords.newPass')).clear();
        element(by.model('passwords.newPass')).sendKeys('new');
        element(by.model('passwords.confirmPass')).clear();
        element(by.model('passwords.confirmPass')).sendKeys('new');
        element(by.xpath('/html/body/div/div/div[1]/form/button')).click();
        browser.wait(function() {
            return browser.switchTo().alert().then(
                function() { return true; },
                function() { return false; }
            );
        });
        var alertInst = browser.switchTo().alert();
        expect(alertInst.getText()).toBe("The password you entered is incorrect");
        alertInst.accept();
    });
    it("should throw an error if the passwords don't match", function () {
        element(by.model('passwords.origPass')).clear();
        element(by.model('passwords.origPass')).sendKeys('fake');
        element(by.model('passwords.newPass')).clear();
        element(by.model('passwords.newPass')).sendKeys('new');
        element(by.model('passwords.confirmPass')).clear();
        element(by.model('passwords.confirmPass')).sendKeys('new2');
        element(by.xpath('/html/body/div/div/div[1]/form/button')).click();
        browser.wait(function() {
            return browser.switchTo().alert().then(
                function() { return true; },
                function() { return false; }
            );
        });
        var alertInst = browser.switchTo().alert();
        expect(alertInst.getText()).toBe("Passwords don't match");
        alertInst.accept();
    });
    it('should successfully change the email', function () {
        element(by.model('email')).clear();
        element(by.model('email')).sendKeys('new@gmail.com');
        element(by.xpath('/html/body/div/div/div[2]/form/button')).click();
        browser.waitForAngular();
        browser.get('/login');
        element(by.model('credentials.email')).clear();
        element(by.model('credentials.email')).sendKeys('new@gmail.com');
        element(by.model('credentials.password')).clear();
        element(by.model('credentials.password')).sendKeys('fake');
        element(by.css("button.btn.btn-default")).click();
        browser.get('/profile');
        browser.waitForAngular();
        expect(element(by.xpath('//*[@id="profile"]/h1')).getText()).toBe("secret's profile");
    });
    it('should throw an error if the email is already taken', function () {
        var secret2 = new user();
        secret2.username = 'secret2';
        secret2.email = 'new@gmail.com';
        secret2.characters = '0';
        secret2.profilePic = 'Brand';
        secret2.setPassword('fake');
        secret2.save(function (err) {});
        element(by.model('email')).clear();
        element(by.model('email')).sendKeys('new@gmail.com');
        element(by.xpath('/html/body/div/div/div[2]/form/button')).click();
        browser.wait(function() {
            return browser.switchTo().alert().then(
                function() { return true; },
                function() { return false; }
            );
        });
        var alertInst = browser.switchTo().alert();
        expect(alertInst.getText()).toBe("Email has already been taken");
        alertInst.accept();
    });
    it('should throw an error if the email is your email', function () {
        element(by.model('email')).clear();
        element(by.model('email')).sendKeys('fake@gmail.com');
        element(by.xpath('/html/body/div/div/div[2]/form/button')).click();
        browser.wait(function() {
            return browser.switchTo().alert().then(
                function() { return true; },
                function() { return false; }
            );
        });
        var alertInst = browser.switchTo().alert();
        expect(alertInst.getText()).toBe("Email has already been taken");
        alertInst.accept();
    });
    it('should successfully change the profile image', function () {
        // TODO: test this case
    });
});
*/