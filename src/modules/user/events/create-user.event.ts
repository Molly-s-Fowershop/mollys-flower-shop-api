import { User } from '@prisma/client';

export class CreateUserEvent {
  user: User;

  constructor(props: User) {
    this.user = props;
  }
}
