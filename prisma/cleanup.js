const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting cleanup of past accounts...');

  // Delete all regular users and cascade down to organizations, profiles, etc.
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      email: {
        not: 'admin@oneclickbiz.in'
      }
    }
  });

  // Delete all organizations created by test accounts
  const deletedOrgs = await prisma.organization.deleteMany({
    where: {
      slug: {
        not: 'admin-org'
      }
    }
  });

  // Clear test invoices
  const deletedInvoices = await prisma.invoice.deleteMany({});

  console.log(`✅ Successfully deleted ${deletedUsers.count} test user accounts.`);
  console.log(`✅ Successfully deleted ${deletedOrgs.count} test organizations and profiles.`);
  console.log(`✅ Successfully cleared ${deletedInvoices.count} test invoices.`);
  console.log('🎉 Database is now clean and ready for fresh signups and payment tests!');
}

main()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
