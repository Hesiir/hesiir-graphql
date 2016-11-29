export type NumericDate = any;
export type jwtRegisteredType = {
    iss?:String,
    sub?:String,
    aud?:String,
    jti?:String,
    exp?:NumericDate,
    nbf?:NumericDate,
    iat?:NumericDate
};