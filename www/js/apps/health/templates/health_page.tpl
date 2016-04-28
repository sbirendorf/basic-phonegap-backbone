  <!-- Page Content -->
    <div class="container">

        <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Health 
                    <small></small>
                </h1>
                <div style="display:inline-block">
                    <label>Search:<input style="display:inline-block" type="text" id="search-criteria"/></label>
                </div>
            </div>
        </div>


            <% _(data).each(function(ath) { %>
            <div class="row-player">
            <div class="grid-tumb health-grid">
                 <div class="col-md-3 portfolio-item">
                    <div style="width: 127px;color: white; float:right;margin-right: -5px;font-size: 11px">
                        
                        <a class="btn btn-success screen"style="width: 80px;height: 18px;padding: 3px;" href="#enter/screen/<%= ath.uid %>">Screen</a> <br>Last entry:<%= ath.screen %><br>
                        <a class="btn btn-success well"style="width: 80px;height: 18px;padding: 3px;" href="#enter/wellness/<%= ath.uid %>">Wellness</a> <br>Last entry:<%= ath.wellness %><br>
                        <a class="btn btn-success regen"style="width: 80px;height: 18px;padding: 3px;" href="#enter/regen/<%= ath.uid %>">Regen</a><br>Last entry:<%= ath.regen %><br>
                        <a class="btn btn-success weight"style="width: 80px;height: 18px;padding: 3px;margin-top: 5px;" href="#enter/weight/<%= ath.uid %>">Weight</a><br>
                        <a class="btn btn-success rpe"style="width: 80px;height: 18px;padding: 3px;margin-top: 5px;" href="#enter/rpe/<%= ath.uid %>">R.P.E</a><br>
                         
                     </div>
                    <a href="index#athlete_home/<%- ath.uid %>" class="js-ath">
                        <% if(ath.img == '') { %>
                             <img class="media-object" src="/sites/all/themes/open_framework-6/backbone/images/anon_user.png"style="width:125px;height:125px; border-radius: 5px;">

                            <% }else { %>
                             <img class="media-object" src="<%= ath.img %>"style="width:125px;height:125px; border-radius: 5px;">
                             <%  }%><br><center class="health-ath-name"><%= ath.title %></center>
                    </a><br>

                </div>
            </div>
            </div>
            <% }); %>
           

    </div>
    <!-- /.container -->