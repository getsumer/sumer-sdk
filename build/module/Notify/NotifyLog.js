import bowser from 'bowser';
export class NotifyLog {
    error(msg) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        };
        console.error(log);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBTTNCLE1BQU0sT0FBTyxTQUFTO0lBRVgsS0FBSyxDQUFDLEdBQWtDO1FBQzNDLE1BQU0sR0FBRyxHQUFHO1lBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3BCLENBQUE7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXRCLENBQUM7SUFFTyxJQUFJO1FBQ1IsSUFBSSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUVELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKIn0=