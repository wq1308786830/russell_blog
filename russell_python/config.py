# -*- coding: utf-8 -*-
# !/usr/bin/python


class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    MYSQL_HOST = '127.0.0.1'
    MYSQL_PORT = '3306'
    MYSQL_USER = 'root'
    MYSQL_PASS = '123456'
    MYSQL_DB = 'test'
    DATABASE_URI = 'mysql://user@localhost/foo'


class DevelopmentConfig(Config):
    DEBUG = True
    MYSQL_HOST = '127.0.0.1'
    MYSQL_PORT = '3306'
    MYSQL_USER = 'root'
    MYSQL_PASS = '123456'
    MYSQL_DB = 'test'


class TestingConfig(Config):
    TESTING = True
