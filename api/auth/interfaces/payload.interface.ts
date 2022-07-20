import { JwtPayload } from 'jsonwebtoken';

export interface IPayloadForgot extends JwtPayload {
    id?: string
}
