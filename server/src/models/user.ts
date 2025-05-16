import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// TODO: Define attributes for full User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

// TODO: Define which attributes are optional when creating a user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// TODO: Extend Sequelize Model for strong typing and add helper methods
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // NOTE Reusable password hashing logic (called by Sequelize hooks)
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// TODO: Create and initialize the Sequelize model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        // TODO: Automatically hash password on creation
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        // TODO: Rehash password only if it was changed
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  // NOTE Return typed model for use in other modules
  return User;
}
