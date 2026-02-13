import prisma from './src/lib/prisma.ts';

async function main() {
    try {
        const count = await prisma.employee.count();
        console.log('Connection successful! Employee count:', count);
    } catch (err: any) {
        console.error('Connection failed:', err.message);
        if (err.code) console.error('Error code:', err.code);
    } finally {
        await prisma.$disconnect();
    }
}

main();
