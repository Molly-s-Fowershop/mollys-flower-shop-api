import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, Notification } from '.';

@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  notificationId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userNotification)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(
    () => Notification,
    (notification) => notification.userNotification,
  )
  @JoinColumn({ name: 'notificationId' })
  notification: Notification;

  constructor(item: Partial<UserNotification>) {
    Object.assign(this, item);
  }
}
