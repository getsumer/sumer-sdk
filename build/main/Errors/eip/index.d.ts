export interface EipError {
    statusCode: number;
    name: string;
    description: string;
}
export declare const eipErrors: EipError[];
export declare const findEipError: (eipCode: number) => EipError;
