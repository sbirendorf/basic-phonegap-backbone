define(["app",
    "tpl!apps/health/templates/health_page.tpl",
  //  "tpl!apps/health/templates/health_modal_select.tpl"
],
        function (SpartaMain, TeamFormTpl) {
            SpartaMain.module("Health.HealthPage", function (HealthPage, SpartaMain, Backbone, Marionette, $, _) {

                HealthPage.AthleteGrid = Marionette.ItemView.extend({
                    template: TeamFormTpl,
                    className: 'container',
                    onShow: function () {
                    $('#search-criteria').on('input', function() {
                            $('.row-player').hide();
                            var txt = $('#search-criteria').val();
                            $('.row-player').each(function(){
                                if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
                                    $(this).show();
                                }
                            });
                       });
                    }
                });

            });
            return SpartaMain.Health.HealthPage;
        });

