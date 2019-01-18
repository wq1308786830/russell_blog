from setuptools import setup, find_packages

install_requires = [
    'Flask>=1.0',
    'SQLAlchemy>=0.6',
    'fabric',
    'uwsgi'
]

setup(
    name='russell_python',
    version='1.0',
    long_description=__doc__,
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=install_requires
)

# 要从别的地方获得包
# dependency_links = ['http://example.com/yourfiles']
