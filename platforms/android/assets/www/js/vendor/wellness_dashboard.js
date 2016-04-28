function wellness_start(header,data_body,threshold)
{
  var number_of_teams = Object.keys(data_body).length;
  var list = data_body;
  var table_head ='<thead><tr>';
    $.each(header, function(i, index) {
        table_head+='<th>'+index+'</th>';
    });
    table_head+='<th>Body Pain</th><td></td></tr></thead>';
    var output = "";
    var ind_table = '';
    var table_body = '<tr>';
    var column_name = [];
    var team_name = [];
    for (var ii = 0; ii < number_of_teams; ii++)
    {
        team_name[ii] = Object.keys(data_body)[ii];
        ind_table = '<table id="sticky-enabled' + ii + '" class="display report" cellspacing="0" width="90%">';
        ind_table += "<div class='dashboard_team' id='team_link" + ii + "'>" + team_name[ii] + "</div>" + table_head + "<br>";

        var aids = list[team_name[ii]]['aids'];
        $.each(aids, function(i, index) {
            ind_table += "<tr class='dashboard_row' >";
            var athlete_info = this['columns'];
             if(athlete_info[0]['wellGrade']!==''){
                 if(athlete_info[0]['wellGrade']==='Red'){
                        var scoreBg='rgba(250, 106, 106, 0.78)';
                    }
                  if(athlete_info[0]['wellGrade']==='Yellow'){
                        var scoreBg='rgba(242, 234, 178, 1)';
                    }
                  if(athlete_info[0]['wellGrade']==='Green'){
                        var scoreBg='rgba(202, 253, 202, 0.51)';
                    }
             }
            $.each(athlete_info[0], function(t, index)
            {
              var bg_color='';
                if(index===null || index===''){
                    index='';
                }else{
                    if(threshold.low>index && t!=='name' && t!=='date' && t!=='from_sleep' && t!=='additional_info' ){
                        bg_color='rgba(250, 106, 106, 0.78)';
                    }
                    if(threshold.high<index && t!=='name' && t!=='date'&& t!=='from_sleep'&& t!=='additional_info'){
                         bg_color='rgba(202, 253, 202, 0.51)';
                    }
                    if(threshold.low<=index && threshold.high>=index && t!=='name' && t!=='date' && t!=='from_sleep'&& t!=='additional_info'){
                        var bg_color='rgba(242, 234, 178, 1)';
                    }
                 }    
                if(index!=='' && (t==='pain' ||t==='cold_flu' ||t==='appetite') ){
                    var val=wellness_bool_value(index);
                    bg_color=val[0];
                    index=val[1];
                }
                 if(index!=='' && t==='score'){
                        bg_color=scoreBg;
                    }
                // build the table row   
                if(t!=='wellGrade' && t!=='nid' && t!=='body_part'&& t!=='body_pain'){
                ind_table += "<td style='background-color: "+bg_color+";'>" + index + "</td>";
                }
            });
              if(athlete_info[0]["body_part"]){
                   ind_table += "<td><ul>";
                   var pain = athlete_info[0]["body_pain"];
                   $.each(athlete_info[0]["body_part"], function(i, index) {
                       if(index['value'] !=null){
                        ind_table += "<li>"+index['value']+" - "+ pain[i]['value'] +"</li>";
                        }
                   });
                  ind_table += "</ul></td>";
              }else{
                  ind_table += "<td></td>";
              }
              var sms = set_button_for_sms_message(i);
            ind_table += "<td>"+sms+"</td></tr>";
        });
        ind_table += "</table>";
        output += ind_table;
    }
    document.getElementById("wellness-table").innerHTML += output;
   /*call the data table wighet for all the tables*/ 
    for (var i = 0; i < number_of_teams; i++)
    {
        $('#sticky-enabled' + i).DataTable({
            paging: false
        });
    }
      $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        showOtherMonths: true,
        selectOtherMonths: true
    });
    
}

function wellness_bool_value(value){
    var data = ["", ""];
    if(value ==0){
        data[0]='rgba(250, 106, 106, 0.78)';//bad
        data[1]='Yes';
    }else{
        data[0]='rgba(202, 253, 202, 0.51)';
        data[1]='No';
    }
    return data;
}
/*reload the page with the new filter we recived in the date filter */ 
function reload_with_date() { //view  date filter 
    var date = $('#datepicker').val();
    var fType = window.location.href.split("/");
    if (typeof fType[5] === 'undefined')
    {
        date='/'+date;
        var url = window.location.href + date;
        window.location.replace(url);
    }else{
        if (date !== '') {
            var url = window.location.href; //+ from_date;
            url = url.replace(fType[5], date);
           window.location.replace(url);
        }
    }
}