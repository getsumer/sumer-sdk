class Api {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEdBQUc7SUFDTCxNQUFNLENBQUMsU0FBUyxDQUFNO0lBQ2QsT0FBTyxDQUFLO0lBQ3BCLFlBQVksR0FBVztRQUNuQixJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUE7U0FDdkI7UUFDRCxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLFVBQVUsR0FBRyxFQUFFO1NBQ2pDLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0NBR0oifQ==