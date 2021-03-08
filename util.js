exports.log = function(text)
{
    let time = dateFormat(new Date(), "hh:mm:ss")
    console.log(`[${time}] ${text}`)
}


function dateFormat(date, format)
{
    format = format.replace("hh", date.getHours());
    format = format.replace("mm", date.getMinutes());
    format = format.replace("ss", date.getSeconds());

    return format
}