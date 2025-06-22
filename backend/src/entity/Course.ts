import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Author } from './Author.js';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    creationDate: Date;

    @Column()
    duration: number;

    @ManyToMany(() => Author)
    @JoinTable()
    authors: Author[];
}
