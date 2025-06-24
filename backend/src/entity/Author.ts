import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Course } from './Course.js';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @ManyToMany(() => Course, (course) => course.authors, {
        cascade: ['insert', 'update', 'soft-remove', 'recover'],
    })
    @JoinTable()
    courses: Course[];
}
