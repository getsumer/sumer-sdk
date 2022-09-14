"use strict";
//https://eips.ethereum.org/EIPS/eip-1474
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCErrorsEip1474 = void 0;
exports.RPCErrorsEip1474 = [
    { statusCode: -32700, name: "Parse error", description: "Invalid JSON" },
    { statusCode: -32600, name: "Invalid request", description: "JSON is not a valid request object" },
    { statusCode: -32601, name: "Method not found", description: "Method does not exist" },
    { statusCode: -32602, name: "Invalid params", description: "Invalid method parameters" },
    { statusCode: -32603, name: "Internal error", description: "Internal JSON - RPC error" },
    { statusCode: -32000, name: "Invalid input", description: "Missing or invalid parameters" },
    { statusCode: -32001, name: "Resource not found	", description: "Requested resource not found" },
    { statusCode: -32002, name: "Resource unavailable", description: "Requested resource not available	" },
    { statusCode: -32003, name: "Transaction rejected", description: "Transaction creation failed" },
    { statusCode: -32004, name: "Method not supported", description: "Method is not implemented" },
    { statusCode: -32005, name: "Limit exceeded", description: "Request exceeds defined limit" },
    { statusCode: -32006, name: "JSON-RPC version not supported	", description: "Version of JSON - RPC protocol is not supported" }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQ3NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FcnJvcnMvZWlwLzE0NzQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7O0FBSzVCLFFBQUEsZ0JBQWdCLEdBQW9CO0lBQzdDLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtJQUN4RSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLG9DQUFvQyxFQUFFO0lBQ2xHLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUU7SUFDdEYsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRTtJQUN4RixFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixFQUFFO0lBQ3hGLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLCtCQUErQixFQUFFO0lBQzNGLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsOEJBQThCLEVBQUU7SUFDaEcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLFdBQVcsRUFBRSxtQ0FBbUMsRUFBRTtJQUN0RyxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLDZCQUE2QixFQUFFO0lBQ2hHLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUU7SUFDOUYsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSwrQkFBK0IsRUFBRTtJQUM1RixFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsV0FBVyxFQUFFLGlEQUFpRCxFQUFFO0NBQ2xJLENBQUEifQ==