const fs = require('fs');


window.writeCanvas2File = function (name, canvas, callback) {
    let base64 = canvas.toDataURL();
    var base64Data = base64.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(name, base64Data, 'base64', callback);
};

console.log(window.wrtieCanvas2File);
