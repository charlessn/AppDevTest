var count = 0;
var items = [];

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
    }
};

app.initialize();

function isNull(value) {
	return typeof value == 'undefined' || value == null || value == ''
			|| value == 'unknown' || value == 'null';
}

function loadJSONData() {
	$("#loadingDiv").css("left" , ((window.innerWidth/2) - 50) +"px");
	$('#loadingDiv').show();
	 $.ajax({
       url: 'random.json',
	   type : "GET",
	   contentType: 'application/json',	
       dataType: 'json',
       success: function(data) {
		  $.each(data.random, function(i, row) {
			  items.push(row);
		 });
		  loadListToView();
       }, error :function(error) {
		  $('#loadingDiv').hide();
		  alert("Error while calling the API");
	   }
	});   
}

function loadListToView() {
	var t="";
	setTimeout(function(){
		for(var i=0; i<20; i++) {
			count++;
			if(!isNull(items[i])) {
			  t += '<div class="list_item">'+count+')  '+items[i]+'</div>'
			}
		}
		$("#listview").append(t);
		$('#loadingDiv').hide();
		items.splice(0, 20);
		console.log("length of the array ======> " +items.length);
	}, 500);
}

$(document).ready(function() {
    var win = $(window);
    win.scroll(function(e) {
        if (($(document).height() - win.height()) == win.scrollTop()) {
			if(items.length != 0) {
			    $('#loadingDiv').show();
				loadListToView();
			}
        }
    });
});


