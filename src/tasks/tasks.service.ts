import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    // const taskObject = {
    //   id: string,
    //   title: title,
    //   description: description,
    //   status: TaskStatus.OPEN,
    // };

    return null;
  }
}
