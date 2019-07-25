# Sportunity Web Application

## Installation

Please use node@7.8.0 or higher (use n module to change it if needed)
Required : watchman (follow https://facebook.github.io/watchman/docs/install.html to install it)

Then :
```
npm install
```


## Running

1. For developments :

Update local schema which maps the fields of our API : `npm run update-schema` 

Start a local server:
In 4 different terminals:
```
npm run start-relay-dev
npm run build-dev
npm run webpack-dev
npm run start-dev
```

2. For production :
```
npm run start
```

## WHEN DEVELOPPING

Change the mode in constants.json from `PRODUCTION` to `DEVELOPMENT`.
Replace the url `https://backendsportunity2017.com` to `http://51.144.36.27` and `https://backendsportunity2017.com/graphql` to `http://51.144.36.27/graphql`.
This is really important as your changes may affect the production website if you test. 


## ORDERS

1. Don't commit files that you didn't modify manually (ex : schema files, ...)
2. Don't use any automatic code beautifier 
3. Don't commit the files you modified for development purpose : constants.json, createRelayEnvironment.js, etc...
4. Remember to remove your logs before pushing your changes !
- Those are the main checks done before merges, remember to code simple and readable

## MODIFYING FILES

To modify any file, please create a new branch from the master : 
```
git checkout master
git pull
git checkout -b features/FEATURE_NAME
```
Then after you finished your modifications, you can push and create a new pull request to `release6`.

As long as the branch is not merged in master, please fix the issues into this same branch 
-> One branch per feature !
-> One person per branch !

If you fix an issue on a feature merged in master, please create a new branch from master :
```
git checkout master
git pull
git checkout -b hotfix2019/YOUR_NAME/FEATURE_NAME
```

3. Update SSL certificate
- Download certificate from goDaddy
- Copy the content to the concerned server in /etc/nginx/certs
- cat dpoaziepoudd.crt gb_bundle-g2-g1.crt >> bundle.crt (after making a copy)
- Restart nginx : /etc/init.d/nginx restart
- Check that there's no error : openssl s_client -connect domain_name:443