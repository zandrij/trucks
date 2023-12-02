import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import Path from "./Path";
import User from "./user";
import Truck from "./truck.model";
import { PaymentAttributes, PaymentInput } from "../interfaces/payment.interface";
import Day from "./day.model";


class Payment extends Model<PaymentAttributes, PaymentInput> implements PaymentAttributes {
    id!: number;
    iduser!: number;
    idday!: number;
    reference!: string;
    image!: string;
    amount!: number;
    type!: "cash" | "transfer" | "mobile" | "binance" | "zelle";
    status!: "wait" | "paid" | "reject" | "aproved" | "cancel";

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public path?: Path;
    public user?: User;
    public truck?: Truck;

}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idday: {
        type: DataTypes.INTEGER
    },
    iduser: {
        type: DataTypes.INTEGER
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ['mobile', 'cash', 'transfer',  'binance' , 'zelle'],
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['wait', 'paid', 'reject', 'aproved', 'cancel']
    },
}, {
    timestamps: true,
    sequelize,
    // paranoid: true
});

Payment.belongsTo(User, {foreignKey: 'iduser', as: 'client'})
Payment.belongsTo(Day, {foreignKey: 'idday'})
Day.hasMany(Payment, {foreignKey: 'idday'})
User.hasMany(Payment, {foreignKey: 'iduser'})
// Day.belongsTo(User, {foreignKey: 'iddrive'})

export default Payment;