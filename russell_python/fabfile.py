from fabric import Connection
from fabric import task

msg = "Ran {0.command!r} on {0.connection.host}, got stdout:\n{0.stdout}"
conn = Connection(host='root@47.112.23.45', connect_kwargs={"key_filename": "/users/russell/C.pem"})
result = conn.run('uname -s', hide=True)
print(msg.format(result))


@task
def pack(conn):
    result_msg = conn.run('python setup.py sdist --formats=gztar', capture=False)
    print(msg.format(result_msg))


@task
def deploy(conn):
    # figure out the package name and version
    dist = conn.local('python setup.py --fullname', capture=True).strip()
    filename = '%s.tar.gz' % dist

    # upload the package to the temporary folder on the server
    conn.put('dist/%s' % filename, '/tmp/%s' % filename)

    # install the package in the application's virtualenv with pip
    conn.run('/var/www/yourapplication/env/bin/pip install /tmp/%s' % filename)

    # remove the uploaded package
    conn.run('rm -r /tmp/%s' % filename)

    # touch the .wsgi file to trigger a reload in mod_wsgi
    conn.run('touch /var/www/yourapplication.wsgi')
