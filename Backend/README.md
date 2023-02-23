# JS-FTP-Server

To get a Docker Conatiner of this image run the following command in the direktory of the project

```
docker build -t file-shear .
```

Now you have a docker Image. Build you conateiner with
```
docker run -p 3000:3000 -d --name File-Shear file-shear
```

#### Docker options
Define a local save folder:
```
-v <the directory where you want to save the files>:/app/public/ftp
```

