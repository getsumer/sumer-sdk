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
            metadata: this.meta()
        };
        this.client.send(log);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBSzNCLE1BQU0sT0FBTyxTQUFTO0lBQ1YsTUFBTSxDQUFLO0lBQ25CLFlBQVksTUFBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBQ00sS0FBSyxDQUFDLEdBQWtDO1FBQzNDLE1BQU0sR0FBRyxHQUFHO1lBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRU8sSUFBSTtRQUNSLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7Q0FDSiJ9