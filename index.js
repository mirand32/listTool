#!/usr/bin/env node
// import modules from node
const fs = require("fs")
const util =require("util")
const path = require("path")
// import npm package chalk
const chalk = require("chalk")
// func for extracting data about file in a promise
const stat = fs.promises.stat
// set path directory with arg if given else set with current working directory
const targetDir=process.argv[2]||process.cwd()

fs.readdir(
    // run callback on targ dir
    targetDir, async (err, filenames) => {
    if (err) {
      console.log(err);
    }
    // iterate through files in current dir to get array of promises
    const statPromises=filenames.map((file)=> {
        // set arg as absolute path made by comb targ dir and each file
        return stat(path.join(targetDir,file))
    })
    // run all promises asyncronously and when done pass all to new array
    const statsArray=await Promise.all(statPromises)

    //iterate through statsArray to print all files
    for(stats of statsArray){
        const index = statsArray.indexOf(stats)
        // if directory print filename in red 
        if(stats.isDirectory()){
            console.log(chalk.red(filenames[index]));
        }
        // else print filename in yellow 
        else{
            console.log(chalk.yellow(filenames[index]));
        }
    }

});