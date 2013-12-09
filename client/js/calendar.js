function calendar() {};
calendar.prototype.name = "Calendar";
calendar.prototype.run = function() {

  // Prepare DOM-elements
  var container_temp = $('<div class="container container-300" id="calendar">');
  container_temp.append('<h2>Kalender</h2>');
  $("body").append(container_temp);

  function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = new Date(date1.setHours(0,0,0,0)).getTime();
    var date2_ms = new Date(date2.setHours(0,0,0,0)).getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);

  }

  // Month and days ( Fixme: International )
  var days = ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'];
  var months = ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'];
  
  // Fetch calendar ( Fixme: does not work )
  $.getJSON('proxy/calendar', function(data) {
    console.log(data);
    for( var i = 0; i < data.feed.entry.length; i++ ) {

      var d = data.feed.entry[i];
      var date = new Date(Date.parse(d.gd$when[0].startTime));
      var date_now = new Date();
      var date_text = "";
      var icon = "upcoming.png";
      if( days_between(date_now,date) == 0 ) {
        date_text = "Idag";
        var icon = "expired.png"
      } else if ( days_between(date_now,date) == 1 ) {
        date_text = "Imorgon";
      } else if ( days_between(date_now,date) < 7 ) {
        date_text = 'På ' + days[date.getDay()];
      } else {
        date_text = 'Den ' + date.getDate() + ' ' + months[date.getMonth()];
      }

      var box_entry = $('<div class="box box-w-300 box-h-100 bg-dark"><img src="themes/default/img/'+icon+'" style="float:left;width:80ox;height:80px;margin:10px;"><h4><strong>'+d.title.$t+'</strong></h4><h4>'+d.gd$where[0].valueString+' - '+date_text+'</h4></div>');
      $( "#calendar" ).append( box_entry );
    }
    
  });

};

// Aktivera det här pluginnet
huset.plugins.push(new calendar());