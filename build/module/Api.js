export class Api {
    static _instance;
    headers;
    constructor(key) {
        if (Api._instance) {
            return Api._instance;
        }
        Api._instance = this;
        this.headers = {
            Authorization: `Bearer ${key}`
        };
        console.log(this.headers);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sR0FBRztJQUNaLE1BQU0sQ0FBQyxTQUFTLENBQU07SUFDZCxPQUFPLENBQUs7SUFDcEIsWUFBWSxHQUFXO1FBQ25CLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQTtTQUN2QjtRQUNELEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsVUFBVSxHQUFHLEVBQUU7U0FDakMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FHSiJ9