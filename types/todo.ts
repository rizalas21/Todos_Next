export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date | null;
  userid: string;
  createdAt?: Date;
  updatedAt?: Date;
}
