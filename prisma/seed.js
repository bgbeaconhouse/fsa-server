const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main () {
    //Create an array of department data 
    const departments=[
        {
            name : 'English',
            description :' study of literature, writting, and language.',
            contactInfo :' english@university.edu',
            image: 'https://example.com/english.jpg',
        },
        {
            name :'Math',
            description :' Mathematics: algebra, calculus, and beyond.',
            contactInfo: 'math@university.edu',
        },
        {
            name: 'Science',
            description: 'Explore biology, chemistry, and physics.',
            contactInfo: 'science@fullstack.edu',
            image: 'https://example.com/science.jpg',
        },
        {
            name: 'History',
            description: 'Dive into world, US, and ancient history.',
            contactInfo: 'history@fullstack.edu',
            image: 'https://example.com/history.jpg',
          },
          {
            name: 'Latin',
            description: 'Learn the classical Latin language and culture.',
            contactInfo: 'latin@fullstack.edu',
            image: 'https://example.com/latin.jpg',
          },
        

    ]
    for (const dept of departments) {
        await prisma.department.create({ data: dept })
      }
      console.log('✅ Departments seeded!')
    
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())