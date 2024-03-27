import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserNotification, BroadcastNotification } from '.';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  sentAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.notification,
  )
  userNotification: UserNotification[];

  @OneToMany(
    () => BroadcastNotification,
    (broadcastNotification) => broadcastNotification.notification,
  )
  broadcastNotification: BroadcastNotification[];

  constructor(item: Partial<Notification>) {
    Object.assign(this, item);
  }
}
