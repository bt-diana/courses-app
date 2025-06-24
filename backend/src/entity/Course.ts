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

    @Column({ nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column({ nullable: false })
    creationDate: Date;

    @Column({ nullable: false })
    duration: number;

    @ManyToMany(() => Author, (author) => author.courses, {
        nullable: false,
        cascade: true,
    })
    @JoinTable()
    authors: Author[];
}
