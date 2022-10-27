import bowser from 'bowser';
export class NotifyLog {
    txHash(message) {
        console.log("txHash Log:", message);
    }
    providerError(message) {
        console.log("providerError Log:", message);
    }
    error(msg) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        };
        console.error("error log: ", log);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBSzNCLE1BQU0sT0FBTyxTQUFTO0lBRWxCLE1BQU0sQ0FBQyxPQUFzQjtRQUV6QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQXNCO1FBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFrQztRQUMzQyxNQUFNLEdBQUcsR0FBRztZQUNSLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUNwQixDQUFBO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFFckMsQ0FBQztJQUVPLElBQUk7UUFDUixJQUFJLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFO1lBQzlCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ2xEO1FBQ0QsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0NBQ0oifQ==