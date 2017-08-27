import { Move } from './move';
import { User } from './user';

export class Round {
  _id?: string;
  name: string;
  moveUser1: Move;
  moveUser2: Move;
  winUser: User;
  move: Move[];
  createdDate: string;
}
