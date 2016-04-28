<form class='screen-form'>
    <div class="hide">
        <input name="uid" type="numeric" value="<%= uid %>" />
    </div>
    <br>
    <h4>Create Screen</h4>
    <div class="form-error"></div>
    <br>
    <% _(data).each(function(key,q) { %>
     <div class="hide">
        <input name="screen_nid[]" type="numeric" value="<%= key.nid %>" />
    </div>
    <fieldset class="scheduler-border">
    <label><%= key.title %>  </label><br><br>  
        <div class="form-group">
          Left
          <input type="number" step="0.5" style="width: 50px;margin: 5px;"name="left[]" class="form-control"  >
          Right
          <input type="number" step="0.5" style="width: 50px;margin: 5px;"name="right[]" class="form-control"  >
          Total
          <input type="number" step="0.5" style="width: 50px;margin: 5px;" name="total[]" class="form-control"  >
        </div>
    </fieldset>
    <% }); %>

<br><br>
<input type="submit" value="Submit">
</form>