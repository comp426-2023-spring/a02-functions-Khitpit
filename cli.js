#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone"

// get the arguments with minimist
const cliArgs = minimist(process.argv.slice(2))

// check if the help manual needs to be printed
if (cliArgs.h == true){
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n    -h            Show this help message and exit.\n    -n, -s        Latitude: N positive; S negative.\n    -e, -w        Longitude: E positive; W negative.\n    -z            Time zone: uses tz.guess() from moment-timezone by default.\n    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n    -j            Echo pretty JSON from open-meteo API and exit.")
    process.exit(0)
}

// Helper function to parse options
const toNumber = (input) => {
    if (input == undefined) {
        return 0
    } else {
        return input
    }
}

// set the latitude, longitude, and timezone
var Latitude = -1 * toNumber(cliArgs.w) + toNumber(cliArgs.e)
var Longitude = -1 * toNumber(cliArgs.s) + toNumber(cliArgs.n)
const timezone = moment.tz.guess()
console.log(Latitude)

var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude +  "&timezone=" + timezone + "&daily=precipitation_hours";