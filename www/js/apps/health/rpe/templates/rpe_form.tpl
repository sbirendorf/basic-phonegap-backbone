<form class='screen-form'>
    <div class="hide">
        <input name="uid" type="numeric" value="<%= uid %>" />
    </div>
    <br>
    <h4>Create R.P.E</h4>
    <div class="form-error"></div>
    <br>
    <div class="control-group">
        <label class="control-label">
            Log Date:
                <input  name="date" required type="text" value="<%= now %>" class="js-datepicker"/>           
        </label>
    </div>

	
      <div class="control-group">
          <label>Choose R.P.E. Value. 0 is complete rest, 10 maximal exertion:</label>
            <select name="rpe">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>  
                <option value="3">3</option> 
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
         </select>
    </div>
     <div class="control-group">
            <label>Select the type of R.P.E:</label>
             <select name="type">
                <option value="Practice">Practice</option>
                <option value="Game">Game</option>
                <option value="Strenght Training">Strength Training</option>
                <option value="Conditioning">Conditioning</option>
                <option value="Cross Training">Cross Training</option>
                <option value="Rehab">Rehab</option>
                <option value="Fitness Test">Fitness Test</option>
                <option value="Mongrel">Mongrel</option>
                <option value="Other">Other</option>
         </select>
         </div>
    </div>
    <div class="control-group">
            <label> Enter Duration minutes: </label>
            <input type="number" name="duration">
    </div>
  
    


<br><br>
<input type="submit" value="Submit"><br><br>
</form>