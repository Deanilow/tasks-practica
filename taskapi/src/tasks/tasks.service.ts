import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Task } from '../schemas/task.schema'
import { Model } from 'mongoose'
import { CreateTaskDto } from '../dto/create-task.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) { }

    async findAll(): Promise<Task[]> {
        return await this.TaskModel.find();
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const existTask = await this.TaskModel.findOne({ title: createTaskDto.title });

        if (existTask) throw new HttpException('La tarea ya existe', HttpStatus.CONFLICT);

        const newTask = new this.TaskModel(createTaskDto);

        const savedTask = await newTask.save();

        return savedTask;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const updatedTask = await this.TaskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });

        if (!updatedTask) throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);

        return updatedTask;
    }
    1
    async findOne(id: string): Promise<Task> {
        const task = await this.TaskModel.findById(id);

        if (!task) throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);

        return task;
    }

    async delete(id: string): Promise<Task> {
        const deletedTask = await this.TaskModel.findByIdAndDelete(id);

        if (!deletedTask) throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);

        return deletedTask;
    }
}