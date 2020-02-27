import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from'bcrypt';
import { Task } from "src/tasks/task.entity";
import { Logger } from "@nestjs/common";

@Entity()


@Unique(['username'])
export class User extends BaseEntity{
    private logger = new Logger('User');

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, { eager: true } )
    tasks: Task[];
    
    async validatePassword(password:string): Promise<boolean> {
        const hack = await bcrypt.hash(password,this.salt);
        return hack === this.password;
    }

}