## location-tracking-app

This is a basic application that tracks locations by individual users and provides the ability to add, edit, and delete both users and their locations.

The overall purpose of this application is to assist in scheduling visits to different locations. Using a simple excel sheet is the current method, but it has no abilities to sort by closest location.

Future versions of this app should call a google api to determine distances between locations, store those distances, and allow for querying closest locations (both scheduled and unscheduled) to an selected location.

## Technologies used

The app is built on node.js and utilizes mongo for storage. Materalize libraries are used on the front end for visualizations.

Node dependencies used are:
* body-parser
* dotenv
* express
* hbs
* method-override
* mongoose