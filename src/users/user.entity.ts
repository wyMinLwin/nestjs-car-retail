import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted the user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated the user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed the user with id', this.id);
  }
}
