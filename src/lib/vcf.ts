import { DigitalProfile } from './types';

export function generateVcfString(profile: DigitalProfile): string {
  const nameParts = profile.name.trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const firstName = nameParts[0] || '';

  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.name}`,
    profile.company ? `ORG:${profile.company};` : '',
    profile.designation ? `TITLE:${profile.designation}` : '',
    profile.phone ? `TEL;TYPE=CELL,VOICE:${profile.phone}` : '',
    profile.whatsapp && profile.whatsapp !== profile.phone ? `TEL;TYPE=WORK,VOICE:${profile.whatsapp}` : '',
    profile.email ? `EMAIL;TYPE=WORK,INTERNET:${profile.email}` : '',
    profile.website ? `URL:${profile.website}` : '',
    profile.address ? `ADR;TYPE=WORK:;;${profile.address};;;;` : '',
    profile.bio ? `NOTE:${profile.bio.replace(/\n/g, '\\n')}` : '',
    profile.avatarUrl ? `PHOTO;VALUE=URI:${profile.avatarUrl}` : '',
    'REV:' + new Date().toISOString(),
    'END:VCARD'
  ];

  return vcardLines.filter(Boolean).join('\r\n');
}

export function downloadVcfFile(profile: DigitalProfile) {
  const vcfData = generateVcfString(profile);
  const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.slug.toLowerCase()}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
