import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import {Optional} from 'sequelize'

export interface UserAttributes {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    dni: string;
    phone: string;
    device: string;
    address: string;
    type: 'owner' | 'customer' | 'drive';
    status: 'active' | 'banned' | 'deleted',
    createAt?: Date;
    updateAt?: Date;

}

export interface UserInput extends Optional<UserAttributes, 'id' | 'lastName' | 'dni' > {}
export interface UserOuput extends Required<UserAttributes> {}

export interface RequestUser extends Request {
    user?: JwtPayload | {id: number, type: string}
}