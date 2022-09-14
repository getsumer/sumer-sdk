export declare type eipError = {
    statusCode: number;
    name: string;
    description: string;
};
export declare const eipErrors: eipError[];
export declare const findEipError: (eipCode: number) => eipError;
