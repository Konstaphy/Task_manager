export interface Task {
  user_id: number;
  task_id: number;
  message: string;
  description: string;
  completed: boolean;
}

export class TaskRequestDTO {
  userId: number;
  message: string;
  description: string;
  constructor(task: Task) {
    this.userId = task.user_id;
    this.description = task.description;
    this.message = task.message;
  }
}

export class TaskDTO extends TaskRequestDTO {
  taskId: number;
  completed: boolean;

  constructor(task: Task) {
    super(task);
    this.taskId = task.task_id;
    this.completed = task.completed;
  }
}
