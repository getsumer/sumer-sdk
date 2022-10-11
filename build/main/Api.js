"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
class Api {
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
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLEdBQUc7SUFHWixZQUFZLEdBQVc7UUFDbkIsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFBO1NBQ3ZCO1FBQ0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxVQUFVLEdBQUcsRUFBRTtTQUNqQyxDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0IsQ0FBQztDQUdKO0FBZkQsa0JBZUMifQ==