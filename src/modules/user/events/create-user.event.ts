import { User } from '@/db/entities';

export class CreateUserEvent {
  user: User;

  constructor(props: User) {
    this.user = props;
  }
}
