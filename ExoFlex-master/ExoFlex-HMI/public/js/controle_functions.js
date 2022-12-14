let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

var socket = io();

$("#dorsiflex_up").on("touchstart mousedown", function () {
  socket.emit("manualMovement", { Case: 2 });
});
$("#dorsiflex_up").on("touchend mouseup", function () {
  socket.emit("manualMovement", { Case: 1 });
});
$("#dorsiflex_down").on("touchstart mousedown", function () {
  socket.emit("manualMovement", { Case: 3 });
});
$("#dorsiflex_down").on("touchend mouseup", function () {
  socket.emit("manualMovement", { Case: 1 });
});

$("#eversion_left").on("touchstart mousedown", function () {
  socket.emit("manualMovement", { Case: 4 });
});
$("#eversion_left").on("touchend mouseup", function () {
  socket.emit("manualMovement", { Case: 1 });
});
$("#eversion_right").on("touchstart mousedown", function () {
  socket.emit("manualMovement", { Case: 5 });
});
$("#eversion_right").on("touchend mouseup", function () {
  socket.emit("manualMovement", { Case: 1 });
});

function manualButton(button) {
  socket.emit("manualMovement", { Case: button });
}

$("#start").on("click", function () {
  if ($(this).hasClass("start")) {
    $(this).text("Stop");
    $(this).removeClass("start");
    $(this).addClass("stop");
    $("#reset").attr("disabled", "disabled");
    timer = true;
    stopWatch();
  } else {
    $(this).text("Start");
    $(this).removeClass("stop");
    $(this).addClass("start");
    $("#reset").removeAttr("disabled");
    timer = false;
  }
});

$("#reset").on("click", function () {
  timer = false;
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;
  $("#hr").text("00");
  $("#min").text("00");
  $("#sec").text("00");
  $("#count").text("00");
});

function stopWatch() {
  if (timer) {
    count++;

    if (count == 100) {
      second++;
      count = 0;
    }

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    let hrString = hour;
    let minString = minute;
    let secString = second;
    let countString = count;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }

    if (count < 10) {
      countString = "0" + countString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    document.getElementById("count").innerHTML = countString;
    setTimeout(stopWatch, 10);
  }
}
