export interface Task {
  user_id: number;
  task_id: number;
  message: string;
  description: string;
}

export class TaskDTO {
  userId: number;
  taskId: number;
  message: string;
  description: string;

  constructor(task: Task) {
    this.userId = task.user_id;
    this.taskId = task.task_id;
    this.description = task.description;
    this.message = task.message;
  }
}
