import bowser from 'bowser';
export class NotifyApi {
    client;
    constructor(client) {
        this.client = client;
    }
    error(msg) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        };
        console.log(log, this.client);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBTTNCLE1BQU0sT0FBTyxTQUFTO0lBQ1YsTUFBTSxDQUFLO0lBQ25CLFlBQVksTUFBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBQ00sS0FBSyxDQUFDLEdBQWtDO1FBQzNDLE1BQU0sR0FBRyxHQUFHO1lBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3BCLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVPLElBQUk7UUFDUixJQUFJLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFO1lBQzlCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ2xEO1FBRUQsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0NBQ0oifQ==