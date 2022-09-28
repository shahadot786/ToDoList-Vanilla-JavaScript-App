//declare global constant variables
const taskList = document.getElementById('taskList');
const taskName = document.getElementById('taskName');
const taskDuration = document.getElementById('taskDuration');
const taskStatus = document.getElementById('taskStatus');
const date = document.getElementById('date');
const time = document.getElementById('time');
const empty = document.getElementById('empty-item');
//declare global scope variables
let selectedTask;
let dateTime;
let currentDate;
let currentTime;
//work with annonymus function
//get current date time year
const getDateMonthYear = function () {
  let date = new Date(); //create a date() function object
  let day = date.getDate();
  let month = date.getMonth() + 1; //returns 0-11 so always add 1
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let amPm = hour >= 12 ? 'PM' : 'AM'; //ternary expression
  hour = hour % 12; //13%12=1//14%12=2//15%12=3
  hour = hour ? hour : 12;
  // add a zero in front of numbers <10
  minute = checkTime(minute);
  second = checkTime(second);
  month = checkTime(month);
  //set values
  dateTime =
    '(' +
    hour +
    ':' +
    minute +
    ':' +
    second +
    amPm +
    ')' +
    day +
    '.' +
    month +
    '.' +
    year;
  currentDate = day + '.' + month + '.' + year;
  currentTime = hour + ':' + minute + ':' + second + ' ' + amPm;
  time.innerText = currentTime;
};
//call the getDateMonthYear() function
getDateMonthYear();
//set date
date.innerText = currentDate;
//check time less than 10
function checkTime(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}
//set function interval
//1000ms = 1s
setInterval(getDateMonthYear, 1000);
//showEmptyMessage
function showEmptyMessage() {
  if (taskList.children.length == 0) {
    empty.style.display = 'block';
  } else if (taskList.children.length > 0) {
    empty.style.display = 'none';
  }
}
//add task
const addTask = function (task) {
  //call the date time function when click add
  getDateMonthYear();
  //check empty values
  if (task.name == '') {
    alert('Task name is required!!');
    return;
  } else if (task.duration == '') {
    alert('Task duration is required!!');
    return;
  } else if (task.status == '') {
    alert('Task status is required!!');
    return;
  }
  //create task list elements
  let cTaskList = document.createElement('li');
  let cTaskName = document.createElement('p');
  let taskStatusBtn = document.createElement('button');
  let cTaskDurationBtn = document.createElement('i');
  let taskDeleteBtn = document.createElement('button');
  let taskEditBtn = document.createElement('button');
  let currentDateTimeYear = document.createElement('span');
  //elements styles if needed
  //insert values to task list items
  //assign values
  cTaskName.innerText = task.name || taskName.value;
  cTaskDurationBtn.innerText = task.duration || taskDuration.value;
  taskStatusBtn.innerText = task.status || taskStatus.value;
  currentDateTimeYear.innerText = task.time || dateTime;
  //edit and delete icons
  taskEditBtn.innerText = '✏️';
  taskDeleteBtn.innerText = '❌';
  //push values to an array as object
  // taskListItems.push({
  //   name: taskNameValue,
  //   duration: taskDurationValue,
  //   status: taskStatusValue,
  // });

  //status,edit,delete click event
  //if status is already set change color
  if (taskList.children.length != 0) {
    switch (taskStatusBtn.innerText) {
      case 'Pending':
        taskStatusBtn.style.background = '#c6c77d';
        taskStatusBtn.style.color = 'black';
        break;
      case 'Done':
        taskStatusBtn.style.background = '#ff1212';
        taskStatusBtn.style.color = 'white';
        break;
      case 'Working':
        taskStatusBtn.style.background = '#008034';
        taskStatusBtn.style.color = 'white';
        break;
      case 'Scheduled':
        taskStatusBtn.style.background = '#1e1e1e';
        taskStatusBtn.style.color = 'white';
        break;
      default:
        return alert(`Working on status (${taskStatusBtn.innerText})!!`);
    }
  }

  //status click event
  taskStatusBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (taskList.children.length != 0) {
      switch (taskStatusBtn.innerText) {
        case 'Pending':
          taskStatusBtn.innerText = 'Done';
          taskStatusBtn.style.background = '#ff1212';
          taskStatusBtn.style.color = 'white';
          break;
        case 'Done':
          taskStatusBtn.innerText = 'Working';
          taskStatusBtn.style.background = '#008034';
          taskStatusBtn.style.color = 'white';
          break;
        case 'Working':
          taskStatusBtn.innerText = 'Scheduled';
          taskStatusBtn.style.background = '#1e1e1e';
          taskStatusBtn.style.color = 'white';
          break;
        case 'Scheduled':
          taskStatusBtn.innerText = 'Pending';
          taskStatusBtn.style.background = '#c6c77d';
          taskStatusBtn.style.color = 'black';
          break;
        default:
          return alert(`Working on status (${taskStatusBtn.innerText})!!`);
      }
    }
  });
  //delete task
  taskDeleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    removeTask(cTaskList);
  });
  //edit task
  taskEditBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    editTask(event, cTaskList);
  });
  //append task list to new list
  taskList.append(cTaskList);
  //append cTaskList into all items
  cTaskList.append(
    cTaskName,
    cTaskDurationBtn,
    taskStatusBtn,
    taskEditBtn,
    taskDeleteBtn,
    currentDateTimeYear
  );
  //empty all input values
  taskName.value = '';
  taskDuration.value = '';
  taskStatus.value = '';
  //show message if task list is empty
  showEmptyMessage();
};

//add some default values to list
let taskListItems = [
  {
    name: 'Task Manager(Task-01)',
    status: 'Pending',
    duration: '1h ',
    time: '(3:46:11AM)23.9.2022',
  },
  {
    name: 'Task Manager(Task-02)',
    status: 'Done',
    duration: '2.5h',
    time: '(3:46:11AM)23.9.2022',
  },
  {
    name: 'Task Manager(Task-03)',
    status: 'Working',
    duration: '40m',
    time: '(3:46:11AM)23.9.2022',
  },
  {
    name: 'Task Manager(Task-04)',
    status: 'Scheduled',
    duration: '40m',
    time: '(3:46:11AM)23.9.2022',
  },
  {
    name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    status: 'Pending',
    duration: '2h40m25s',
    time: '(3:46:11AM)23.9.2022',
  },
];
//function for add new task
//using input fields
const addNewTask = function () {
  addTask({
    name: taskName.value,
    duration: taskDuration.value,
    status: taskStatus.value,
  });
};
//add the default values into the list
for (let i = 0; i < taskListItems.length; i++) {
  addTask(taskListItems[i]);
}
//remove task
const removeTask = function (li) {
  if (confirm('Are you sure?')) {
    taskList.removeChild(li);
    showEmptyMessage();
  }
};
//edit task
const editTask = function (event, task) {
  event.stopPropagation();
  taskName.value = task.children[0].innerText;
  taskDuration.value = task.children[1].innerText;
  taskStatus.value = task.children[2].innerText;
  //when task is selected
  if (selectedTask) {
    selectedTask.style.background = '';
    selectedTask.style.border = '';
  }

  task.style.background = '#b9ffe1';
  task.style.border = '1px solid #1e1e1e';
  selectedTask = task;
};
//update task
const updateTask = function () {
  //call the date time function again
  getDateMonthYear();
  //check empty input fields
  if (taskList.children.length == 0) {
    alert('Task list is empty!! Add Some Task First.');
  } else if (
    taskName.value == '' ||
    taskDuration.value == '' ||
    taskStatus.value == ''
  ) {
    alert('Select a task first for an update');
    return;
  }
  //set updated values to selected task
  selectedTask.children[0].innerText = taskName.value;
  selectedTask.children[1].innerText = taskDuration.value;
  selectedTask.children[2].innerText = taskStatus.value;
  selectedTask.children[5].innerText = dateTime;
  //empty the values
  selectedTask.style.background = '';
  selectedTask.style.border = '';
  taskName.value = '';
  taskDuration.value = '';
  taskStatus.value = '';
};
