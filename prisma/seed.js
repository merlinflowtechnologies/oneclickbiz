const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for OneClickBiz production...');

  // 1. Seed Super Admin User
  const adminEmail = 'admin@oneclickbiz.in';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('oneclickbiz2026@', 10);
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPERADMIN',
        plan: 'ENTERPRISE',
        phone: '+91 98765 43210'
      }
    });
    console.log(`✅ Super Admin created: ${adminUser.email} (Role: ${adminUser.role})`);
  } else {
    console.log(`ℹ️ Super Admin already exists: ${adminEmail}`);
  }

  // 2. Seed System Settings Default Configuration
  const defaultSettings = [
    { key: 'PLATFORM_NAME', value: 'OneClickBiz' },
    { key: 'MAINTENANCE_MODE', value: 'false' },
    { key: 'ALLOW_USER_REGISTRATION', value: 'true' },
    { key: 'PLATFORM_COMMISSION_PCT', value: '0' },
    { key: 'CURRENCY_CODE', value: 'INR' },
    { key: 'SUPPORT_EMAIL', value: 'support@oneclickbiz.in' },
    { key: 'WHATSAPP_GATEWAY_URL', value: 'https://api.whatsapp.com/send' }
  ];

  for (const setting of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value }
    });
  }
  console.log(`✅ Seeded ${defaultSettings.length} system configuration keys.`);

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
