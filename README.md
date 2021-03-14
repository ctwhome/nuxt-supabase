# Nuxt Supabase Realtime CRUD template with optimistic UI
[![Netlify Status](https://api.netlify.com/api/v1/badges/ac1c89ac-78b8-4695-ba49-c454b707c879/deploy-status)](https://app.netlify.com/sites/nuxt-supabase/deploys)
![image](https://user-images.githubusercontent.com/4195550/110969526-12764180-8359-11eb-9a45-141b307fb319.png)

Check running example here: https://nuxt-supabase.netlify.app/
Project idea: [Full Stack Recipes](https://github.com/NLeSC/full-stack-recipes)

Tech Stack: Nuxt.js, Vuetify, Supabase (DB, Realtime, Auth), Postgres, Netlify Hosting

Features list: 
- [x] Realtime CRUD example
- [x] Auth
- [x] Federated login with Google
- [ ] Role definitions
- [x] DB Init files (SQL)
- [ ] DB migrations between environments 
- [x] Running locally with docker-compose
- [x] Licensing Notes


![image](https://user-images.githubusercontent.com/4195550/110701505-8564a880-81f1-11eb-8353-918207e4c29f.png)

## Prepare database and Auth
1. Edit the local `.ENV' file to add the url and token from Supabase.
2. create table todos with sql:
```sql
 CREATE TABLE todos (
  id varchar primary key  NOT NULL,
  text text,
  done boolean,
  created_at TIMESTAMP DEFAULT(now()) NOT NULL
 )
```
3. Add Login with Google from the Auth settings in supabase. If want a guided tutorial, then folow this steps: https://www.youtube.com/watch?v=_XM9ziOzWk4


## Development

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8080
$ cd docker && docker-compose up -d
$ yarn dev


# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Licensing Notes
Tracking and understanding licensing Node applications can be tedious due to the 3rd party packages involved in the project.

You can run this command locally to check the number of licensing for the installed packages.
```npx license-checker --summary ```

See only production packages: 
```npx license-checker --production ```

[See all option here](https://github.com/davglass/license-checker#options)

Example:
```shell
 $ npx license-checker --production --summary
├─ MIT: 988
├─ ISC: 89
├─ CC0-1.0: 24
├─ BSD-2-Clause: 22
├─ BSD-3-Clause: 12
├─ Apache-2.0: 6
├─ (MIT OR CC0-1.0): 3
├─ Public Domain: 2
├─ BSD*: 2
├─ 0BSD: 2
├─ (MIT OR Apache-2.0): 1
├─ CC-BY-4.0: 1
├─ UNLICENSED: 1
├─ (WTFPL OR MIT): 1
├─ (MIT AND Zlib): 1
└─ (MIT AND BSD-3-Clause): 1
```

