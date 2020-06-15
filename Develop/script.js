function storeData(data, name){
    localStorage.setItem(name, JSON.stringify(data));
}

function retrieveData(name){
    return JSON.parse(localStorage.getItem(name))
}

console.log(retrieveData("calendar"))

function getAllTextData(t){
    var dataArray = []
    var $textareas = $(".tasks")
    $.each($textareas, function(index, value){
        console.log(t, $(value).data("time"))
        if(t == $(value).data("time")){
            console.log("they match!")
            var text = $(value).val()
            var time = $(value).data("time")
            for(i = 0; i < timeArray.length; i++){
                var item = timeArray[i]
                console.log(text, time, item)
                if(item.time == time){

                    item.text = text
                }
            }
        }
        console.log($(value).text())
    })
    console.log(timeArray)
    storeData(timeArray, "timeArray")
}

// Hours written in military time to be used with moment JS
// timeArray = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]

defaultTimeArray = [
    {
        time: "9", text:""
    },
    {
        time: "10", text:""
    },
    {
        time: "11", text:""
    },
    {
        time: "12", text:""
    },
    {
        time: "13", text:""
    },
    {
        time: "14", text:""
    },
    {
        time: "15", text:""
    },
    {
        time: "16", text:""
    },
    {
        time: "17", text:""
    },
]
// If not time array, set it to default TimeArray
var timeArray = retrieveData("timeArray") || defaultTimeArray
console.log(timeArray)

// Will be hours on scheduler
var timeBlock = $("#timeBlock")
var displayTime = moment().format("h a")
console.log(moment().format("dddd MMMM DD YYYY"))
$("#currentDay").text(moment().format("dddd MMMM DD YYYY"))

var currentHour = moment().format("HH")

populateTimeBlock()

function populateTimeBlock(){
    for(i = 0; i < timeArray.length; i++){
        var calendarHour = moment(timeArray[i].time, "HH");
        var calendarTime = calendarHour.format("h a")
        console.log(calendarTime)
        console.log(calendarHour.isBefore(moment(currentHour, "HH")))

        var isBefore = calendarHour.isBefore(moment(currentHour, "HH"))
        var isAfter = calendarHour.isAfter(moment(currentHour, "HH"))
        var colorClass
        if (isBefore){
            colorClass = "past"
        }else if(isAfter){
            colorClass = "future"
        }
        else {
            colorClass = "present"
        }
        createPlannerRow(timeArray[i], colorClass)
    }

    function createPlannerRow(timeObj, colorClass){ // t is time
        var time = $("<div></div>").addClass("time").text(timeObj.time)
        var tasks = $("<textarea></textarea>").addClass("tasks").addClass(colorClass).text(timeObj.text).data("time", timeObj.time)
        var saveBtn = $("<div></div>").addClass("saveBtn").text("save").data("time", timeObj.time)

        var plannerRow = $("<div></div>").addClass("plannerRow row").append(time, tasks, saveBtn).data("time", timeObj.time)
        timeBlock.append(plannerRow)
    }

}

getAllTextData()
$(".saveBtn").on("click", function(event){
    var el = $(this)
    var theTime = el.data("time")

    getAllTextData(theTime)
    console.log("click")
})
//                        


// Must be able to click to type in an event




// Must be able to save event into local storage by clicking on right hand icon




// Item must stay on schedule after page is refreshed