var Daily = []
let Array = []
var count = 1;
var arr = [];
var tim = 0;
var tim1 = 0;
var mrg = 0;
var start1 = 0;
var start2 = 0;
var isvalid = false;
var counter = 0;


const scd = document.querySelector('.viewevent')
scd.addEventListener('click', async (e) => {
    e.preventDefault()
    const res = await fetch('/schedule', {
        method: 'GET'
    })
    const res1 = await fetch('/alldayevents', {
        method: 'GET'
    })
    scd.style.display = 'none'
    const data = await res.json()
    const data1 = await res1.json()
    Array = data.events
    Daily = data1.events

    createTime();
    //Create Daily events
    createDailyevnt(Daily);
    //Creating timely events
    Createevents(Array);
})
//Generating time divs
function createTime() {
    for (let i = 9; i <= 20; i += 0.5) {
        let cont = document.createElement("div")
        let time = document.createElement("h1")
        let min = "";
        let round = 0;
        if ((Math.round(i) - i) == 0.5) {
            round = Math.round(i) - 1;
            min = "30"
            if (i >= 13) {
                time.innerHTML = (round - 12).toString() + ":" + min;
            } else {
                time.innerHTML = round.toString() + ":" + min;
            }
            cont.setAttribute("class", "half")
        } else {
            min = "00"
            if (i >= 13) {
                time.innerHTML = (i - 12).toString() + ":" + min;
            } else {
                time.innerHTML = i.toString() + ":" + min;
            }

            if (i == 9 || i == 12) {
                cont.setAttribute("class", "full1");
            } else {
                cont.setAttribute("class", "full");
            }
        }
        cont.setAttribute("id", i.toString())
        cont.appendChild(time);
        if (i < 12) {

            let clckcont = document.getElementById("amclck");
            clckcont.appendChild(cont);
        } else {
            let clckcont = document.getElementById("pmclck");
            clckcont.appendChild(cont);
        }
    }
}

//Getting current date
const d = new Date();
let notime = d.toString();
let day = notime.split(" ");
document.getElementById("dt").innerHTML = day[0] + ", " + day[1] + " " + day[2];

function createDailyevnt(Daily) {
    Daily.forEach((element) => {
        let alldayevnt = document.createElement('div');
        let time = document.createElement('p');
        let item = document.createElement('h1');
        let loc = document.createElement('p');
        let dlt = document.createElement("a")
        let edt = document.createElement("a")

        edt.setAttribute("class", "edt")
        edt.setAttribute("href", "/alldayedit/"+element._id.toString())
        edt.innerHTML = 'EDIT'

        dlt.setAttribute("class", "dlt")
        dlt.setAttribute("href", "/delete/alldayevent/"+element._id.toString())
        dlt.innerHTML = 'DELETE'

        time.setAttribute("class", "gry");
        alldayevnt.setAttribute("class", "evt");
        loc.setAttribute("class", "grn");

        loc.innerHTML = element.location;
        item.innerHTML = element.item;
        time.innerHTML = "ALL Day-";

        alldayevnt.appendChild(time);
        alldayevnt.appendChild(item);
        alldayevnt.appendChild(loc);
        alldayevnt.appendChild(dlt);
        alldayevnt.appendChild(edt);


        let main = document.getElementById("daily");
        main.appendChild(alldayevnt);
    })
}

//Function TO generate events
function genevents(start, end, itm, loca, id) {

    let strttime = document.getElementById(start);

    let evnt = document.createElement("div");
    let time = document.createElement("p");
    let item = document.createElement("h1");
    let loc = document.createElement("p");
    let dlt = document.createElement("a")
    let edt = document.createElement("a")

    edt.setAttribute("class", "edt")
    edt.setAttribute("href", "/edit/"+id.toString())
    edt.innerHTML = 'EDIT'

    dlt.setAttribute("class", "dlt")
    dlt.setAttribute("href", "/delete/event/"+id.toString())
    dlt.innerHTML = 'DELETE'

    evnt.setAttribute("class", "events")
    time.setAttribute("class", "tim")
    item.setAttribute("class", "item")
    loc.setAttribute("class", "loc")

    if (start - 12 < 0) {
        start1 = start - 12;
        time.innerHTML = start2.toString() + "AM-";
    } else {
        time.innerHTML = start2.toString() + "PM-";
    }


    item.innerHTML = itm;
    loc.innerHTML = loca;

    evnt.style.backgroundColor = "white";
    evnt.style.width = "100%"
    evnt.style.zIndex = "1";


    calTimeSpan(start, end, evnt);

    evnt.appendChild(time);
    evnt.appendChild(item);
    evnt.appendChild(loc);
    evnt.appendChild(dlt);
    evnt.appendChild(edt);

    let evntObj = {
        start: start,
        end: end,
        item: item.innerHTML,
        loc: loc.innerHTML
    }

    //Storing events in an array as an object
    storeevents(evntObj);
    //To manage overlapping
    if (count > 0) {
        overlapandStore(evntObj);
        if (tim != 0) {
            rmvOver(evntObj);
            evnt.style.marginTop = mrg.toString() + "rem";
            tim.appendChild(evnt);

        }
        else {
            strttime.appendChild(evnt);
        }

    }
    else {
        strttime.appendChild(evnt);
    }
    tim = 0;
    count++;
}
//Adjusting the height of the 
function calTimeSpan(start, end, evnt) {

    let hgt = 0;
    let diff = end - start;
    if (diff == 0.5) {
        hgt = 4;
    }
    else {
        hgt = Math.round((diff * 4) * 2);
    }

    evnt.style.height = hgt.toString() + "rem";
    if (hgt > 4) {
        evnt.style.flexDirection = "column";
    }
}

//Storing events in array
function storeevents(evnt) {

    arr.push(evnt);
}

//Checking where ovelap occurs
function overlapandStore(evnt) {
            tim1 = 9;
            tim = document.getElementById('9');

}
//Fixing the overlapping
function rmvOver(evnt) {
    let diff = evnt.start - tim1;
    mrg = Math.round((diff * 4) * 2);
    tim1 = 0;
}

//Initialize event creation based on time zones
function Createevents(Array) {
    Array.forEach((element) => {
        let start = element.start;
        let end = element.end;
        let item = element.item;
        let loc = element.location;
        let id = element._id;

        let tm1 = start.split(':');
        let tm2 = end.split(':');

        start = convert(start, tm1);
        end = convert(end, tm2)

        check(start);
        if (isvalid) {
            start1 = start.split('.')
            if (start1[0] - 12 > 0) {
                start2 = start1[0] - 12;
            }
            else {
                start2 = start1[0];
            }
            if (start1[1] && start1[1] != "00") {
                start2 = start2.toString() + ":30";
            }
            else {
                start2 = start2.toString() + ":00";
            }
            genevents(start, end, item, loc, id);
        }
        else {
            alert('More than two events can not start at the same time!.')
        }
    });
}

//To control event spaming
function check(start) {
    arr.forEach((element) => {
        if (element.start == start) {
            counter++;
        }
    })
    if (counter >= 2) {
        isvalid = false;
    }
    else {
        isvalid = true;
    }
}


//To check time for am or pm and converting it in 24 hours format
function checkampm(tm) {
    switch (tm) {
        case '1':
            return (+tm + 12).toString();
            break;
        case '2':
            return (+tm + 12).toString();
            break;
        case '3':
            return (+tm + 12).toString();
            break;
        case '4':
            return (+tm + 12).toString();
            break;
        case '5':
            return (+tm + 12).toString();
            break;
        case '6':
            return (+tm + 12).toString();
            break;
        case '7':
            return (+tm + 12).toString();
            break;
        case '8':
            return (+tm + 12).toString();
            break;

        default:
            return tm;
            break;
    }
}

//Converts :30 to .5 for easier convienience in code
function checkhalf(tm) {
    if (tm != '00') {
        return '.5';
    }
    return '';
}

//Convert fully to 24 hours format
function convert(tm, tm1) {
    tm1[0] = checkampm(tm1[0]);
    if (tm1[1]) {
        tm1[1] = checkhalf(tm1[1]);
        tm = tm1[0] + tm1[1];
        return tm;
    } else {
        tm = tm1[0];
        return tm;
    }
}

