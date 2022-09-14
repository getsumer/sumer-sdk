import Bowser from "bowser";
export class Notify {
    static meta() {
        if (window?.navigator?.userAgent) {
            return Bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
    static error(msg) {
        if (process.env.NODE_ENV !== 'test') {
            const log = {
                message: msg.toString(),
                timestamp: Date.now(),
                wallet: msg.address,
                meta: this.meta()
            };
            console.error(log);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL05vdGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsTUFBTSxPQUFPLE1BQU07SUFFUCxNQUFNLENBQUMsSUFBSTtRQUNmLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQWtDO1FBRTNDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBRWpDLE1BQU0sR0FBRyxHQUFHO2dCQUNSLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTthQUNwQixDQUFBO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNyQjtJQUNMLENBQUM7Q0FDSiJ9