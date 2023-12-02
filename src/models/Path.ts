import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { PathAttributes, PathInput } from "../interfaces/path.interface";
import Municipio from "./municipio.model";


class Path extends Model<PathAttributes, PathInput> implements PathAttributes {
    id!: number;
    name!: string;
    municipioId!: number;
    status!: "active" | "deleted";

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    // public readonly users?: User[];
    // public readonly users?: User[];
    // public readonly zones?: Zones[];

    // declare getUsers: BelongsToManyGetAssociationsMixin<User>;
    // declare removeUser: BelongsToManyRemoveAssociationMixin<User, User>
    // declare addUser: BelongsToManyAddAssociationMixin<User, 'id'>

    // public static associate(models: any):void {
    //     Path.belongsToMany(models.User, {through: 'PathAndUser'});
    // }

    // declare users?: NonAttribute<User[]>;

//     declare public static associations: { 
//         users: Association<Path, User>; };
// }
}
Path.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    municipioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'deleted']
    }
}, 
{
    timestamps: true,
    sequelize: sequelize,
    // paranoid: true
});

// Municipio.belongsTo(Path, {foreignKey: 'municipioId'})
Path.belongsTo(Municipio, {foreignKey: 'municipioId'})

// Path.belongsToMany(User, {through: "PathAndUser"})
// Path.hasMany(Zones, {foreignKey: 'idpath'});
// Zones.belongsTo(Path, {foreignKey: 'idpath'});

// Path.hasMany(Zones);

export default Path;