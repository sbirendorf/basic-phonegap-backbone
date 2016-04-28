define(["app"], function (SpartaMain) {
    SpartaMain.module("SchedulesEntities", function (SchedulesEntities, SpartaMain, Backbone, Marionette, $, _) {
        SchedulesEntities.returnSchedule = Backbone.Model.extend({
            defaults: {
                error: ""
            },
            initialize: function () {
            }
        });
        SchedulesEntities.ScheduleForm = Backbone.Model.extend({
            defaults: {
                nid: "",
                name: "",
                strDate: "",
                endDate: "",
                levProgress: "",
                linPeriod: "",
                strLevelLow: "",
                tempNid: "",
                notActiveAth: "",
                activeAth: "",
                allTemp: "",
                type: ""
            },
            validate: function (attribs) {
                var errors = {};
                if (attribs.name === '') {
                    errors.name = "Name is required field.";
                }
                if (!attribs.activeTm && !attribs.activeAth && !attribs.groups) {
                    errors.team_managers = "The schaedule must be assigned to athletes, groups or teams";
                }
                if (!attribs.endDate || !attribs.strDate) {
                    errors.athletes = "Date is required field.";
                }
                if (attribs.strDate > attribs.endDate) {
                    errors.athletes = "Start Date can not be after the end date.";
                }
                if (attribs.tempNid[0] === '') {
                    errors.athletes = "Template is required field.";
                }
                if (attribs.tempDay[0] === '') {
                    errors.athletes = "Template day is required field.";
                }
                if (attribs.linPeriod == true && (attribs.strLevelLow != '' || attribs.strLevelUp != '' || attribs.daysProgress != '')) {
                    errors.progress = "Please choose EITHER automated progression setting OR choose linear periodization (only applies to merit progression).";
                }
                
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        var API = {
            saveSchedule: function (data) {
                var defer = $.Deferred();
                var newData = new SchedulesEntities.ScheduleForm(data, {validate: true});
                if (newData.validationError) {
                    var rtnData = new SchedulesEntities.returnSchedule();
                    rtnData.set({'data': {'msg': newData.validationError, 'class': 'alert-danger'}, 'error': true});
                    defer.resolve(rtnData);
                }
                else {
                    var json = JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/save_schedule',
                        data: {"data": json},
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                        var rtnData = new SchedulesEntities.returnSchedule();
                        rtnData.set(Data);
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function (jqXHR, textStatus, errorThrown) {
                        defer.reject(errorThrown);
                    });
                }

                return defer.promise();
            }
        };
        SpartaMain.reqres.setHandler("schedule:saveForm", function (data) {
            return API.saveSchedule(data);
        });
    });
    return;
});