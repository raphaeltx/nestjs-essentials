import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Tasks',
    description: 'Lista tasks por usuário.',
  })
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}.`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Search task',
    description: 'Busca task por id.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da task.',
  })
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'New task',
    description: 'Cria task.',
  })
  @ApiBody({
    type: CreateTaskDto,
    required: true,
  })
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );

    return this.tasksService.createTask(createTaskDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete task',
    description: 'Remove uma task por id.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da task.',
  })
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update task status',
    description: 'Atualiza status da task por id.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da task.',
  })
  @ApiBody({
    type: UpdateTaskStatusDto,
    required: true,
  })
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
