const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const email = process.env.FIRST_MANAGER_EMAIL
  const password = process.env.FIRST_MANAGER_PASSWORD
  const manager = await prisma.user.upsert({
    where: { email },
    update: { name: "Manager Tle"},
    create: {
      name: "Manager",
      email,
      //ถ้าจะ hash ค่อยทำทีหลัง
      password,
      role: "MANAGER",
    },
  });

  console.log("Manager account :", manager);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
