import { Controller, Get, Post, Delete, Put, Body, Param, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.taskService.findOne(id);
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        return await this.taskService.create(body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.taskService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        return await this.taskService.update(id, body);
    }
}