<form class='wellnes-form'>
    <div class="hide">
        <input name="nid" type="numeric" value="" />
        <input name="uid" type="numeric" value="<%= uid %>" />
    </div>
    <br>
    <h4>Create Wellness</h4>
    <div class="form-error"></div>
    <br>
    <% _(data).each(function(key, q) { %>
    <% switch(q){ case 'field_wn_cold_flu': %>
    <div class="form-group">
        <label for="cold_flu" class="control-label">
            <%= key %>  
            <div class="checkbox-inline">
                <input type="radio" name="cold_flu" value="0" required >Yes
                <input type="radio" name="cold_flu" value="1" >No
            </div>
        </label>
    </div>
    <% break; case 'field_wn_pain': %>
    <div class="form-group">
        <label for="pain" class="control-label">
            <%= key %>  
            <div class="checkbox-inline">
                <input type="radio" name="pain" value="0"required >Yes
                <input type="radio" name="pain" value="1" >No
            </div>
    </div>
</label>

</div>
<% break;  case 'field_wn_alterness': %>
<div class="form-group">
    <label for="alterness" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <select name="alterness">
                <% if(data.scale == '5') { %>
                    <option value="1">1 - Poor Energy</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5 - Excellent Energy</option>
                <% }else { %>
                    <option value="0">0 - Poor Energy</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6 - Excellent Energy</option>
                <%  }%>
            </select>
        </div>
    </label>
</div>
<% break; case 'field_wn_appetite': %>
<div class="form-group">
    <label for="appetite" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <input type="radio" name="appetite" value="0" required >Yes
            <input type="radio" name="appetite" value="1">No
        </div>
    </label>
</div>
<% break; case 'field_wn_mood': %>
<div class="form-group">
    <label for="mood" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <select name="mood">
                 <% if(data.scale == '5') { %>
                    <option value="1">1 - High Stress</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5 - No Stress</option>
                <% }else { %>
                    <option value="0">0 - High Stress</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6 - No Stress</option>
                <%  }%>
            </select>
        </div>
    </label>
</div>

<% break; case 'field_wn_physical': %>
<div class="form-group">
    <label for="physical" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <select name="physical">
                <% if(data.scale == '5') { %>
                    <option value="1">1 - Dead Legs</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5 - Feel Great</option>
                <% }else { %>
                    <option value="0">0 - Dead Legs</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6 - Feel Great</option>
                <%  }%>
            </select>
        </div>
    </label>
</div>
<% break; case 'field_wn_sleep_restful': %>
<div class="form-group">
    <label for="restful" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <select name="sleep">
                <% if(data.scale == '5') { %>
                    <option value="1">1 - Poor Sleep</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5 - Excellent Sleep</option>
                <% }else { %>
                    <option value="0">0 - Poor Sleep</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6 - Excellent Sleep</option>
                <%  }%>
            </select>
        </div>
    </label>
</div>
<% break; case 'field_wn_from_sleep': %>
<div class="form-group">
    <label  class="control-label" style="display: flex;">
        <div class="checkbox-inline">
            <%= key %>  
            <select name="from_sleep">
                <option value="0000">12 AM ,0:00</option>
                <option value="0015">12:15 AM ,0:15</option>
                <option value="0030">12:30 AM ,0:30</option>
                <option value="0045">12:45 AM ,0:45</option>
                <option value="0100">1 AM ,1:00</option>
                <option value="0115">1:15 AM ,1:15</option>
                <option value="0130">1:30 AM ,1:30</option>
                <option value="0145">1:45 AM ,1:45</option>
                <option value="0200">2 AM ,2:00</option>
                <option value="0215">2:15 AM ,2:15</option>
                <option value="0230">2:30 AM ,2:30</option>
                <option value="0245">2:45 AM ,2:45</option>
                <option value="0300">3 AM ,3:00</option>
                <option value="0315">3:15 AM ,3:15</option>
                <option value="0330">3:30 AM ,3:30</option>
                <option value="0345">3:45 AM ,3:45</option>
                <option value="0400">4 AM ,4:00</option>
                <option value="0415">4:15 AM ,4:15</option>
                <option value="0430">4:30 AM ,4:30</option>
                <option value="0445">4:45 AM ,4:45</option>
                <option value="0500">5 AM ,5:00</option>
                <option value="0515">5:15 AM ,5:15</option>
                <option value="0530">5:30 AM ,5:30</option>
                <option value="0545">5:45 AM ,5:45</option>
                <option value="0600">6 AM ,6:00</option>
                <option value="0615">6:15 AM ,6:15</option>
                <option value="0630">6:30 AM ,6:30</option>
                <option value="0645">6:45 AM ,6:45</option>
                <option value="0700">7 AM ,7:00</option>
                <option value="0715">7:15 AM ,7:15</option>
                <option value="0730">7:30 AM ,7:30</option>
                <option value="0745">7:45 AM ,7:45</option>
                <option value="0800">8 AM ,8:00</option>
                <option value="0815">8:15 AM ,8:15</option>
                <option value="0830">8:30 AM ,8:30</option>
                <option value="0845">8:45 AM ,8:45</option>
                <option value="0900">9 AM ,9:00</option>
                <option value="0915">9:15 AM ,9:15</option>
                <option value="0930">9:30 AM ,9:30</option>
                <option value="0945">9:45 AM ,9:45</option>
                <option value="1000">10 AM ,10:00</option>
                <option value="1015">10:15 AM ,10:15</option>
                <option value="1030">10:30 AM ,10:30</option>
                <option value="1045">10:45 AM ,10:45</option>
                <option value="1100">11 AM ,11:00</option>
                <option value="1115">11:15 AM ,11:15</option>
                <option value="1130">11:30 AM ,11:30</option>
                <option value="1145">11:45 AM ,11:45</option>
                <option value="1200">12 PM ,12:00</option>
                <option value="1215">12:15 PM ,12:15</option>
                <option value="1230">12:30 PM ,12:30</option>
                <option value="1245">12:45 PM ,12:45</option>
                <option value="1300">1 PM ,13:00</option>
                <option value="1315">1:15 PM ,13:15</option>
                <option value="1330">1:30 PM ,13:30</option>
                <option value="1345">1:45 PM ,13:45</option>
                <option value="1400">2 PM ,14:00</option>
                <option value="1415">2:15 PM ,14:15</option>
                <option value="1430">2:30 PM ,14:30</option>
                <option value="1445">2:45 PM ,14:45</option>
                <option value="1500">3 PM ,15:00</option>
                <option value="1515">3:15 PM ,15:15</option>
                <option value="1530">3:30 PM ,15:30</option>
                <option value="1545">3:45 PM ,15:45</option>
                <option value="1600">4 PM ,16:00</option>
                <option value="1615">4:15 PM ,16:15</option>
                <option value="1630">4:30 PM ,16:30</option>
                <option value="1645">4:45 PM ,16:45</option>
                <option value="1700">5 PM ,17:00</option>
                <option value="1715">5:15 PM ,17:15</option>
                <option value="1730">5:30 PM ,17:30</option>
                <option value="1745">5:45 PM ,17:45</option>
                <option value="1800">6 PM ,18:00</option>
                <option value="1815">6:15 PM ,18:15</option>
                <option value="1830">6:30 PM ,18:30</option>
                <option value="1845">6:45 PM ,18:45</option>
                <option value="1900">7 PM ,19:00</option>
                <option value="1915">7:15 PM ,19:15</option>
                <option value="1930">7:30 PM ,19:30</option>
                <option value="1945">7:45 PM ,19:45</option>
                <option value="2000">8 PM ,20:00</option>
                <option value="2015">8:15 PM ,20:15</option>
                <option value="2030">8:30 PM ,20:30</option>
                <option value="2045">8:45 PM ,20:45</option>
                <option value="2100">9 PM ,21:00</option>
                <option value="2115">9:15 PM ,21:15</option>
                <option value="2130">9:30 PM ,21:30</option>
                <option value="2145">9:45 PM ,21:45</option>
                <option value="2200" selected="selected">10 PM ,22:00</option>
                <option value="2215">10:15 PM ,22:15</option>
                <option value="2230">10:30 PM ,22:30</option>
                <option value="2245">10:45 PM ,22:45</option>
                <option value="2300">11 PM ,23:00</option>
                <option value="2315">11:15 PM ,23:15</option>
                <option value="2330">11:30 PM ,23:30</option>
                <option value="2345">11:45 PM ,23:45</option>
            </select>
        </div>
    </label>
</div>
<div class="form-group">
    <label  class="control-label" style="display: flex;">
        <div class="checkbox-inline">
            Wake Up Time 
            <select name="to_sleep">
                <option value="0000">12 AM ,0:00</option>
                <option value="0015">12:15 AM ,0:15</option>
                <option value="0030">12:30 AM ,0:30</option>
                <option value="0045">12:45 AM ,0:45</option>
                <option value="0100">1 AM ,1:00</option>
                <option value="0115">1:15 AM ,1:15</option>
                <option value="0130">1:30 AM ,1:30</option>
                <option value="0145">1:45 AM ,1:45</option>
                <option value="0200">2 AM ,2:00</option>
                <option value="0215">2:15 AM ,2:15</option>
                <option value="0230">2:30 AM ,2:30</option>
                <option value="0245">2:45 AM ,2:45</option>
                <option value="0300">3 AM ,3:00</option>
                <option value="0315">3:15 AM ,3:15</option>
                <option value="0330">3:30 AM ,3:30</option>
                <option value="0345">3:45 AM ,3:45</option>
                <option value="0400">4 AM ,4:00</option>
                <option value="0415">4:15 AM ,4:15</option>
                <option value="0430">4:30 AM ,4:30</option>
                <option value="0445">4:45 AM ,4:45</option>
                <option value="0500">5 AM ,5:00</option>
                <option value="0515">5:15 AM ,5:15</option>
                <option value="0530">5:30 AM ,5:30</option>
                <option value="0545">5:45 AM ,5:45</option>
                <option value="0600">6 AM ,6:00</option>
                <option value="0615">6:15 AM ,6:15</option>
                <option value="0630">6:30 AM ,6:30</option>
                <option value="0645">6:45 AM ,6:45</option>
                <option value="0700">7 AM ,7:00</option>
                <option value="0715">7:15 AM ,7:15</option>
                <option value="0730">7:30 AM ,7:30</option>
                <option value="0745">7:45 AM ,7:45</option>
                <option value="0800">8 AM ,8:00</option>
                <option value="0815">8:15 AM ,8:15</option>
                <option value="0830">8:30 AM ,8:30</option>
                <option value="0845">8:45 AM ,8:45</option>
                <option value="0900">9 AM ,9:00</option>
                <option value="0915">9:15 AM ,9:15</option>
                <option value="0930" selected="selected" >9:30 AM ,9:30</option>
                <option value="0945">9:45 AM ,9:45</option>
                <option value="1000">10 AM ,10:00</option>
                <option value="1015">10:15 AM ,10:15</option>
                <option value="1030">10:30 AM ,10:30</option>
                <option value="1045">10:45 AM ,10:45</option>
                <option value="1100">11 AM ,11:00</option>
                <option value="1115">11:15 AM ,11:15</option>
                <option value="1130">11:30 AM ,11:30</option>
                <option value="1145">11:45 AM ,11:45</option>
                <option value="1200">12 PM ,12:00</option>
                <option value="1215">12:15 PM ,12:15</option>
                <option value="1230">12:30 PM ,12:30</option>
                <option value="1245">12:45 PM ,12:45</option>
                <option value="1300">1 PM ,13:00</option>
                <option value="1315">1:15 PM ,13:15</option>
                <option value="1330">1:30 PM ,13:30</option>
                <option value="1345">1:45 PM ,13:45</option>
                <option value="1400">2 PM ,14:00</option>
                <option value="1415">2:15 PM ,14:15</option>
                <option value="1430">2:30 PM ,14:30</option>
                <option value="1445">2:45 PM ,14:45</option>
                <option value="1500">3 PM ,15:00</option>
                <option value="1515">3:15 PM ,15:15</option>
                <option value="1530">3:30 PM ,15:30</option>
                <option value="1545">3:45 PM ,15:45</option>
                <option value="1600">4 PM ,16:00</option>
                <option value="1615">4:15 PM ,16:15</option>
                <option value="1630">4:30 PM ,16:30</option>
                <option value="1645">4:45 PM ,16:45</option>
                <option value="1700">5 PM ,17:00</option>
                <option value="1715">5:15 PM ,17:15</option>
                <option value="1730">5:30 PM ,17:30</option>
                <option value="1745">5:45 PM ,17:45</option>
                <option value="1800">6 PM ,18:00</option>
                <option value="1815">6:15 PM ,18:15</option>
                <option value="1830">6:30 PM ,18:30</option>
                <option value="1845">6:45 PM ,18:45</option>
                <option value="1900">7 PM ,19:00</option>
                <option value="1915">7:15 PM ,19:15</option>
                <option value="1930">7:30 PM ,19:30</option>
                <option value="1945">7:45 PM ,19:45</option>
                <option value="2000">8 PM ,20:00</option>
                <option value="2015">8:15 PM ,20:15</option>
                <option value="2030">8:30 PM ,20:30</option>
                <option value="2045">8:45 PM ,20:45</option>
                <option value="2100">9 PM ,21:00</option>
                <option value="2115">9:15 PM ,21:15</option>
                <option value="2130">9:30 PM ,21:30</option>
                <option value="2145">9:45 PM ,21:45</option>
                <option value="2200">10 PM ,22:00</option>
                <option value="2215">10:15 PM ,22:15</option>
                <option value="2230">10:30 PM ,22:30</option>
                <option value="2245">10:45 PM ,22:45</option>
                <option value="2300">11 PM ,23:00</option>
                <option value="2315">11:15 PM ,23:15</option>
                <option value="2330">11:30 PM ,23:30</option>
                <option value="2345">11:45 PM ,23:45</option>
            </select>
        </div>
    </label>
</div>
<% break; case 'field_wn_soreness': %>
<div class="form-group">
    <label for="soreness" class="control-label">
        <%= key %>  
        <div class="checkbox-inline">
            <select name="soreness">
                <% if(data.scale == '5') { %>
                    <option value="1">1 - Very Sore</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5 - Not Sore</option>
                <% }else { %>
                    <option value="0">0 - Very Sore</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6 - Not Sore</option>
                <%  }%>
            </select>

        </div>
    </label>

</div>
<% break; case 'field_wn_body_part_name': %>
<div class="form-group">
    <label class="control-label">
        Select areas where you are sore
    </label>

</div>
<div id="image" style="margin-left: -16px">
    <img id="shape1" style="width: <%- screen %>px" src="/sites/all/themes/open_framework-6/backbone/images/muscle-anatomy.jpg" alt="shape1" usemap="#shape1">
</div>

<div class="wellness-slider" style=""> 
    <ul></ul>
</div>
<% break; } %>


<% }); %>


<map name="shape1">
    <area alt="Left Chest" color="#002" title="Left Chest" href="#" shape="poly" class="Left-Chest" coords="144,97,170,95,190,106,189,115,187,145,170,147,144,143" />
    <area alt="Right Chest" title="Right Chest" color="#005" href="#" shape="poly" class="Right-Chest" coords="118,94,142,96,142,144,121,147,101,144,99,113,97,105,100,101" />
    <area alt="Ab" title="Ab" color="#006" href="#" shape="poly" class="Ab" coords="120,200,120,150,144,146,171,150,170,203,165,243,155,260,134,261,128,246,125,243" />
    <area alt="Right Side" title="Right Side" color="#007" href="#" shape="poly" class="Right-Side" coords="122,207,104,207,104,161,120,153" />
    <area alt="Left Side" title="Left Side" color="#008" href="#" shape="poly" class="Left-Side" coords="172,202,188,203,187,163,171,150" />
    <area alt="Left Shoulder" title="Left Shoulder" color="#009" href="#" shape="poly" class="Left-Shoulder" coords="187,88,205,96,217,116,221,135,192,116,193,106,173,95" />
    <area alt="Right Shoulder" title="Right Shoulder" color="#010" href="#" shape="poly" class="Right-Shoulder" coords="102,83,86,88,74,99,71,116,69,133,88,122,97,109,99,101,118,93,119,91" />
    <area alt="Neck" title="Neck" color="#013" href="#" shape="poly" class="Neck" coords="160,58,158,74,162,91,144,94,134,90,130,60,141,65,149,67" />
    <area alt="Left Bicep" title="Left Bicep" color="#014" href="#" shape="poly" class="Left-Arm" coords="191,119,221,139,228,151,231,164,230,177,218,171,209,162,200,137,191,123" />
    <area alt="Right Bicep" title="Right Bicep" color="#015" href="#" shape="poly" class="Right-Arm" coords="97,114,89,143,83,159,73,173,63,180,63,160,69,136,89,125" />
    <area alt="Right Forearm" title="Right Forearm" color="#067" href="#" shape="poly" class="Right-Lower-Arm" coords="63,161,64,178,78,173,77,185,61,214,47,239,31,234,44,182" />
    <area alt="Left Forearm" title="Left Forearm" color="#066" href="#" shape="poly" class="Left-Lower-Arm" coords="234,164,249,177,256,201,273,231,257,237,230,203,219,182,216,173,231,180" />
    <area alt="Right Thigh" title="Right Thigh" color="#021" href="#" shape="poly" class="Right-Thigh" coords="101,221,97,247,91,267,91,297,90,315,96,336,96,347,109,343,116,348,125,351,129,344,131,328,131,316,133,304,129,288,111,240" />
    <area alt="Right Groin" title="Right Groin" color="#022" href="#" shape="poly" class="Right-Groin" coords="111,228,116,241,123,261,129,275,132,288,135,299,137,308,141,291,143,281,141,274,130,258,129,249" />
    <area alt="Left Thigh" title="Left Thigh" color="#024" href="#" shape="poly" class="Left-Thigh" coords="190,221,195,243,201,263,201,296,199,323,196,345,184,344,174,350,168,351,164,345,162,336,161,326,161,316,161,303,161,291,166,270" />
    <area alt="Left Groin" title="Left Groin" color="#025" href="#" shape="poly" class="Left-Groin" coords="180,231,179,243,172,255,165,273,162,285,160,296,159,324,152,297,150,289,149,279,148,273,159,258,159,250,169,240" />
    <area alt="Right Calf" title="Right Calf" color="#028" href="#" shape="poly" class="Right-Calf" coords="120,376,124,406,121,434,115,465,111,429,111,400,114,387" />
    <area alt="Right Shin" title="Right Shin" color="#029" href="#" shape="poly" class="Right-Shin" coords="93,373,102,390,107,429,105,468,100,477,97,445,89,399" />
    <area alt="Left Calf" title="Left Calf" color="#030" href="#" shape="poly" class="Left-Calf" coords="170,380,178,395,178,419,177,466,167,424,167,397" />
    <area alt="Left Shin" title="Left Shin" color="#031" href="#" shape="poly" class="Left-Shin" coords="198,373,189,469,181,466,183,423,187,390" />
    <area alt="Traps" title="Traps" color="#032" href="#" shape="poly" class="Traps" coords="447,53,442,69,417,89,403,96,429,99,438,131,457,165,462,164,477,130,486,96,514,90,492,85,473,71,471,54" />
    <area alt="Left Shoulder" title="Left Shoulder" color="#033" href="#" shape="poly" class="Left-Shoulder1" coords="401,97,424,100,410,116,398,130,383,136,386,116,391,104" />
    <area alt="Right Shoulder" title="Right Shoulder" color="#034" href="#" shape="poly" class="Right-Shoulder1" coords="488,97,508,111,520,125,531,130,531,112,526,98,517,91" />
    <area alt="Left Tricep" title="Left Tricep" color="#035" href="#" shape="poly" class="Left-Arm1" coords="409,121,394,134,382,138,370,165,374,184,386,180,394,163,403,155,410,136" />
    <area alt="Right Tricep" title="Right Tricep" color="#036" href="#" shape="poly" class="Right-Arm1" coords="508,114,506,137,515,159,523,176,536,185,541,164,536,152,531,133" />
    <area alt="Upper Back" title="Upper Back" color="#037" href="#" shape="poly" class="Upper-Back" coords="412,117,441,135,459,170,478,131,507,119,507,137,498,174,487,201,471,173,449,174,434,204,420,185,419,172,411,143,409,125" />
    <area alt="Left Glute" title="Left Glute" color="#038" href="#" shape="poly" class="Left-Glute" coords="416,214,411,234,408,257,405,270,411,277,428,283,440,282,449,279,454,272,457,263,459,237,454,226,447,217,435,213,428,211" />
    <area alt="Right Glute" title="Right Glute" color="#039" href="#" shape="poly" class="Right-Glute" coords="459,235,459,268,464,277,472,282,478,282,487,282,495,279,501,277,507,273,511,268,509,248,506,225,502,217,496,214,486,213,477,217,471,221" />
    <area alt="Left Hamstring" title="Left Hamstring" color="#054" href="#" shape="poly" class="Left-Hamstring" coords="407,265,416,274,429,277,440,282,440,297,442,313,445,324,441,340,441,354,438,364,435,370,430,363,425,352,422,355,417,358,412,361,409,364,409,354,408,328,406,312,405,292,405,277" />
    <area alt="Left Groin" title="Left Groin" color="#045" href="#" shape="poly" class="Left-Groin1" coords="457,276,442,285,441,339,453,300,456,286" />
    <area alt="Right Groin" title="Right Groin" color="#046" href="#" shape="poly" class="Right-Groin1" coords="459,277,477,287,476,347,463,302,460,288" />
    <area alt="Right Hamstring" title="Right Hamstring" color="#053" href="#" shape="poly" class="Right-Hamstring" coords="479,283,474,292,474,312,476,327,475,331,476,339,480,366,485,373,495,361,502,364,510,370,512,327,513,304,511,289,512,273,500,280" />
    <area alt="Right Calf" title="Right Calf" color="#048" href="#" shape="poly" class="Right-Calf1" coords="509,370,501,369,495,370,491,372,486,374,484,380,482,393,482,402,484,415,484,425,490,430,504,430,510,425,511,414" />
    <area alt="Left Calf" title="Left Calf" color="#050" href="#" shape="poly" class="Left-Calf1" coords="420,367,413,367,407,377,407,390,406,403,409,421,414,433,421,433,429,433,433,433,436,418,436,400,433,383" />
    <area alt="Right Achilles" title="Right Achilles" color="#0408" href="#" shape="poly" class="Right-Achilles" coords="508,440,502,440,490,441,487,442,487,451,489,462,488,472,487,479,499,475" />
    <area alt="Left Achilles" title="Left Achilles" color="#0500" href="#" shape="poly" class="Left-Achilles" coords="415,441,424,441,430,442,430,448,429,455,428,465,428,471,424,472,419,470,416,455" />
    <area alt="Left Forearm" title="Left Forearm" color="#051" href="#" shape="poly" class="Left-Forearm" coords="369,166,375,186,387,183,378,204,359,223,347,246,331,237,346,206,357,183,359,173" />
    <area alt="Right Forearm" title="Right Forearm" color="#052" href="#" shape="poly" class="Right-Forearm" coords="527,182,538,186,543,166,558,178,564,206,572,226,577,244,562,249,551,226,537,210,528,188" />
    <area alt="Right Foot" title="Right Foot" color="#070" href="#" shape="poly" class="Right-Foot" coords="101,474,116,472,118,483,122,501,104,502,92,505,75,505,75,497,90,492" />
    <area alt="Left Foot" title="Left Foot" color="#071" href="#" shape="poly" class="Left-Foot" coords="175,471,192,472,195,481,207,495,216,499,217,507,200,507,187,502,172,504,172,492,172,480" />
    <area alt="Low Back" title="Low Back" color="#072" href="#" shape="poly" class="Low-Back" coords="451,175,468,176,487,211,480,216,469,221,463,229,459,237,454,226,445,217,432,213,429,215,450,174" />
    <area alt="Head" title="Head" href="#" class="head"color="#077" shape="poly" coords="128,57,126,21,131,10,142,6,153,6,163,15,165,27,165,42,163,56,151,64,144,66,134,60" />
    <area alt="Left Patella Tendon" title="Left Patella Tendon" href="#" class="L-Patella" color="#081" shape="poly" coords="167,361,197,360,196,374,170,375" />
    <area alt="Left Quadriceps Tendon" title="Left Quadriceps Tendon" href="#" class="L-Quadriceps-Tendon" color="#082" shape="poly" coords="200,358,164,359,171,347,191,347" />
    <area alt="Right Patella Tendon" title="Right Patella Tendon" href="#" class="R-Patella" color="#083" shape="poly" coords="117,375,107,382,102,381,98,370,93,360,122,362" />
    <area alt="Right Quadriceps Tendon" title="Right Quadriceps Tendon" href="#" class="R-Quadriceps-Tendon" color="#084" shape="poly" coords="120,359,92,358,98,344,120,344" />
    <area alt="Right Psoas/Hip flexor" title="Right Psoas/Hip flexor" href="#" class="r-Psoas" color="#085" shape="poly" coords="120,206,105,205,104,224,128,235" />
    <area alt="Left Psoas/Hip flexor" title="Left Psoas/Hip flexor" href="#" class="l-Psoas" color="#086" shape="poly" coords="187,199,169,204,164,231,187,221" />
    <area alt="Right Ankle" title="Right Ankle" href="#" class="R-Ankle" color="#089" shape="poly" coords="504,475,486,475,487,493,502,494" />
    <area alt="Left Ankle " title="Left Ankle" href="#" class="L-Ankle" color="#088" shape="poly" coords="431,476,412,476,412,494,431,494" />
    <area alt="Head" title="Head" href="#" class="Head" color="#078" shape="poly" coords="439,27,441,14,452,9,464,9,473,16,478,27,477,40,477,51,476,58,472,63,443,63,441,58,437,45,437,34" />
    <area shape="default" nohref>
</map>
<br><br>
<label class="control-label">
    Additional Information
    <div class="checkbox-inline">
        <textarea rows="4"name="info" style="width: <%- screen-50 %>px"></textarea>
    </div>
</label>
<br><br>
<input type="submit" value="Submit">
</form>