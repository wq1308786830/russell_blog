# -*- coding: utf-8 -*-
# !/usr/bin/python
import werkzeug

import config
from flask import Flask
from raven.contrib.flask import Sentry

sentry = Sentry(dsn='flyingcyclong')

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)


def create_app():
    sentry.init_app(app)
    return app


@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    return 'bad request!', 400


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()
