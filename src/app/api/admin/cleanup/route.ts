import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    // 1. Find all paid invoices
    const paidInvoices = await prisma.invoice.findMany({
      where: { status: 'PAID' }
    });

    const paidUserIds = new Set(paidInvoices.map(i => i.userId).filter(Boolean));
    const paidOrgIds = new Set(paidInvoices.map(i => i.organizationId).filter(Boolean));

    // 2. Fetch all users
    const allUsers = await prisma.user.findMany({
      include: {
        memberships: true
      }
    });

    const unpaidUserIds: string[] = [];
    const unpaidOrgIds: string[] = [];

    for (const u of allUsers) {
      if (u.email === 'admin@oneclickbiz.in') continue; // Preserve Super Admin
      
      const userOrgId = u.memberships[0]?.organizationId;
      const isPaidUser = paidUserIds.has(u.id) || (userOrgId && paidOrgIds.has(userOrgId));

      if (!isPaidUser) {
        unpaidUserIds.push(u.id);
        if (userOrgId) unpaidOrgIds.push(userOrgId);
      }
    }

    if (unpaidUserIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No unpaid users found. All existing accounts have verified Cashfree invoices.',
        deletedUsersCount: 0,
        deletedOrganizationsCount: 0
      });
    }

    // 3. Delete unpaid users & their unlinked data
    // Delete memberships first
    await prisma.organizationMember.deleteMany({
      where: { userId: { in: unpaidUserIds } }
    });

    // Delete profiles of unpaid orgs
    await prisma.profile.deleteMany({
      where: { organizationId: { in: unpaidOrgIds } }
    });

    // Delete leads, bookings, orders of unpaid orgs
    await prisma.lead.deleteMany({ where: { organizationId: { in: unpaidOrgIds } } });
    await prisma.booking.deleteMany({ where: { organizationId: { in: unpaidOrgIds } } });
    await prisma.order.deleteMany({ where: { organizationId: { in: unpaidOrgIds } } });

    // Delete unpaid organizations
    const deletedOrgs = await prisma.organization.deleteMany({
      where: { 
        id: { in: unpaidOrgIds },
        slug: { not: 'admin-org' }
      }
    });

    // Delete unpaid users
    const deletedUsers = await prisma.user.deleteMany({
      where: { id: { in: unpaidUserIds } }
    });

    return NextResponse.json({
      success: true,
      message: `Successfully removed ${deletedUsers.count} unpaid accounts. Retained all users with verified Cashfree payments.`,
      deletedUsersCount: deletedUsers.count,
      deletedOrganizationsCount: deletedOrgs.count,
      paidUsersCount: allUsers.length - deletedUsers.count
    });

  } catch (err: any) {
    console.error('Cleanup Unpaid Error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
