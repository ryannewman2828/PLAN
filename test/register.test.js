var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var mongoose = require('mongoose');
var User = require('../main/server/model/users');
test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

process.env.mode = 'TESTING';
require('../main/bin/www');

test.describe('Registration', function() {
    this.timeout(15000);
    afterEach(function () {
        User.remove({}, function () {});
    });


    test.describe('Register a new user', function () {
        test.it('Register with correct params should work', function () {
            driver.manage().timeouts().implicitlyWait(1000);
            driver.get('localhost:3000/register')
                .then(function () {
                    driver.findElement(By.id("username")).clear();
                    driver.findElement(By.id("username")).sendKeys("secret");
                    driver.findElement(By.id("username")).clear();
                    driver.findElement(By.id("username")).sendKeys("secret");
                    driver.findElement(By.id("email")).clear();
                    driver.findElement(By.id("email")).sendKeys("fake@gmail.com");
                    driver.findElement(By.id("email")).clear();
                    driver.findElement(By.id("email")).sendKeys("fake@gmail.com");
                    driver.findElement(By.id("password")).clear();
                    driver.findElement(By.id("password")).sendKeys("fake");
                    driver.findElement(By.id("password")).clear();
                    driver.findElement(By.id("password")).sendKeys("fake");
                    driver.findElement(By.id("confirmPassword")).clear();
                    driver.findElement(By.id("confirmPassword")).sendKeys("fake");
                    driver.findElement(By.id("confirmPassword")).clear();
                    driver.findElement(By.id("confirmPassword")).sendKeys("fake");
                    driver.findElement(By.css("button.btn.btn-default")).click();
                    driver.findElement(By.css("button.btn.btn-default")).click();
                    driver.wait(function() {
                        return driver.findElement(By.id("profile")).isDisplayed();
                    }, null);
                    return driver.getCurrentUrl();
                })
                .then(function (url) {
                    console.log(url);
                    assert.equal(url, 'http://localhost:3000/profile');
                    driver.quit();
                });
        });
    });
});

