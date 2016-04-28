define(["app",
    "tpl!apps/health/regen/templates/regen_Itemview.tpl",
    "tpl!apps/health/regen/templates/homepage_layout.tpl"],
        function (SpartaMain, regen_ItemviewTpl, regen_LayoutwTpl) {
            SpartaMain.module("ContactsApp.Regen", function (Regen, SpartaMain, Backbone, Marionette, $, _) {

                Regen.BarChartView = Marionette.ItemView.extend({
                    className: 'regen_item',
                    template: regen_ItemviewTpl,
                    tagName: "tr",
                    initialize: function (options) {
                            var type = options.parm.type;
                            var theData = options.model.toJSON();
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'Date');
                            data.addColumn('number', options.parm.setting);
                            $(theData['date']).each(function (i,index) {
                                data.addRows([[index, Number(theData[type][i])]]);
                            });
                            //  var tscore_max=Math.max(the_scan_data[scan_number].load,the_scan_data[scan_number].explode,the_scan_data[scan_number].drive);
                            var options = {width: 285, height: 300,
                                //   vAxis: {title: '',maxValue:10, minValue:20},
                                hAxis: {title: options.parm.title, titleTextStyle: {color: 'black', fontSize: 15}},
                                legend: {position: 'top'},
                                colors: [options.parm.color]};

                            var chart = new google.visualization.ColumnChart(document.getElementById(type + '_chart'));
                            chart.draw(data, options);
                    }
                    
                });
                Regen.LineChartView = Marionette.ItemView.extend({
                    className: 'regen_item',
                    template: regen_ItemviewTpl,
                    tagName: "tr",
                    initialize: function (options) {
                        var type = options.parm.type;
                        var theData = options.model.toJSON();
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'Date');
                            data.addColumn('number', options.parm.setting);
                            $.each(theData.score, function (i,index) {
                                data.addRows([[index.date, Number(index.value)]]);
                            });
                            var options = {width: 700, height: 300,
                             //   vAxis: {title: '',maxValue:10, minValue:20},
                             hAxis: {title: options.parm.title, titleTextStyle: {color: 'black', fontSize: 15}},
                             legend: {position: 'top'},
                             colors: [options.parm.color]};

                            var chart = new google.visualization.LineChart(document.getElementById(type + '_chart'));
                            chart.draw(data, options);
                    },
                    onRender: function (options) {
                    }
                });
                Regen.RollOutView = Marionette.ItemView.extend({
                    template: regen_ItemviewTpl,
                    onShow: function (options) {
                        var type = options.options.parm.type;
                        var theData = options.options.model.toJSON();
                        var flag=false;
                        $(theData['date']).each(function (i,index) {
                            var upper = '', lower = '', active = '', stretch = '';
                            if (theData['upper'][i] == 1) {
                                upper = "<li><img src='/sites/all/themes/icons/icon_upper.png'> Upper</li>";
                                flag=true;
                            }
                            if (theData['lower'][i] == 1) {
                                lower = "<li><img src='/sites/all/themes/icons/icon_regen_lowerbody.png'> Lower</li>";
                                flag=true;
                            }
                            if (theData['activate'][i] == 1) {
                                active = "<li><img src='/sites/all/themes/icons/icon_regen_activate.png'> Activate</li>";
                                flag=true;
                            }
                            if (theData['stretch'][i] == 1) {
                                stretch = "<li><img src='/sites/all/themes/icons/icon_regen_stretch.png'> Stretch</li>";
                                flag=true;
                            }
                            //if we have value print to screen
                            if(flag){
                                $('#roll-region').append("<div class='roll-wrapper" + index + "'><ul class='regen-roll-list'><li>Date:" +
                                        index + "</li>" + upper + lower + active + stretch + "</ul></div>");
                            }
                            flag=false;
                        });
                    }
                });
                Regen.PanelLayout = Marionette.LayoutView.extend({
                    template: regen_LayoutwTpl,
                    className: 'regen_layout',
                    tagName: 'ul',
                    regions: {
                        scoreRegion: "#score-region",
                        sleepRegion: "#sleep-region",
                        vegeRegion: "#vege-region",
                        proteinRegion: "#protein-region",
                        waterRegion: "#water-region",
                        rollRegion: "#roll-region"
                    }
                });
            });
            return SpartaMain.ContactsApp.Regen;
        });