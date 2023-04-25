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
var latitude = Number(-1 * toNumber(cliArgs.w) + toNumber(cliArgs.e)).toFixed(2)
var longitude = Number(-1 * toNumber(cliArgs.s) + toNumber(cliArgs.n)).toFixed(2)
const timezone = moment.tz.guess()

// make the API request
var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude +  "&timezone=" + timezone + "&daily=precipitation_hours";
const response = await fetch(url)
const data = await response.json()

// print json for -j switch
if(cliArgs.j){
    console.log(data)
    process.exit(0)
}

// get the correct day
var day = 1
if(!(cliArgs.d == undefined)){
    day = cliArgs.d
}

// get the amount of rain
const rain = data.daily.precipitation_hours[day]
if(rain > 0){
    process.stdout.write("You might need your galoshes ")
} else {
    process.stdout.write("You will not need your galoshes ")
}

// finish printing the output
if(day == 0){
    process.stdout.write("today.")
} else if(day == 1){
    process.stdout.write("tomorrow.")
} else {
    process.stdout.write("in " + day + " days.")
}