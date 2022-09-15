"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DappSonar_1 = require("../DappSonar");
const NotifyApi_1 = require("../Notify/NotifyApi");
const NotifyLog_1 = require("../Notify/NotifyLog");
const NotifyVoid_1 = require("../Notify/NotifyVoid");
const typedi_1 = require("typedi");
typedi_1.Container.set('Api', () => new Api(DappSonar_1.DappSonar.apikey));
typedi_1.Container.set('Notify', (() => {
    if (process.env.NODE_ENV === 'test') {
        return new NotifyVoid_1.NotifyVoid();
    }
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
        return new NotifyApi_1.NotifyApi(typedi_1.Container.get('Api'));
    }
    return new NotifyLog_1.NotifyLog();
})());
exports.default = typedi_1.Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUHJvdmlkZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXlDO0FBRXpDLG1EQUFnRDtBQUNoRCxtREFBZ0Q7QUFDaEQscURBQWtEO0FBQ2xELG1DQUFtQztBQUduQyxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBUSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBRTNELGtCQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQVcsRUFBRTtJQUNsQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxPQUFPLElBQUksdUJBQVUsRUFBRSxDQUFBO0tBQzFCO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxxQkFBUyxDQUFDLGtCQUFTLENBQUMsR0FBRyxDQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFDRCxPQUFPLElBQUkscUJBQVMsRUFBRSxDQUFBO0FBQzFCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUdOLGtCQUFlLGtCQUFTLENBQUEifQ==