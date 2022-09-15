"use strict";
// https://eips.ethereum.org/EIPS/eip-1474
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCErrorsEip1474 = void 0;
exports.RPCErrorsEip1474 = [
    { statusCode: -32700, name: 'Parse error', description: 'Invalid JSON' },
    { statusCode: -32600, name: 'Invalid request', description: 'JSON is not a valid request object' },
    { statusCode: -32601, name: 'Method not found', description: 'Method does not exist' },
    { statusCode: -32602, name: 'Invalid params', description: 'Invalid method parameters' },
    { statusCode: -32603, name: 'Internal error', description: 'Internal JSON - RPC error' },
    { statusCode: -32000, name: 'Invalid input', description: 'Missing or invalid parameters' },
    { statusCode: -32001, name: 'Resource not found	', description: 'Requested resource not found' },
    { statusCode: -32002, name: 'Resource unavailable', description: 'Requested resource not available	' },
    { statusCode: -32003, name: 'Transaction rejected', description: 'Transaction creation failed' },
    { statusCode: -32004, name: 'Method not supported', description: 'Method is not implemented' },
    { statusCode: -32005, name: 'Limit exceeded', description: 'Request exceeds defined limit' },
    { statusCode: -32006, name: 'JSON-RPC version not supported	', description: 'Version of JSON - RPC protocol is not supported' }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQ3NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FcnJvcnMvZWlwLzE0NzQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBDQUEwQzs7O0FBSTdCLFFBQUEsZ0JBQWdCLEdBQWU7SUFDMUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0lBQ3hFLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsb0NBQW9DLEVBQUU7SUFDbEcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRTtJQUN0RixFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixFQUFFO0lBQ3hGLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUU7SUFDeEYsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsK0JBQStCLEVBQUU7SUFDM0YsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSw4QkFBOEIsRUFBRTtJQUNoRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLG1DQUFtQyxFQUFFO0lBQ3RHLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsNkJBQTZCLEVBQUU7SUFDaEcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRTtJQUM5RixFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLCtCQUErQixFQUFFO0lBQzVGLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxXQUFXLEVBQUUsaURBQWlELEVBQUU7Q0FDaEksQ0FBQSJ9