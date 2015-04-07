// YOUR CODE HERE:

var App = function() {
  this.init();
  this.lastQueryTime = '';
};

App.prototype.init = function() {
  var thisApp = this;
  $(".username").click(function() {
    thisApp.addFriend(this.textContent);
  });

  var html = '<form id="send"><input type="submit" class="submit"></form>'
  $("#main").append(html);
  $("#send .submit").submit(function() {
    thisApp.handleSubmit();
  });

  var thisFetch = this.fetch.bind(this);
  var thisAddMessage = this.addMessage.bind(this);
  setInterval(function() {
    var fetchResponse = thisFetch(thisAddMessage);
    console.log(fetchResponse);
    try{
      this.lastQueryTime = fetchResponse.responseJSON.results[0].createdAt;
    }catch(Error){
      console.log("error no fetch data");
    }
  }, 5000);
};

App.prototype.send = function(message) {
    $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.log("success");
    },
    error: function(){
      console.log('hey error');
    }
  });
};

App.prototype.fetch = function(callback) {
  return $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    data: {"order": "-createdAt"},
    type: 'GET',
    contentType: 'application/json',
    success: function(data){

      //solution to update snafu here
      _.each(data.results, callback);
    },
    error: function(){
      console.error('hey error');
    }
  }).done();
};

App.prototype.update = function(callback, lastQuery) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    success: function(data){
      console.log(data.results);
      _.each(data.results, callback);
    },
    error: function(){
      console.error('hey error');
    }
  });
  var thisUpdate = this.update.bind(this, callback, lastQuery);
  // setTimeout(thisUpdate, 1000);
};

App.prototype.clearMessages = function() {
  $("#chats").remove();
};

App.prototype.addMessage = function(message) {
  var html = '<div class = "chat"><span class="username">' + _.escape(message.username) + '</span>';
  html += '<span class = "message">' + _.escape(message.text) + '</span>';
  html += '<aside class = "roomname">' + _.escape(message.roomname) + '</aside></div>';
  $("#chats").append(html);
};

App.prototype.addRoom = function(roomName) {
  var html = '<div id="roomSelect"><a href="#">' + roomName + '</a></div>';
  $("#main").html(html);
};

App.prototype.addFriend = function(username) {

};

App.prototype.handleSubmit = function(message) {
  var testmsg = {
    'username': 'markandandy',
    'text': 'pooopooopooop',
    'roomname': 'HR27yo'
  };
  this.send(testmsg);
};

var app = new App();
