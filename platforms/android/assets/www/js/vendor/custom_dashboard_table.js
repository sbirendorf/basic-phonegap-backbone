var global_col_to_show=0;
function dashboard_start(head ,body){
    var data_head = head;
    var data_body = body;
    var number_of_teams = Object.keys(data_body).length;
    var list = data_body;
    var tb_body = list.teams;
    var output = "";
    var ind_table = '';
    var table_head = "<thead><tr>";
    var table_body = '<tr>';
    var column_name = [];
    var team_name = [];
    var table_index = '<button onclick=print_this_page("table_output") class="dashboard_print">Print this page</button><div id="accordion"><h3 style="padding-left: 40px; font-size: 18px; color:black;font-weight: bold;"> Team Summary </h3><div><table id="sticky-enabled_index" class="display report" cellspacing="0"><thead><tr><th>Total Teams:</th>';
    var index_table_body = '';
    var first_row = 0, col_to_show = 0;
    var total_value = [];
    var num_of_players_in_team_with_value = [];
    var show_col_number_index = [];

    for (var i = 0; i < Object.keys(data_head).length; i++)
    {
        table_head += "<th class='description_text'>" + Object.keys(data_head)[i] + "<div class='fact_description_header'>" + data_head[Object.keys(data_head)[i]]['description'] + "</div></th>";
        column_name[i] = Object.keys(data_head)[i];

    }
    table_head += '</tr></thead>';

    for (var ii = 0; ii < number_of_teams; ii++)
    {
        for (var o = 0; o < Object.keys(data_head).length; o++) // reset the arrays
        {
            total_value[o] = 0;
            num_of_players_in_team_with_value[o] = 0;
        }
        team_name[ii] = Object.keys(data_body)[ii];
        //console.log(list[team_name[ii]]['team'][0]['title']);
        ind_table = '<table id="sticky-enabled' + ii + '" class="display report" cellspacing="0" width="100%">';
        ind_table += "<div class='dashboard_team' id='team_link" + ii + "'>" + team_name[ii] + 
                '<button onclick="get_refresh_injury(&quot;' + team_name[ii] + '&quot;)"'  + 
                " class='injury_update'" + ">Refresh Injury</button></div>" + table_head + "<br>";

        //console.log(team_name[ii]);
        var num_of_players_in_team = 0;
        var aids = list[team_name[ii]]['aids'];
        $.each(aids, function(i, index) {
            num_of_players_in_team++;
            ind_table += "<tr class='dashboard_row' >";
            var athlete_info = this['columns'];
            // console.log(this['columns']); 
            var num_of_columns = this['columns'].length;
            var col_counter = 0;
            $.each(athlete_info, function(t, index)
            {
                //start table head
                if (first_row < num_of_columns) {                            // check if average and create the table head for the averages table 
                    if (this['average'] !== '' && this['average'] !== null) {
                        table_index += '<th>' + athlete_info[first_row]['column name'] + '</th>';
                        show_col_number_index[col_to_show] = first_row;
                        col_to_show++;
                    }
                    first_row++;
                    if (num_of_columns === first_row) {  // if this is the last column close the table head
                        table_index += '</tr></thead>';
                    }
                }
                //end table head
                // build the table row   if this is a fact add automodal automodal-processed      
                if(this['item type']==='fact' || this['item type'] === 'fact_dynamic'){
                    /// if empty link dont show the href
                    if(this['link']===''){
                         ind_table += "<td " + this['threshold'] + "><div " + this['style'] + " ><a class='automodal automodal-processed target='_blank' title='"+this['date']+"'>" + this['value'] + "</a></div></td>";
              
                    }else{
                         ind_table += "<td " + this['threshold'] + "><div " + this['style'] + 
                                      " ><a class='automodal automodal-processed' href='" + 
                                      this['link'] + "'target='_blank' title='"+
                                      this['date']+"'>" + this['value'] + "</a></div></td>";
              
                    }
                 }
                else{ // else create normal row     
                    if(this['value']==='home_page'){
                         ind_table += "<td " + this['threshold'] + "><div " + this['style'] + " ><a href='" + this['link'] + "'target='_blank'><img src='/sites/all/themes/open_framework-6/css/images/home_page_icon.png'></a></div></td>";
                    }
                    else{                
                        ind_table += "<td " + this['threshold'] + "><div " + this['style'] + " ><a href='" + this['link'] + "'target='_blank'>" + this['value'] + "</a></div></td>";}
                }
                //console.log(this['item type']);
                if (this['average'] !== '' && this['average'] !== null) {
                    var the_value = parseFloat(this['value']);
                    if (the_value > 0) {
                        num_of_players_in_team_with_value[col_counter]++;
                        total_value[col_counter] = parseFloat(total_value[col_counter] + the_value);
                    }
                }
                col_counter++;
            });

            ind_table += "</tr>";


        });
        index_table_body += calc_averages(show_col_number_index, num_of_players_in_team_with_value, total_value, team_name[ii], ii, num_of_players_in_team);
        ind_table += "</table>";
        output += ind_table;
    }
    global_col_to_show=col_to_show;
    table_index += index_table_body + '</table></div></div><a class="dashboard_float" href="#feature"><span class="glyphicon  icon-chevron-up icon-2x"></span></a>';


    document.getElementById("table_index_header_output").innerHTML += table_index;
    document.getElementById("table_output").innerHTML += output;
   /*call the data table wighet for all the tables*/ 
    for (var i = 0; i < number_of_teams; i++)
    {
        $('#sticky-enabled' + i).DataTable({
            paging: false
        });
        var $table=$('#sticky-enabled' + i);
        $('#sticky-enabled' + i).floatThead({
	 scrollContainer: function($table){
                return $table.closest('.wrapper');
            }
        });
    }
//description text 
    $(".description_text").mouseover(function() {
        if ($(this).children(".fact_description_header").text() !== '') {

            $(this).children(".fact_description_header").show();
        }
    }).mouseout(function() {
        $(this).children(".fact_description_header").hide();
    });
//index table  text 
    $(".table_average_num").mouseover(function() {
    if ($(this).children(".table_average_num_value").text() !== '') {
            $(this).children(".table_average_num_value").show();
        }
    }).mouseout(function() {
        $(this).children(".table_average_num_value").hide();
    });
//date picker for the date filter 
    $("#datepicker").mouseover(function() {
        if ($(this).children(".fact_description_header").text() !== '') {

            $(this).children(".fact_description_header").show();
        }
    }).mouseout(function() {
        $(this).children(".fact_description_header").hide();
    });
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        showOtherMonths: true,
        selectOtherMonths: true
    });
    /*call the data table wighet */ 
    var i, aoColumns = [];
    for (i = 0; i <= global_col_to_show; i++) {
        if(i===0){
        aoColumns.push( { 'sType': 'string' } );
        }else{
        aoColumns.push( { 'sType': 'formatted-num' } );
        }
    }
    $('#sticky-enabled_index').DataTable({
        paging: false,'aoColumns': aoColumns
    });
     $( "#accordion" ).accordion({
      collapsible: true,
      active: false
    });
}
/*reload the page with the new filter we recived in the date filter */ 
function reload_with_date() { //view  date filter 
    var date = $('#datepicker').val();
    var fType = window.location.href.split("/");
    if (typeof fType[6] === 'undefined')
    {
        date='/'+date;
        var url = window.location.href + date;
        window.location.replace(url);
    }else{
        if (date !== '') {
            var url = window.location.href; //+ from_date;
            url = url.replace(fType[6], date);
           window.location.replace(url);
        }
    }
}

function calc_averages(show_col_number_index, num_of_players_in_team_with_value, total_value, team_name, team_number, num_of_players_in_team)
{
    //we can add if test if we want to use number of athlete in the team or number of athlete with value 
    //use num_of_players_in_team to divide by all or 
    //num_of_players_in_team_with_value for only athlete with value
    var index_table_body = "<tr><td><a href='#team_link" + team_number + "' title='Go to " + team_name + "'s>" + team_name + "</a></td>";

    for (var t = 0; t < show_col_number_index.length; t++)
    {
        var average = total_value[show_col_number_index[t]] / num_of_players_in_team_with_value[show_col_number_index[t]];
        average = average.toFixed(0);
        average=Number(average);
        if (isNaN(average)) {
            average = '';
        }
        index_table_body += "<td class ='table_average_num'>" + average + "<div class='table_average_num_value'>Players Included "+num_of_players_in_team_with_value[show_col_number_index[t]]+"</div></td>";
    }
    index_table_body += "</tr>";
    return index_table_body;
}
function get_refresh_injury(team_grp_name) {
    $('#load').show();
     $.ajax({url:"/msparta/xeq_app/HealtheAthlete/"+team_grp_name
         ,success:function(result){  
          // location.reload();
          if (result.data) {
              alert('Information - '+result.data);
              location.reload();
          } else {
              
          }
       }, error: function(xhr) {
            $('#load').hide();
            alert('Error, failed -'+xhr);
        }

    });
}

