/*
    Image 590 × 428 = 252520
    324489 
*/
let Jimp = require('jimp');

async function generatePreviewImage(buffer){
    console.log("generating preview...");
    let image = await Jimp.read(buffer);
    image.blur(10);
    let newBuffer = await image.getBuffer(Jimp.MIME_PNG);
    return newBuffer;
}

export { generatePreviewImage };