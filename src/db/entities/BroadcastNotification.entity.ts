import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Notification } from '.';

@Entity()
export class BroadcastNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  expiresAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => Notification,
    (notification) => notification.broadcastNotification,
  )
  @JoinColumn({ name: 'notificationId' })
  notification: Notification;

  constructor(item: Partial<BroadcastNotification>) {
    Object.assign(this, item);
  }
}
