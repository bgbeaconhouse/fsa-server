const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main () {
    //Create an array of department data 
    const departments=[
        {
            name : 'English',
            description :' study of literature, writting, and language.',
            contactInfo :' english@university.edu',
            image: 'https://cdnsm5-ss11.sharpschool.com/UserFiles/Servers/Server_78840/Image/Academics%20and%20Programs/Subjects/English.png',
        },
        {
            name :'Math',
            description :' Mathematics: algebra, calculus, and beyond.',
            contactInfo: 'math@university.edu',
            image: 'https://3.files.edl.io/28b4/24/05/14/101957-2a1111ff-de24-437d-94f9-28123d992469.png',
        },
        {
            name: 'Science',
            description: 'Explore biology, chemistry, and physics.',
            contactInfo: 'science@fullstack.edu',
            image: 'https://www.gateschili.org/cms/lib/NY02214396/Centricity/Domain/763/science-01.png',
        },
        {
            name: 'History',
            description: 'Dive into world, US, and ancient history.',
            contactInfo: 'history@fullstack.edu',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9uQdeT3VSaDQRBXj5P5itlQ1bqTYyZ4MLFQ&s',
          },
          {
            name: 'Latin',
            description: 'Learn the classical Latin language and culture.',
            contactInfo: 'latin@fullstack.edu',
            image: 'https://wheatoncollege.edu/wp-content/uploads/2017/07/shutterstock_222035842-latin-hero.jpg',
          },
    ];
    // Faculty data 
    const faculties = [
        {
            name: 'Dr. Linda Zhang',
            email:'lindazhang@university.edu',
            bio :'Professor of English literature.',
            profileImage:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
            contactInfo: '650-222-1212',
            departmentId: 1

        },
        {
            name: 'Prof. William Harris',
            email:'william.harris@university.edu',
            bio :'Professor of Advanced Calculus and Mathematical Theory.',
            profileImage:'https://images.unsplash.com/photo-1573164574394-0cb9be6ce9d7',
            contactInfo: '650-223-1212',
            departmentId: 2
        },
        {
            name: 'Prof. John Adams',
            email:'hohna@university.edu',
            bio:'Expert in Environmental Science with focus on climate change.',
            contactInfo: '650-224-1212',
            profileImage:'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
            departmentId: 3
        },
        {
            name: 'Dr.Sarah Lee',
            email:'sarshlee@university.edu',
            bio :'Specialist in U.S. and Modern History.',
            profileImage:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
            contactInfo: '650-2225-1212',
            departmentId: 4
        },
        {
            name: 'Dr. Emma Green',
            email:'emma.green@university.edu',
            bio :'Professor of Latin and Ancient Roman Culture.',
            profileImage:'https://images.unsplash.com/photo-1612197241063-6b6e3e3d9c52',
            contactInfo: '650-226-1212',
            departmentId: 5
        },
    ]
    for (const dept of departments) {

        const existingDept = await prisma.department.findFirst({
            where : { name :dept.name}
        });
        if (existingDept) {
            await prisma.department.update({ 
                where: { id: existingDept.id },
                data: dept,
        });
        console.log(`Updated department: ${dept.name}`);
        } else {
            await prisma.department.create({
                data: dept,
           });
        console.log(`Created department: ${dept.name}`);
    };
      }
      console.log('✅ Departments seeded!');
    for (const faculty of faculties){
        await prisma.faculty.upsert({
            where:{ email: faculty.email},
            update:{bio: faculty.bio,
                profileImage: faculty.profileImage,
                contactInfo: faculty.contactInfo,
                departmentId: faculty.departmentId,
            }, //if record exists,do nothing 
            create :faculty,
        });
        console.log(`Created or updated faculty: ${faculty.name}`);
    }
    console.log('✅ Faculty seeded!');
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())