<form class='screen-form'>
    <div class="hide">
        <input name="uid" type="numeric" value="<%= uid %>" />
    </div>
    <br>
    <h4>Create Regen</h4>
    <div class="form-error"></div>
    <br>


    <div class="control-group">
        <label for="pre-season" class="control-label">
            Log Date:
            <input id="regen-date" name="date" required
               type="text" value="<%= today %>" class="js-datepicker"/>
        </label>
    </div>
     <div class="control-group">
        <label for="Prevent" class="control-label">
            Prevent:
            <br><label class="option" for="Release-Upper"><input type="checkbox" name="prevent_upper" id="prevent"  value="Release Upper" class="form-checkbox"> <img id="img-upper" src="/sites/all/themes/icons/icon_upper.png" title="Roll Upper 10 minutes">Upper</label>
            <br><label class="option" for="Release-Lower"><input type="checkbox" name="prevent_lower" id="prevent" value="Release Lower" class="form-checkbox"> <img id="img-lower" src="/sites/all/themes/icons/icon_regen_lowerbody.png" title="Roll Lower 10 minutes">Lower</label>
            <br><label class="option" for="Activate"><input type="checkbox" name="prevent_activate" id="prevent" value="Activate" class="form-checkbox"> <img id="img-activate" src="/sites/all/themes/icons/icon_regen_activate.png" title=" Activate - Knee-up hold, Side bridge, Wall-slide">Activate</label>
            <br><label class="option" for="Stretch"><input type="checkbox" name="prevent_stretch" id="prevent" value="Stretch" class="form-checkbox"> <img id="img-stretch" src="/sites/all/themes/icons/icon_regen_stretch.png" title="Stretch - Heel press, Rotational lunge, Heel sit rotation">Stretch</label>
        </label>
    </div>
      <div class="control-group">
          <label>Sleep:</label>
            <select name="sleep">
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>  
         </select>
    </div>
     <div class="control-group">
            <label>Servings Protein (g - grams):</label>
             <select name="protein">
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
                <option value="225">225</option>
                <option value="250">250</option>
                <option value="275">275</option>
                <option value="300">300</option>
                <option value="225">325</option>
                <option value="250">350</option>
                <option value="275">375</option>
                <option value="300">400</option>
         </select>
         </div>
    </div>
     <div class="control-group">
            <label> Servings Vegetables:</label>
            <select name="veg">
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
            <label > Servings Water:</label>
                <select name="water">
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
    


<br><br>
<input type="submit" value="Submit"><br><br>
</form>