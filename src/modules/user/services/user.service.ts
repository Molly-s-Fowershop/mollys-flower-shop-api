import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserDto } from '../dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserEvent } from '@modules/user/events/create-user.event';
import { NotificationService } from '@/modules/notification/services';
import { User, Cart, Wishlist } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private eventEmitter: EventEmitter2,
    private notificationService: NotificationService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['cart', 'wishlist'],
    });

    return {
      data: users,
      meta: {
        count: users.length,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new NotFoundException('User with provided id was not found');

    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);

    this.eventEmitter.emit('user.created', new CreateUserEvent(user));

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.userRepository.delete(id);
  }

  @OnEvent('user.created')
  async initialize({ user }: CreateUserEvent) {
    await this.cartRepository.save({
      user: {
        id: user.id,
      },
    });

    await this.wishlistRepository.save({
      user: {
        id: user.id,
      },
    });

    await this.notificationService.sendWelcomeNotifications(user);
  }
}
