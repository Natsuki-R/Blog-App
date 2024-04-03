const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPost() {
    try {
        const newPost = await prisma.postTest.create({
            data: {
                title: 'Your Post Title',
                desc: 'Your Post Description',
                cat: {
                    connect: {
                        slug: 'fashion' // 替换为实际的 Category slug
                    }
                },
                user: {
                    connect: {
                        email: 'shenjiaojun@gmail.com' // 替换为实际的 User email
                    }
                }
            }
        });
        console.log('New post created:', newPost);
    } catch (error) {
        console.error('Error creating post:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createPost();
