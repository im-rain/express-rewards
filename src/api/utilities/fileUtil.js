const path = require('path');
const fs = require('fs');

//The storage file directory
const dir = process.env.SAVEPATH || "../../files";
const saveDir = path.join(__dirname, dir);

var fileUtil = {
    /**
     * Checks if file in storage directory exist.
     * @param filename The filename of the file.
     */
    isExist:(filename)=>{
        return fs.existsSync(path.join(saveDir,filename));
    },

    /**
     * Asyncrhronously write date in the storage file.
     * @param filename The filename of the storage file.
     * @param data The data that be written in the file.
     */
    write:(filename, data)=>{
        if(!fs.existsSync(saveDir)){
            fs.mkdirSync(saveDir)
        }
        fs.writeFile(path.join(saveDir,filename), data, (err) => {
            if (err) throw new Error();
        });
    },

    /**
     * Synchronously read the data from a file.
     * @param filename The filename of the data that be read.,
     */
    read:(filename) =>{
       return fs.readFileSync(path.join(saveDir,filename));
    },
    
    /** export savedir */
    saveDir:saveDir

}

module.exports = fileUtil;