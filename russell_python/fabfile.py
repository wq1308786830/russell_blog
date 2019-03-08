import getpass
from fabric import Connection, Config

sudo_pass = getpass.getpass("What's your sudo password?")
config = Config(overrides={'sudo': {'password': sudo_pass}})
result = Connection(host='47.112.23.45', user='root', port=2202, config=config).run('uname -s', hide=True)

msg = "Ran {0.command!r} on {0.connection.host}, got stdout:\n{0.stdout}"

print(msg.format(result))


# def pack():
#     # build the package
#     local('python setup.py sdist --formats=gztar', capture=False)
#
#
# def deploy():
#     # figure out the package name and version
#     dist = local('python setup.py --fullname', capture=True).strip()
#     filename = '%s.tar.gz' % dist
#
#     # upload the package to the temporary folder on the server
#     put('dist/%s' % filename, '/tmp/%s' % filename)
#
#     # install the package in the application's virtualenv with pip
#     run('/var/www/yourapplication/env/bin/pip install /tmp/%s' % filename)
#
#     # remove the uploaded package
#     run('rm -r /tmp/%s' % filename)
#
#     # touch the .wsgi file to trigger a reload in mod_wsgi
#     run('touch /var/www/yourapplication.wsgi')
