import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Seed Departments
    const departments = ['HR', 'IT', 'Finance', 'Sales', 'Operations']
    for (const name of departments) {
        await prisma.department.upsert({
            where: { name },
            update: {},
            create: { name },
        })
    }

    // Seed Positions
    const positions = ['Manager', 'Developer', 'Accountant', 'Sales Rep', 'Admin']
    for (const title of positions) {
        await prisma.position.upsert({
            where: { title },
            update: {},
            create: { title },
        })
    }

    // Seed Users/Employees
    // Admin User
    const admin = await prisma.employee.upsert({
        where: { email: 'admin@easyhr.com' },
        update: {},
        create: {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@easyhr.com',
            employeeId: 'ADMIN001',
            role: 'OWNER',
            status: 'ACTIVE',
            joinDate: new Date(),
            passwordHash: 'password123', // In a real app this should be hashed
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
