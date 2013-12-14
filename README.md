Huset.js - a node.js tellstick duo server with superpowers

===

Prerequisites:

   * telldus-core
   * node.js ( >= 0.10.22 recommended )
   	* npm
   	* telldus ( >= 0.0.3, ```npm install telldus``` )
   	* socket.io ( >= 0.9.16, ```npm install socket.io``` )
   	* sqlite3 ( >= ```npm install sqlite3```)


Features:

   * Realtime HTML5 interface with socket.io
   * Data logging for extended history
   * User defined scripts for conditional event triggers and scheduling
   * Modules for third party applications/APIs
   	* Tellstick Duo (Sensors and Switches)
   	* Eliq Online API support
      * Live electricity spot price fron Nordpool
      * Cellsynt API for sms alerts
   	* Google Calendar (Under development)
   	* Yr.no weather data (Under development)


Primary goals:

   * Provide a all-in-one solution for home automation (no external plugins needed)
   * Customization friendly
   * ...


How to run:
   
   * Install all prerequisites
   * Copy config.template.json to config.json and edit it the new file to your preferences
   * Enter '''node huset.js''' at the command line


Final notes:

   * Huset is swedish for 'the house'
   * 'Official' version of telldus-core-js does not compile with recent versions of node, use https://github.com/Hexagon/telldus-core-js until further notice.
   * This software is in an early stage of development, any kind of help is however appreciated!
   * Images in the default theme of the client is not included due to unclear licenses.
   * Bootstrap-switch, d3 and jQuery is included and has their respective licenses embedded in the source code.