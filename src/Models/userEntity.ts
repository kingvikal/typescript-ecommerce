import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  firstname: string;

  @Column({ length: 20 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  userType: UserRole;
}
