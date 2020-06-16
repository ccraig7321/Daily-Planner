// Function that will be used to store the data that's input by user
function storeData(data, name){
    // Moving items to local storage after they've been saved
    localStorage.setItem(name, JSON.stringify(data));
}

// Function that will take data out of local storage and parse it
function retrieveData(name){
    return JSON.parse(localStorage.getItem(name))
}

// Function to combine all text, time, and item data
function getAllTextData(t){
    var dataArray = []
    var $textareas = $(".tasks")
    $.each($textareas, function(index, value){
        // Setting conditions for function to follow
        if(t == $(value).data("time")){
            var text = $(value).val()
            var time = $(value).data("time")
            // This will loop through the time arry is conditions are met
            for(i = 0; i < timeArray.length; i++){
                var item = timeArray[i]
                // If statement is true, set to text
                if(item.time == time){

                    item.text = text
                }
            }
        }
    })
    // Storing new data to the time array
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

// Will be hours on scheduler
var timeBlock = $("#timeBlock")
// Using moment JS to format date from military time to standard time
var displayTime = moment().format("h a")
console.log(moment().format("dddd MMMM DD YYYY"))
// Retrieving date from the current day
$("#currentDay").text(moment().format("dddd MMMM DD YYYY"))

// Using moment JS to retrieve current time for planning blocks
var currentHour = moment().format("HH")

populateTimeBlock()
// This will loop through length of time array to find current time
function populateTimeBlock(){
    for(i = 0; i < timeArray.length; i++){
        var calendarHour = moment(timeArray[i].time, "HH");
        var calendarTime = calendarHour.format("h a")
        console.log(calendarTime)

        var isBefore = calendarHour.isBefore(moment(currentHour, "HH"))
        var isAfter = calendarHour.isAfter(moment(currentHour, "HH"))
        var colorClass
        // If time is before current time, they will get characteristics of "past" color class 
        if (isBefore){
            colorClass = "past"
        // If time is after current time, they will get characteristics of "future" color class 
        }else if(isAfter){
            colorClass = "future"
        }
        // Time during current hour will get characteristics of "present" color class 
        else {
            colorClass = "present"
        }
        createPlannerRow(timeArray[i], colorClass)
    }

    // This defines each section of the planner row by column
    function createPlannerRow(timeObj, colorClass){ // t is time
        var calendarTime = moment(timeObj.time, "HH").format("hh a");
        // Defines how to obtain the time, task, save button, and planner row elements
        var time = $("<div></div>").addClass("time col-1").text(calendarTime)
        var tasks = $("<textarea></textarea>").addClass("tasks col-10 " + colorClass).text(timeObj.text).data("time", timeObj.time)
        var saveBtn = $("<div></div>").addClass("saveBtn col-1 ").data("time", timeObj.time).append("<i class='fa fa-save'></i>"); //appends save icon to save button area
        var plannerRow = $("<div></div>").addClass("plannerRow row").append(time, tasks, saveBtn).data("time", timeObj.time) // appends data to planner row
        // Appends planner row to the time block
        timeBlock.append(plannerRow)

    }

}

// 
getAllTextData()
$(".saveBtn").on("click", function(event){
    var el = $(this)
    var theTime = el.data("time")

    getAllTextData(theTime)
    console.log("click")
})