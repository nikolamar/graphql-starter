## Demo Hotels application built with:
<!-- 
Next.js|Apollo|TypeGraphQL|TypeORM
:---:|:---:|:---:|:---: 
![](https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png)|![](https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png)|![](https://raw.githubusercontent.com/MichalLytek/type-graphql/master/img/logo.png)|![](https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png) -->

<p float="left" align="middle">
  <img src="https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png" width="10%" />
  <img src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" width="30%" /> 
  <img src="https://raw.githubusercontent.com/MichalLytek/type-graphql/master/img/logo.png"width="30%" />
  <img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="20%" />
</p>

### Getting started
---------------

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) for Mac or Windows. [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/). 

### Start containers
---------------
Run in this directory:
```
docker-compose up --build --force-recreate --no-deps
```
The Next.js app will be running at [http://localhost:3000](http://localhost:3000), and apollo server on [http://localhost:8080/graphql](http://localhost:8080/graphql).