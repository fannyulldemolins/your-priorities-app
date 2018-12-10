# Your Priorities Version 8

![alt text](https://citizens.is/wp-content/uploads/2018/08/Capture-2.png "Your Priorities screenshot")

## Key Features

* Citizen participation social network for digital democracy and social innovation
* Communities and groups
* Crowdsource ideas
* Effective debating system that is highly resistant to trolling and personal argument
* Vote ideas and debate points up or down
* Users can submit ideas and debate poiunts as text, audio or video
* AI driven recommendation engine that recommends relevant posts to users
* Smart notifications
* Fully functional newsfeeds for all communities, groups and ideas where users can share links and comment.
* Ideas and debate points can be shared effectively on social media
* The client app is a progressive web app
* Built with Web Components making the app fast on inexpensive mobile phones

## Examples of live servers running Your Priorities

* https://yrpri.org/
* https://betraisland.is/
* https://betrireykjavik.is/
* https://mineideer.forbrukerradet.no/
* https://consultation.parlement-ouvert.fr/group/4

## How to run

```
# Git clone with the Active Citizen submodule library
git clone https://github.com/rbjarnason/your-priorities-app.git
cd your-priorities-app
git submodule init
git submodule update

# In app root folder
yarn install
cd client_app
bower install

cp server_api/config/config.json.dist server_api/config/config.json
vi server_api/config/config.json # Add information about an empty postgres database

./start

Go to localhost:4242 in your browser
```

Create an user and give it admin privileges by running the following command in the root of the app
```bash
node server_api/scripts/setAdminOnAll.js your@email.com
```

You need to set the ENV var REDIS_URL to point to your local redis installation with 
URL format like redis://user:pwd@hostname:port

Bunyan is used for logging into JSON, which is great for feeding for 
example into Elastic Search for analytic - https://github.com/trentm/node-bunyan 
The log is piped to STDOUT so you need to pipe it into a file > /var/log/yrpri.log

To build a client_dist production folder with vulcanized web components
```bash
npm install polymer-cli
cd client_app
gulp build
```

If you are moving from version 6 to version 7 make sure to clear out the bower_components folder before running bower install
```bash
rm -r client_app/bower_components
```

For production mode you need to supply the URL to the database as an ENV variable
```bash
postgres://username:password@dbhost:dbport/dbname
```

For production please define SESSION_SECRET=somethingrandomandlong

Google Analytics can be disabled through DISABLE_GA=1


## Email Support

For SMTP support define SMTP_SERVER, SMTP_USERNAME, SMTP_PASSWORD and SMTP_PORT.
We assume security through STARTTLS negotiation.

When using Heroku SENDGRID_USERNAME, and SENDGRID_PASSWORD need to be defined.

## Running behind another web server

If you are running behind a web server like nginx and want to disable production 
to force https, you can define an ENV variable as DISABLE_FORCE_HTTPS=1

Also if you are running behind nginx you want to add the following to your config:
proxy_set_header   X-Forwarded-Proto  https;

## For S3 Image Upload

If you use Amazon AWS S3:
```
# To run with image upload to S3 enabled
AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX S3_BUCKET=my-test S3_REGION=eu-central-1 ./start
```

If you use an alternative to Amazon AWS S3:
```
# To run with image upload to a S3 alternative enabled
AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX S3_BUCKET=my-test S3_ENDPOINT=my.s3.website.com ./start
```

You will need to have the imagemagick package installed.

## Your Priorities uses Active Citizen
```
Active Citizen is an open source library, API and UI for activity streams and notifications 
using machine learning to recommend content to users.
```
[https://github.com/rbjarnason/active-citizen](https://github.com/rbjarnason/active-citizen)


## Your Priorities user help
```
Here are basic user instructions.
```
[User Instructions](https://docs.google.com/document/d/1OVCkpcOa4GcUmw6iDPqckMzWIaGi5Wso6UGacrIfFpw)


## Active Citizen PredictionIO recommendations (optional)
```
Install PredictionIO

Install Universal Recommendation

Import your data with the Active Citizen events_importer script (if you already have some data)

train the template
deploy the template
```
[https://prediction.io/](https://prediction.io/) and [https://github.com/actionml/universal-recommender](https://github.com/actionml/universal-recommender)

```
Here is a Dockerfile that can either be used to build a Docker container with PredictionIO 
and Universal Recommendation or as a recipe for building your own non-Docker Ubuntu/Debian 
based predictionIO VM on any cloud or locally.
```
[https://github.com/rbjarnason/docker-predictionio/blob/master/Dockerfile](https://github.com/rbjarnason/docker-predictionio/blob/master/Dockerfile)


## Active Citizen Tensorflow Classifications (experimental)
```
Install TensorFlow

The python classifier scripts are in active-citizen/engine/classifications

The export files for Your Priorities content are in active-citizen/exporters

Currently you need to use the exporters to generate datasets for the TensorFlow python scripts

Example dataset from our Better Reykjavik citizen particiaption website is provided in
active-citizen/exporters/datasets/better_reyjkavik

```

## Translation help
```
If you want to help us translate the app to your language please use Trensifex for online 
translation for the app. It's easy to use and free for open source projects. See instructions 
in the link below.
```
[Transifex translation help](https://docs.google.com/document/d/1ASb4XKjncZHHf0TBo-w4vK6u5fhE3lE3tszrlFEl95k)


## Developed by the non-profit Citizens Foundation Iceland
```
Our mission is to bring people together to debate and prioritize innovative ideas 
to improve their communities.
```
[http://www.citizens.is/](http://www.citizens.is/)

## The Team
- Robert Bjarnason
- Guðný Maren Valsdóttir
- Gunnar Grímsson
- Nathalie Stembert
- Alexander Máni Gautason

## With help from

Browser testing enabled by BrowserStack


[<img src="https://s3.amazonaws.com/yrpri-direct-asset/bsLogo.svg" width="200">](https://www.browserstack.com/)

