'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const yargs = require('yargs');

// fs.writeFile('trying.json',JSON.stringify(result),() => {
//     console.log("Done");
// })

// console.log(yargs.argv.input);
// console.log(yargs.argv.output);
// console.log(yargs.argv.output1);

const result = excelToJson({
	sourceFile: `${yargs.argv.input}`
});


function nextChar(c) {
    if(c != 'Z' && c.length!=2){
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }else if(c == 'Z'){
        return 'AA';
    }else{
        var d = c.substring(1); 
        return 'A' + String.fromCharCode(d.charCodeAt(0) + 1);
    }
    
}

var i=0;
for(let r in result){
    if(i==0){
        result[`${r}`].splice(0,5);
        for(let x=1;x<result[`${r}`].length;x++){
            for(let y in result[`${r}`][x]){
                let z;
                z = result[`${r}`][0][`${y}`];
                result[`${r}`][x][`${z}`] = result[`${r}`][x][`${y}`];
                delete result[`${r}`][x][`${y}`]
            }
            fs.appendFile(`${yargs.argv.output}`,JSON.stringify(result[`${r}`][x]),()=>{
            });
        }
    }else{
        for(let x=1;x<result[`${r}`].length;x+=3){
            var obj = {
                info : result[`${r}`][x].C
            }
            for(let y in result[`${r}`][x]){
                if(y != "A" && y != "C"){
                    obj[`${result[`${r}`][x][`${y}`]}`] = [ result[`${r}`][x+1][`${y}`] , result[`${r}`][x+1][nextChar(y)] , result[`${r}`][x+2][`${y}`] ];
                }
            }
            
            fs.appendFile(`${yargs.argv.output1 ? yargs.argv.output1 : yargs.argv.output}`,JSON.stringify(obj),()=>{
            });
        }
    }
    i++;
}
