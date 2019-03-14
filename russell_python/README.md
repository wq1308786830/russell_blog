# 项目运行
`$ uwsgi -s 127.0.0.1:8001 --manage-script-name --mount /russell_python=application:app`


# 项目配置：

## nginx关键配置
根据nginx配置，项目应该在listen的8080端口访问：http://127.0.0.1:8080/
```
server {
    listen       8080;
    server_name  localhost;

    location / {
        try_files $uri @russell_python;
    }

    location @russell_python {
        include uwsgi_params;
        uwsgi_pass 127.0.0.1:8001;
    }
}
```
根据nginx配置，项目应该在listen的8080端口访问：http://127.0.0.1:8080/

## setup
`python setup.py sdist`生成文件