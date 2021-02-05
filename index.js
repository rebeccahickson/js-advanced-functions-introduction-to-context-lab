function createEmployeeRecord(arr) {
  let obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
}

function createEmployeeRecords(arr) {
  return arr.map((record) => {
    return createEmployeeRecord(record);
  });
}

function createTimeInEvent(record, dateTime) {
  record["timeInEvents"].push({
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1]),
    type: "TimeIn",
  });
  return record;
}

function createTimeOutEvent(record, dateTime) {
  record["timeOutEvents"].push({
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1]),
    type: "TimeOut",
  });
  return record;
}

function hoursWorkedOnDate(record, searchDate) {
  let timeIn = record.timeInEvents.find((o) => o.date == searchDate).hour;
  let timeOut = record.timeOutEvents.find((o) => o.date == searchDate).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
  let hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}

function allWagesFor(record) {
  return record.timeInEvents.reduce((sum, e) => {
    return (sum += wagesEarnedOnDate(record, e.date));
  }, 0);
}

function calculatePayroll(array) {
  return array.reduce((sum, e) => {
    let add = 0;
    e.timeInEvents.forEach((i) => {
      let date = i.date;
      add += wagesEarnedOnDate(e, date);
    });
    return (sum += add);
  }, 0);
}

function findEmployeeByFirstName(arr, name) {
  return arr.find((o) => o.firstName === name);
}
