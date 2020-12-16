# COVID-19 Testing Location Finder

A Node/React application that will allow users to search for a COVID-19 testing location anywhere in the United States. Users will have the option of using their own detected location or any US city. In addition, users will have the option to specify how far (in miles) to search out. 

# Where you can view it

The project is on https://uscovidtestinglocations.com/

# How I gathered the data

GoodRx.com has a public table that shows a national database of COVID-19 testing locations. I used HtmlUnit as a headless browser to parse through all 250+ pages of the table. On each table row iteration, I stored the state, city, address, facility type, hours of operation, website link, and used Google's Geocoding API to get the coordinates of the location and then stored those coordinates in my databse. This greatly increases performance because client-side rendering has a limit on the amount of requests it can make to the Geocoding API per second. However, with server-side rendering, there's no limit as to how many requests I can make to my database.

# What I Learned
 
* Webscraping and gathering data using Selenium HtmlUnit 
* Google's Places API, Geocoding API, Maps JavaScript API
* Display search results with map markers on a map with Google's Maps JavaScript API
* Server-side rendering as opposed to client-side rendering to increase performance
* Build API routes and fetch data from an Amazon RDS MySQL instance with Node/Express
* Setup a Digital Ocean droplet and make iterative deployments on every push
* Build an intuitive user interface with custom components
* Send/filter data to different components
