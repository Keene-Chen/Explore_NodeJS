import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.emqx_client_events.findMany({
    where: {
      clientid: '865447060228464',
    },
  });
  console.log(data);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
