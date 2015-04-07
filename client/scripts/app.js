// YOUR CODE HERE:

var App = function() {
  this.init();
  this.lastQueryTime = '';
  this.roomList = {};
  this.currentRoom = "general";
};

App.prototype.init = function() {
  var thisApp = this;

  $(document).ready(function(){
    $(".username").click(function() {
      thisApp.addFriend(this.textContent);
    });

    $(".rooms").change(function(){
      console.log(this.value);
      thisApp.currentRoom = this.value;
      if(this.value !== 'general'){
        thisApp.filterByRoom(thisApp.currentRoom);
      }
    });
    $(".submit").click(function() {
      console.log(thisApp, 'thisapp');
      var message = {};
      message.text = $('.chatMessageText').val();
      message.username = window.location.search.split('=')[1];
      message.roomname = 'Brogrammers paradise';
      thisApp.handleSubmit(message);
    });
  });

  var html = '<form id="send"><input type="submit" class="submit"></form>'
  $("#main").append(html);

  var thisFetch = this.fetch.bind(this);
  var thisAddMessage = this.addMessage.bind(this);
  setInterval(function() {
    var fetchResponse = thisFetch(thisAddMessage);
  }, 1000);
};

App.prototype.send = function(message) {
    $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.log("success sent message");
    },
    error: function(){
      console.log('hey error');
    }
  });
};

App.prototype.fetch = function(callback) {

  var that = this;
  var getLastTime = function(data) {
    if(data[0] !== undefined)
      that.lastQueryTime = data[0].createdAt;
  };

  console.log(this.lastQueryTime);

  var queryTime = this.lastQueryTime || "2015-04-07T17:56:20.050Z";
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    // data: {"order": "-createdAt", "where": {}},
    data: {"order": "-createdAt", "where": {"createdAt": {"$gt": queryTime}}},
    type: 'GET',
    contentType: 'application/json',
    success: function(data){

      console.log(data);

      getLastTime(data.results);

      _.each(data.results, callback);
    },
    error: function(){
      console.error('hey error');
    }
  });
};

App.prototype.clearMessages = function() {
  $("#chats").remove();
};

App.prototype.addMessage = function(message) {
  this.addRoom( _.escape(message.roomname));
  var html = '<div class = "chat"><span class="username">' + _.escape(message.username) + '</span>';
  html += '<span class = "message">' + _.escape(message.text) + '</span>';
  html += '<aside class = "roomname">' + _.escape(message.roomname) + '</aside></div>';
  $("#chats").append(html);
};

App.prototype.addRoom = function(roomName) {
  if (!this.roomList.hasOwnProperty(roomName)) {
    this.roomList[roomName] = true;
    $(".rooms").append("<option value=\"" + roomName + "\">" + roomName + "</option>");
  }
  // var html = '<div id="roomSelect"><a href="#">' + roomName + '</a></div>';
  // $("#main").html(html);
};

App.prototype.filterByRoom = function(roomname) {
  $('#chats').children().each(function(){
    if(this.children[2].innerText !== roomname){
      $(this).toggle();
    }

  });
};

App.prototype.addFriend = function(username) {

};

App.prototype.handleSubmit = function(message) {
  this.send(message);
};

var app = new App();
