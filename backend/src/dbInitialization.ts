import { Course } from './entity/Course.js';
import { Author } from './entity/Author.js';
import AppDataSource from './dataSource.js';

const authors = [
    {
        name: 'Vasiliy Dobkin',
    },
    {
        name: 'Nicolas Kim',
    },
    {
        name: 'Anna Sidorenko',
    },
    {
        name: 'Valentina Larina',
    },
];

const courses = [
    {
        title: 'JavaScript',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        creationDate: new Date(2021, 2, 8),
        duration: 160,
        authorsIndexes: [1, 0, 2, 3],
    },
    {
        title: 'React',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        creationDate: new Date(2025, 3, 11),
        duration: 610,
        authorsIndexes: [1, 3],
    },
    {
        title: 'Angular',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        creationDate: new Date(2020, 10, 10),
        duration: 210,
        authorsIndexes: [2, 3],
    },
];

AppDataSource.initialize()
    .then(async () => {
        await Promise.all(
            authors.map(async ({ name }) => {
                console.log('Inserting a new author into the database...');
                const author = new Author();
                author.name = name;
                await AppDataSource.manager.save(author);
                console.log('Saved a new author' + name);
            }),
        );

        courses.forEach(
            async ({
                title,
                description,
                creationDate,
                duration,
                authorsIndexes,
            }) => {
                console.log('Inserting a new course into the database...');
                const course = new Course();
                course.title = title;
                course.description = description;
                course.creationDate = creationDate;
                course.duration = duration;
                course.authors = await Promise.all(
                    authorsIndexes.map(
                        async (index) =>
                            (await AppDataSource.manager.find(Author))[index]!,
                    ),
                );
                await AppDataSource.manager.save(course);
                console.log('Saved a new course' + title);
            },
        );
    })
    .catch((error) =>
        console.error('An error occured during db initializaion:', error),
    );
