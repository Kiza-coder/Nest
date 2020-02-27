import {  TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Body, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}


    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilter,
        @GetUser() user:User): Promise<Task[]> {
            this.logger.verbose(`User "${user.username}" retrieveing all tasks !
             Filters :${JSON.stringify(filterDto)}`);
            return this.tasksService.getTasks(filterDto,user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User): Promise<Task> {
            return this.tasksService.getTaskById(id,user); 
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
            this.logger.verbose(`User "${user.username}" creating a new Task!!!`) ;
            return this.tasksService.createTask(createTaskDto,user);
    }


    @Delete('/:id')
    deleteTaskById(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User): Promise<void> {
            return this.tasksService.deleteTask(id,user);
    }



    @Patch('/:id/status')
    updateTaskById(
        @Param('id',ParseIntPipe) id:number,
        @Body('status',TaskStatusValidationPipe) status:TaskStatus,
        @GetUser() user:User): Promise<Task> {
            return this.tasksService.updateTaskStatus( id, status,user );
    }


   
}
