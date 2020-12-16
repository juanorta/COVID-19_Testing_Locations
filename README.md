# COVID-19 Testing Location Finder

A Node/React application that will allow users to search for a COVID-19 testing location anywhere in the United States. Users will have the option of using their own detected location or any US city. In addition, users will have the option to specify how far (in miles) to search out. 

# Where you can use it

The project is on https://uscovidtestinglocations.com/

# How I gathered the data

GoodRx.com has a public table that shows a national database of COVID-19 testing locations. I used HtmlUnit as a headless browser to parse through all 250+ pages of the table. On each table row iteration, I stored the state, city, address, facility type, hours of operation, website link, and used Google's Geocoding API to get the coordinates of the location and then stored those coordinates in my databse. This greatly increases performance because client-side rendering has a limit on the amount of requests it can make to the Geocoding API per second. However, with server-side rendering, there's no limit as to how many requests I can make to my database.

# What I Learned
 
* Webscraping and gathering data using Selenium HtmlUnit 
* Created a search feature with the help of Google's Places API for autocompletion
* Recevied coordinates for locations with Google's Geocoding API
* Display search results with map markers on a map with Google's Maps JavaScript API
* Server-side rendering as opposed to client-side rendering to increase performance
* Build API routes and fetch data from an Amazon RDS MySQL instance with Node/Express
* Setup a Digital Ocean droplet and make iterative deployments on every push
* Build an intuitive user interface with custom components
* Send/filter data to different components

# Screenshots

![Screen Shot 2020-12-16 at 2 56 47 PM](https://user-images.githubusercontent.com/44252033/102405658-1ccdad00-3faf-11eb-9eb0-0ae905403379.png)
![Screen Shot 2020-12-16 at 2 53 16 PM](https://user-images.githubusercontent.com/44252033/102405696-26efab80-3faf-11eb-86fa-4b8183753622.png)
![Screen Shot 2020-12-16 at 2 55 03 PM](https://user-images.githubusercontent.com/44252033/102405731-3242d700-3faf-11eb-803f-429c54c0d780.png)
