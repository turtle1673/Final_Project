const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const email = process.env.NEXT_PUBLIC_SEED_EMAIL
  const password = process.env.NEXT_PUBLIC_SEED_PASSWORD
  
  const manager = await prisma.user.upsert({
    where: { email },
    update: { name: "Manager Tle"},
    create: {
      name: "Manager",
      email,
      //ถ้าจะ hash ค่อยทำทีหลังไปทำอย่างอื่นก่อน
      password,
      role: "MANAGER",
    },
  })

  console.log("Manager account :", manager);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
