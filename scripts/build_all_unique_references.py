import os
from PIL import Image, ImageDraw, ImageFont

REF_DIR = 'public/services/references'
ICONS_DIR = 'public/services'
os.makedirs(REF_DIR, exist_ok=True)

FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
FONT_REG = '/System/Library/Fonts/Supplemental/Arial.ttf'

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

f_xl = get_font(FONT_BOLD, 32)
f_title = get_font(FONT_BOLD, 26)
f_h2 = get_font(FONT_BOLD, 20)
f_h3 = get_font(FONT_BOLD, 16)
f_body_bold = get_font(FONT_BOLD, 14)
f_body = get_font(FONT_REG, 14)
f_sm_bold = get_font(FONT_BOLD, 12)
f_sm = get_font(FONT_REG, 12)
f_xs = get_font(FONT_REG, 10)
f_badge = get_font(FONT_BOLD, 11)

def create_base(bg_top, bg_bottom, glow_rgb):
    W, H = 1200, 675
    im = Image.new('RGB', (W, H), bg_top)
    draw = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H
        r = int(bg_top[0] * (1 - t) + bg_bottom[0] * t)
        g = int(bg_top[1] * (1 - t) + bg_bottom[1] * t)
        b = int(bg_top[2] * (1 - t) + bg_bottom[2] * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    
    # Ambient corner glows
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([700, -80, 1300, 500], fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], 40))
    gdraw.ellipse([-100, 250, 450, 800], fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], 30))
    im = Image.alpha_composite(im.convert('RGBA'), glow).convert('RGB')
    return im

def draw_header_left(im, icon_name, title, category, tagline, badge_text, accent_rgb):
    draw = ImageDraw.Draw(im)
    
    # Load 3D icon
    icon_path = os.path.join(ICONS_DIR, f"{icon_name}.png")
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert('RGBA')
        icon = icon.resize((96, 96), Image.Resampling.LANCZOS)
        # Icon background squircle
        draw.rounded_rectangle([60, 60, 176, 176], radius=24, fill=(255, 255, 255, 25), outline=accent_rgb, width=2)
        im.paste(icon, (70, 70), icon)
    
    # Category badge
    draw.rounded_rectangle([196, 62, 340, 88], radius=13, fill=accent_rgb)
    draw.text((208, 68), category.upper(), font=f_badge, fill=(255, 255, 255))
    
    # Live tool badge
    draw.rounded_rectangle([348, 62, 450, 88], radius=13, fill=(255, 255, 255, 30), outline=(255, 255, 255, 100), width=1)
    draw.text((360, 68), badge_text.upper(), font=f_badge, fill=(255, 255, 255))
    
    # Title & Tagline
    draw.text((196, 98), title, font=f_xl, fill=(255, 255, 255))
    draw.text((196, 142), tagline, font=f_h3, fill=(180, 205, 255))

    # Decorative dividing line
    draw.line([(60, 196), (1140, 196)], fill=(255, 255, 255, 40), width=1)


# 1. PERSONAL PROFILE
def gen_personal_profile():
    im = create_base((10, 18, 42), (18, 28, 68), (37, 99, 235))
    draw_header_left(im, 'personal-profile', 'Personal Profile & Digital vCard', 'Identity & Networking', '1-Tap Save to Phone Contacts with Verified Credentials', 'Verified Profile', (37, 99, 235))
    draw = ImageDraw.Draw(im)

    # Left Benefit Box
    draw.rounded_rectangle([60, 226, 480, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((90, 256), 'Modern Executive Identity', font=f_title, fill=(255, 255, 255))
    draw.text((90, 296), 'Replace paper cards with living digital bio.', font=f_body, fill=(200, 220, 255))
    
    benefits = [
        ('1-Tap "Add to Contacts"', 'Direct vCard download into iOS & Android address books.'),
        ('Interactive Action Hub', 'Instant WhatsApp chat, phone calls, directions & payments.'),
        ('Dynamic Real-Time Sync', 'Update phone or designation anytime without reprinting.'),
        ('NFC Tap Compatible', 'Works on any smartphone with or without an app.')
    ]
    y = 345
    for title, desc in benefits:
        draw.ellipse([90, y+4, 104, y+18], fill=(37, 99, 235))
        draw.text((115, y), title, font=f_h3, fill=(255, 255, 255))
        draw.text((115, y+22), desc, font=f_sm, fill=(170, 195, 235))
        y += 58

    # Right Phone Mockup Card (vCard)
    card_x, card_y = 520, 226
    draw.rounded_rectangle([card_x, card_y, 1140, 615], radius=28, fill=(255, 255, 255), outline=(200, 220, 255), width=2)
    
    # Card Header Banner
    draw.rounded_rectangle([card_x, card_y, 1140, card_y+90], radius=26, fill=(23, 75, 255))
    draw.rectangle([card_x, card_y+60, 1140, card_y+90], fill=(23, 75, 255)) # Square bottom
    draw.text((card_x+30, card_y+25), 'OneClickBiz Verified Profile', font=f_sm_bold, fill=(255, 255, 255))
    
    # Avatar Circle
    draw.ellipse([card_x+30, card_y+55, card_x+115, card_y+140], fill=(255, 255, 255), outline=(218, 165, 32), width=3)
    draw.ellipse([card_x+35, card_y+60, card_x+110, card_y+135], fill=(30, 58, 138))
    draw.text((card_x+58, card_y+85), 'KR', font=f_h2, fill=(255, 255, 255))
    
    # Name & Designation
    draw.text((card_x+135, card_y+100), 'Kishore Reddy', font=f_title, fill=(16, 24, 63))
    draw.text((card_x+135, card_y+132), 'Founder & Managing Director · OneClickBiz', font=f_body, fill=(100, 113, 143))
    
    # 1-Tap Save Contact Button
    btn_y = card_y + 175
    draw.rounded_rectangle([card_x+30, btn_y, 1110, btn_y+48], radius=14, fill=(23, 75, 255))
    draw.text((card_x+210, btn_y+14), 'SAVE CONTACT TO PHONE (vCard)', font=f_body_bold, fill=(255, 255, 255))

    # Action Pills
    pills = [
        ('WhatsApp', '+91 98765 43210', (16, 185, 129)),
        ('Phone Call', 'Direct Mobile', (37, 99, 235)),
        ('Email Us', 'kishore@oneclickbiz.in', (139, 92, 246)),
        ('Location', 'Hyderabad, Telangana', (245, 158, 11))
    ]
    px, py = card_x+30, btn_y + 65
    for label, val, col in pills:
        draw.rounded_rectangle([px, py, px+260, py+58], radius=14, fill=(245, 248, 255), outline=(220, 230, 250), width=1)
        draw.ellipse([px+14, py+20, px+30, py+36], fill=col)
        draw.text((px+42, py+12), label, font=f_sm_bold, fill=(16, 24, 63))
        draw.text((px+42, py+32), val, font=f_xs, fill=(100, 113, 143))
        px += 280
        if px > 900:
            px = card_x+30
            py += 68

    im.save(os.path.join(REF_DIR, 'personal-profile.jpg'), quality=92)
    print('Generated personal-profile.jpg')


# 2. CUSTOM DOMAIN & LANDING PAGES
def gen_custom_domain():
    im = create_base((12, 24, 48), (20, 38, 75), (14, 165, 233))
    draw_header_left(im, 'custom-domain', 'Custom Domain & SSL Infrastructure', 'Branding & Infrastructure', 'Connect yourbrand.com with Free Cloudflare 256-Bit SSL', 'Pro Branding', (14, 165, 233))
    draw = ImageDraw.Draw(im)

    # Left Value Card
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Enterprise Web Branding', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Elevate trust with your own custom address.', font=f_body, fill=(200, 230, 255))
    
    features = [
        ('Zero Hosting Costs', 'No ₹5,000/year hosting bills or maintenance.'),
        ('256-Bit HTTPS Padlock', 'Automated bank-grade SSL certificate renewal.'),
        ('Google & Meta Ads Ready', 'Optimized landing page speed for ad campaigns.'),
        ('Global Edge CDN', 'Cached in 250+ cities for 0.4s response time.')
    ]
    y = 350
    for t, d in features:
        draw.ellipse([85, y+4, 99, y+18], fill=(14, 165, 233))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(180, 215, 245))
        y += 58

    # Right Browser Mockup
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 225, 255), width=2)
    
    # Browser chrome top
    draw.rounded_rectangle([bx, by, 1140, by+55], radius=22, fill=(240, 245, 255))
    draw.rectangle([bx, by+40, 1140, by+55], fill=(240, 245, 255))
    # Red, yellow, green window dots
    draw.ellipse([bx+20, by+20, bx+34, by+34], fill=(239, 68, 68))
    draw.ellipse([bx+42, by+20, bx+56, by+34], fill=(245, 158, 11))
    draw.ellipse([bx+64, by+20, bx+78, by+34], fill=(16, 185, 129))
    
    # URL address bar
    draw.rounded_rectangle([bx+100, by+12, 1110, by+44], radius=10, fill=(255, 255, 255), outline=(200, 220, 245), width=1)
    draw.ellipse([bx+114, by+22, bx+126, by+34], fill=(16, 185, 129)) # Lock
    draw.text((bx+135, by+18), 'https://www.yourbusiness.com', font=f_body_bold, fill=(16, 24, 63))
    draw.text((bx+420, by+20), '🔒 Verified 256-Bit SSL Active', font=f_xs, fill=(16, 185, 129))

    # Domain status cards inside browser
    cy = by + 80
    draw.text((bx+30, cy), 'Domain Configuration & Health Check', font=f_title, fill=(16, 24, 63))
    
    rows = [
        ('Primary Domain', 'www.yourbusiness.com', 'STATUS: CONNECTED & LIVE', (16, 185, 129)),
        ('DNS A-Record', 'Points to OneClickBiz High-Speed Edge IP: 82.112.226.104', 'VERIFIED ✓', (37, 99, 235)),
        ('Cloudflare SSL', 'Auto-renewed 256-Bit Bank Grade Encryption', 'ACTIVE (HTTPS) ✓', (16, 185, 129)),
        ('Global CDN Caching', 'Edge nodes active in 250+ cities across India & Global', '0.4s LATENCY ✓', (139, 92, 246))
    ]
    ry = cy + 45
    for r_title, r_desc, r_stat, r_col in rows:
        draw.rounded_rectangle([bx+30, ry, 1110, ry+54], radius=12, fill=(248, 250, 255), outline=(225, 235, 250), width=1)
        draw.text((bx+48, ry+10), r_title, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+48, ry+30), r_desc, font=f_xs, fill=(100, 113, 143))
        draw.rounded_rectangle([bx+460, ry+14, 1095, ry+40], radius=8, fill=(255, 255, 255), outline=r_col, width=1)
        draw.text((bx+475, ry+19), r_stat, font=f_badge, fill=r_col)
        ry += 64

    im.save(os.path.join(REF_DIR, 'custom-domain.jpg'), quality=92)
    print('Generated custom-domain.jpg')


# 3. GALLERY SPACE
def gen_gallery_space():
    im = create_base((10, 35, 45), (15, 55, 65), (20, 184, 166))
    draw_header_left(im, 'gallery-space', 'Gallery Space & Visual Portfolio', 'Visual Media & Portfolio', 'High-Speed WebP Media Showcase with Lightbox Zoom & Direct Inquiries', 'HD Lightbox', (20, 184, 166))
    draw = ImageDraw.Draw(im)

    # Left Info Card
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Showcase Your Work', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'High-resolution albums that convert visitors.', font=f_body, fill=(200, 240, 235))
    
    pts = [
        ('Full-Screen HD Zoom', 'Pinch-to-zoom and swipe lightbox on mobile.'),
        ('Automatic WebP Compression', '80% smaller file sizes with zero quality loss.'),
        ('Categorized Albums', 'Organize works by project type, service or season.'),
        ('Direct Photo Inquiry', 'Clients tap any photo to ask price on WhatsApp.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(20, 184, 166))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(180, 230, 225))
        y += 58

    # Right Gallery Grid Mockup
    gx, gy = 475, 226
    draw.rounded_rectangle([gx, gy, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 235, 230), width=2)
    
    # Category Filter Tabs
    tabs = ['All Projects (48)', 'Completed Villas', 'Interior Decor', 'Before & After']
    tx = gx + 30
    for i, tab in enumerate(tabs):
        active = (i == 0)
        bg = (20, 184, 166) if active else (240, 248, 246)
        fg = (255, 255, 255) if active else (50, 70, 75)
        draw.rounded_rectangle([tx, gy+20, tx+130, gy+52], radius=10, fill=bg)
        draw.text((tx+14, gy+28), tab, font=f_sm_bold, fill=fg)
        tx += 140

    # 4 Gallery Cards
    cards = [
        ('Luxury Penthouse Living Room', 'Interior Design · Hyderabad', (30, 70, 90)),
        ('Modern Minimalist Kitchen', 'Modular Woodwork · 2026', (40, 85, 75)),
        ('Master Bedroom Transformation', 'Before & After Series', (60, 50, 80)),
        ('Executive Office Suite', 'Commercial Decor · Banjara Hills', (35, 65, 85))
    ]
    cx, cy = gx+30, gy+70
    for title, cat, color in cards:
        draw.rounded_rectangle([cx, cy, cx+300, cy+145], radius=16, fill=color)
        draw.text((cx+18, cy+85), title, font=f_h3, fill=(255, 255, 255))
        draw.text((cx+18, cy+112), cat, font=f_xs, fill=(200, 230, 230))
        # WhatsApp Inquire pill
        draw.rounded_rectangle([cx+170, cy+15, cx+285, cy+42], radius=8, fill=(16, 185, 129))
        draw.text((cx+182, cy+22), 'Inquire via WA', font=f_badge, fill=(255, 255, 255))
        
        cx += 320
        if cx > 1000:
            cx = gx+30
            cy += 160

    im.save(os.path.join(REF_DIR, 'gallery-space.jpg'), quality=92)
    print('Generated gallery-space.jpg')


# 4. ARTICLES & BLOGS
def gen_articles_blogs():
    im = create_base((12, 22, 50), (20, 36, 80), (59, 130, 246))
    draw_header_left(im, 'articles-blogs', 'Articles & Blogs Publishing Studio', 'SEO & Content Hub', 'Publish SEO Articles to Rank #1 on Google and Generate Inbound Leads', 'Organic Traffic', (59, 130, 246))
    draw = ImageDraw.Draw(im)

    # Left info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Organic Search Authority', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Attract paying clients from Google Search.', font=f_body, fill=(200, 225, 255))
    
    pts = [
        ('Automated Google Schema', 'Pre-configured JSON-LD structured article data.'),
        ('Rich Media & Video Embeds', 'Embed YouTube videos & WhatsApp order buttons.'),
        ('Fast AMP Compatible', 'Loads instantly on mobile 4G/5G networks.'),
        ('Integrated Lead Forms', 'Capture consultation requests at the end of posts.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(59, 130, 246))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(185, 215, 250))
        y += 58

    # Right Google SERP & Blog Preview
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(210, 230, 255), width=2)
    
    # Google Search Snippet Card
    draw.rounded_rectangle([bx+30, by+25, 1110, by+145], radius=16, fill=(248, 250, 255), outline=(220, 235, 250), width=1)
    draw.text((bx+50, by+38), '🔍 GOOGLE SEARCH RESULT #1 RANKING', font=f_badge, fill=(16, 185, 129))
    draw.text((bx+50, by+62), 'https://www.yourbusiness.com › blog › top-growth-tips-2026', font=f_xs, fill=(70, 80, 95))
    draw.text((bx+50, by+82), '10 Proven Ways Local Businesses Can Double Revenue in 2026', font=f_h2, fill=(26, 115, 232))
    draw.text((bx+50, by+110), 'Discover how modern entrepreneurs in Hyderabad leverage WhatsApp stores, NFC digital visiting cards, and local SEO to gain 3.8x more repeat customers...', font=f_xs, fill=(90, 100, 115))

    # Live Article Reader Preview
    ay = by + 165
    draw.text((bx+30, ay), 'Article Reader View & Lead Capture', font=f_title, fill=(16, 24, 63))
    draw.rounded_rectangle([bx+30, ay+38, 1110, by+365], radius=16, fill=(255, 255, 255), outline=(225, 235, 250), width=1)
    
    # Reading meta
    draw.text((bx+50, ay+52), 'Published: October 2026 · 4 Min Read · By Chief Consultant', font=f_xs, fill=(120, 130, 145))
    draw.text((bx+50, ay+75), 'Why Traditional Paper Cards Are Costing You 70% of Potential Clients', font=f_h3, fill=(16, 24, 63))
    draw.text((bx+50, ay+102), 'When you hand someone a paper card, 88% are thrown away within 7 days. With a OneClickBiz digital profile, your contact is permanently saved directly into their phone address book with one tap...', font=f_sm, fill=(80, 90, 110))
    
    # End-of-article CTA banner
    draw.rounded_rectangle([bx+50, ay+135, 1090, ay+180], radius=10, fill=(238, 242, 255), outline=(199, 215, 254), width=1)
    draw.text((bx+70, ay+148), 'Ready to upgrade your business identity? Try OneClickBiz Free Today', font=f_body_bold, fill=(23, 75, 255))
    draw.rounded_rectangle([960, ay+142, 1075, ay+172], radius=8, fill=(23, 75, 255))
    draw.text((975, ay+149), 'Get Started →', font=f_badge, fill=(255, 255, 255))

    im.save(os.path.join(REF_DIR, 'articles-blogs.jpg'), quality=92)
    print('Generated articles-blogs.jpg')


# 5. COMMERCIAL USAGE
def gen_commercial_usage():
    im = create_base((18, 24, 38), (30, 40, 60), (249, 115, 22))
    draw_header_left(im, 'commercial-usage', 'Enterprise License & White-Label Rights', 'Enterprise & Compliance', '100% Commercial Clearance, Multi-Staff Accounts & Zero Watermarks', '100% White-Label', (249, 115, 22))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Enterprise Operations', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Monetize & scale with complete legal rights.', font=f_body, fill=(255, 225, 205))
    
    pts = [
        ('100% White-Label', 'Completely remove OneClickBiz platform branding.'),
        ('Multi-Staff Access', 'Add managers, sales reps & editors with permissions.'),
        ('Agency Reseller Rights', 'Package and sell digital solutions to local clients.'),
        ('99.99% Uptime SLA', 'Dedicated cloud infrastructure with priority support.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(249, 115, 22))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(240, 215, 195))
        y += 58

    # Right Team Management Dashboard
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(250, 220, 200), width=2)
    
    # Organization Header
    draw.rounded_rectangle([bx+30, by+20, 1110, by+85], radius=16, fill=(255, 247, 237), outline=(254, 215, 170), width=1)
    draw.text((bx+50, by+34), 'Organization: Apex Global Enterprises', font=f_h2, fill=(154, 52, 18))
    draw.text((bx+50, by+60), 'License Tier: Commercial Agency Enterprise · 50 Active Seats · White-Label Active', font=f_xs, fill=(194, 65, 12))

    # Staff Members Table
    ty = by + 105
    draw.text((bx+30, ty), 'Team Members & Role-Based Permissions', font=f_title, fill=(16, 24, 63))
    
    members = [
        ('Sarah Jenkins', 'sarah@apex.com', 'Administrator', 'Full Platform & Billing Access', (239, 68, 68)),
        ('Michael Chen', 'michael@apex.com', 'Store Manager', 'Order Processing & Catalog Editor', (37, 99, 235)),
        ('Priya Sharma', 'priya@apex.com', 'Sales Executive', 'CRM Leads & WhatsApp Outreach', (16, 185, 129)),
        ('David Miller', 'david@apex.com', 'Marketing Lead', 'Landing Pages & Analytics Viewer', (139, 92, 246))
    ]
    my = ty + 40
    for name, email, role, perms, col in members:
        draw.rounded_rectangle([bx+30, my, 1110, my+52], radius=12, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
        draw.ellipse([bx+45, my+12, bx+75, my+42], fill=(230, 235, 245))
        draw.text((bx+52, my+18), name[:2].upper(), font=f_sm_bold, fill=(50, 60, 80))
        draw.text((bx+90, my+10), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+90, my+30), email, font=f_xs, fill=(110, 120, 135))
        # Role badge
        draw.rounded_rectangle([bx+360, my+12, bx+510, my+40], radius=8, fill=col)
        draw.text((bx+375, my+18), role, font=f_badge, fill=(255, 255, 255))
        draw.text((bx+530, my+18), perms, font=f_xs, fill=(80, 95, 115))
        my += 62

    im.save(os.path.join(REF_DIR, 'commercial-usage.jpg'), quality=92)
    print('Generated commercial-usage.jpg')


# 6. SCALING BUSINESS
def gen_scaling_business():
    im = create_base((30, 12, 18), (55, 20, 30), (239, 68, 68))
    draw_header_left(im, 'scaling-business', 'Multi-Branch Growth & Analytics Engine', 'Growth & Automation', 'Manage Multiple Outlets, Regional Teams & Automated WhatsApp Retention', 'Scale Fast', (239, 68, 68))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Scale Without Chaos', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Expand from 1 outlet to 50 locations.', font=f_body, fill=(255, 215, 215))
    
    pts = [
        ('Multi-Outlet Routing', 'Auto-route client chats to closest branch pincode.'),
        ('Real-Time Growth KPIs', 'Monitor sales volume & top sellers across all stores.'),
        ('WhatsApp Re-engagement', 'Auto-message clients who haven’t purchased in 30 days.'),
        ('Central Catalog Sync', 'Push menu or stock updates to all outlets in 1 tap.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(239, 68, 68))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 200, 200))
        y += 58

    # Right Multi-Branch Analytics Dashboard
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(255, 220, 220), width=2)
    
    # 3 High Impact KPI Tiles
    kpis = [
        ('TOTAL MONTHLY REVENUE', '₹18,45,000', '+28.4% vs last month', (16, 185, 129)),
        ('MONTHLY ORDERS', '4,820 Orders', '3.8x repeat buyers', (37, 99, 235)),
        ('ACTIVE BRANCHES', '12 Outlets', 'Across 4 Metros', (239, 68, 68))
    ]
    kx = bx + 30
    for label, val, sub, col in kpis:
        draw.rounded_rectangle([kx, by+20, kx+195, by+105], radius=16, fill=(255, 245, 245), outline=(254, 226, 226), width=1)
        draw.text((kx+16, by+32), label, font=f_xs, fill=(120, 80, 80))
        draw.text((kx+16, by+52), val, font=f_h2, fill=(16, 24, 63))
        draw.text((kx+16, by+80), sub, font=f_xs, fill=col)
        kx += 215

    # Outlets Performance Breakdown
    oy = by + 125
    draw.text((bx+30, oy), 'Live Outlet Performance & Lead Routing', font=f_title, fill=(16, 24, 63))
    
    outlets = [
        ('Mumbai Flagship Store', 'Bandra West · Mgr: Rohit S.', '1,840 Orders', '₹7.2L Revenue', (16, 185, 129)),
        ('Bangalore Tech Park', 'Indiranagar · Mgr: Ananya M.', '1,420 Orders', '₹5.8L Revenue', (16, 185, 129)),
        ('Hyderabad Central', 'Jubilee Hills · Mgr: Vikram K.', '1,120 Orders', '₹4.1L Revenue', (37, 99, 235)),
        ('Pune High Street', 'Koregaon Park · Mgr: Sneha P.', '440 Orders', '₹1.35L Revenue', (245, 158, 11))
    ]
    ry = oy + 38
    for name, loc, ords, rev, col in outlets:
        draw.rounded_rectangle([bx+30, ry, 1110, ry+46], radius=12, fill=(248, 250, 255), outline=(235, 240, 250), width=1)
        draw.ellipse([bx+45, ry+16, bx+59, ry+30], fill=col)
        draw.text((bx+70, ry+8), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+70, ry+26), loc, font=f_xs, fill=(110, 120, 135))
        draw.text((bx+420, ry+14), ords, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+530, ry+14), rev, font=f_body_bold, fill=col)
        ry += 54

    im.save(os.path.join(REF_DIR, 'scaling-business.jpg'), quality=92)
    print('Generated scaling-business.jpg')


# 7. CUSTOM TEMPLATES
def gen_custom_templates():
    im = create_base((25, 12, 45), (45, 20, 75), (168, 85, 247))
    draw_header_left(im, 'custom-templates', '100+ Vertical Industry Templates', 'Design & Templates', 'Handcrafted Layouts Designed Specifically for Over 25 Local Business Verticals', '100+ Templates', (168, 85, 247))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Industry-Built Designs', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Pre-configured with industry-specific tools.', font=f_body, fill=(240, 215, 255))
    
    pts = [
        ('Healthcare & Doctors', 'Patient appointment slots, qualification & maps.'),
        ('Restaurants & Cafes', 'Visual food photo menu with veg/non-veg tags.'),
        ('Salons & Beauty Spas', 'Service rate cards, stylists & treatment menus.'),
        ('Real Estate & Villas', 'Property floor plans, virtual tours & brochure PDF.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(168, 85, 247))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(230, 200, 245))
        y += 58

    # Right Template Switcher 4-Panel Grid
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(240, 220, 255), width=2)
    
    draw.text((bx+30, by+20), 'Choose From 100+ Tailored Business Themes', font=f_title, fill=(16, 24, 63))
    
    themes = [
        ('🏥 Medical & Dental Care', 'Dr. Sharma Dental Studio', 'Appointment booking, doctor bio & patient reviews', (238, 242, 255), (37, 99, 235)),
        ('🍽️ Fine Dining & Cafes', 'The Artisan Bistro & Bakery', 'Photo food menu, veg/non-veg & table reservations', (254, 242, 242), (239, 68, 68)),
        ('💄 Luxury Salons & Spas', 'Aura Bridal & Hair Lounge', 'Rate cards, packages & WhatsApp booking', (253, 242, 248), (236, 72, 153)),
        ('🏢 Real Estate & Villas', 'Primeview Luxury Living', 'Floor plans, price sheets & WhatsApp site visits', (240, 253, 244), (16, 185, 129))
    ]
    tx, ty = bx+30, by+65
    for title, store, desc, bg, col in themes:
        draw.rounded_rectangle([tx, ty, tx+300, ty+145], radius=16, fill=bg, outline=(220, 210, 240), width=1)
        draw.text((tx+18, ty+18), title, font=f_h3, fill=(16, 24, 63))
        draw.text((tx+18, ty+45), store, font=f_sm_bold, fill=col)
        draw.text((tx+18, ty+70), desc, font=f_xs, fill=(80, 90, 105))
        draw.rounded_rectangle([tx+18, ty+105, tx+130, ty+132], radius=8, fill=col)
        draw.text((tx+30, ty+112), 'Use Template', font=f_badge, fill=(255, 255, 255))
        
        tx += 320
        if tx > 1000:
            tx = bx+30
            ty += 160

    im.save(os.path.join(REF_DIR, 'custom-templates.jpg'), quality=92)
    print('Generated custom-templates.jpg')


# 8. EASY DESIGNING WITH MULTIPLE EDITS
def gen_easy_designing():
    im = create_base((28, 12, 35), (50, 20, 60), (236, 72, 153))
    draw_header_left(im, 'easy-designing', 'No-Code Visual Editor Studio', 'Editor & Customization', 'Intuitive Visual Builder with Real-Time Mobile Simulator & Instant Live Sync', 'No Code Needed', (236, 72, 153))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Total Creative Control', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Edit 24/7 without developer fees.', font=f_body, fill=(255, 215, 235))
    
    pts = [
        ('Real-Time Mobile Simulator', 'Preview changes live side-by-side as you type.'),
        ('Drag & Drop Section Order', 'Move services, gallery, or testimonials effortlessly.'),
        ('Undo & Redo History', 'Experiment freely with full revision restore.'),
        ('50ms Global Live Sync', 'Changes appear instantly worldwide upon saving.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(236, 72, 153))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 200, 225))
        y += 58

    # Right Studio Workspace Mockup
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(250, 215, 235), width=2)
    
    # Left Toolbar inside studio
    draw.rounded_rectangle([bx+20, by+20, bx+240, by+365], radius=16, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
    draw.text((bx+35, by+35), 'EDITOR TOOLS', font=f_badge, fill=(236, 72, 153))
    
    tools = ['Header & Hero', 'Color Palette', 'Products & Store', 'Photo Gallery', 'Testimonials', 'Lead Forms']
    ty = by + 65
    for tool in tools:
        draw.rounded_rectangle([bx+35, ty, bx+225, ty+38], radius=8, fill=(255, 255, 255), outline=(225, 230, 240), width=1)
        draw.text((bx+48, ty+12), tool, font=f_sm_bold, fill=(16, 24, 63))
        ty += 48

    # Right Simulator Phone inside studio
    sx, sy = bx+265, by+20
    draw.rounded_rectangle([sx, sy, 1110, by+365], radius=18, fill=(245, 248, 255), outline=(220, 230, 248), width=1)
    draw.text((sx+25, sy+20), 'LIVE PHONE SIMULATOR (Real-Time Preview)', font=f_h3, fill=(16, 24, 63))
    draw.text((sx+25, sy+45), 'Status: Connected · Live Sync Latency: 48ms', font=f_xs, fill=(16, 185, 129))
    
    # Phone frame inside
    px = sx + 25
    draw.rounded_rectangle([px, sy+75, 1085, sy+260], radius=16, fill=(255, 255, 255), outline=(200, 220, 250), width=2)
    draw.rounded_rectangle([px+20, sy+95, px+180, sy+130], radius=8, fill=(23, 75, 255))
    draw.text((px+32, sy+105), 'Your Logo Here', font=f_sm_bold, fill=(255, 255, 255))
    draw.text((px+20, sy+145), 'Edit Business Headline Instantly', font=f_h2, fill=(16, 24, 63))
    draw.text((px+20, sy+175), 'Customize fonts, colors, and content in real-time.', font=f_sm, fill=(100, 115, 140))
    # Action button
    draw.rounded_rectangle([px+20, sy+205, px+180, sy+242], radius=10, fill=(236, 72, 153))
    draw.text((px+42, sy+215), 'Book Consultation', font=f_badge, fill=(255, 255, 255))

    im.save(os.path.join(REF_DIR, 'easy-designing.jpg'), quality=92)
    print('Generated easy-designing.jpg')


# 9. PRODUCT SPACE
def gen_product_space():
    im = create_base((28, 20, 10), (50, 35, 15), (217, 119, 6))
    draw_header_left(im, 'product-space', 'Product Space & Catalog Management', 'Inventory & Catalog', 'Unlimited Product Listings with SKU Tags, Stock Alerts & Direct WhatsApp Links', 'Unlimited Space', (217, 119, 6))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Unlimited Showroom', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Showcase thousands of items without listing fees.', font=f_body, fill=(255, 235, 210))
    
    pts = [
        ('Zero Catalog Capacity Caps', 'List unlimited items, variations & sizes.'),
        ('Direct WhatsApp Deep-Links', 'Share 1-click buy links on Instagram & WhatsApp.'),
        ('Inventory & Stock Alerts', 'Manage In Stock, Low Stock & Pre-Orders.'),
        ('Intelligent Instant Search', 'Buyers find exact items in under 20 milliseconds.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(217, 119, 6))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 220, 190))
        y += 58

    # Right Catalog Grid
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(250, 230, 200), width=2)
    
    # Search bar
    draw.rounded_rectangle([bx+30, by+20, 1110, by+62], radius=12, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
    draw.text((bx+50, by+32), '🔍 Search 1,240 items by SKU, product name, or collection...', font=f_sm, fill=(130, 140, 155))

    # Product Items
    products = [
        ('Signature Chronograph Watch', 'SKU: W-01 · Luxury Series', '₹7,499', 'IN STOCK (42 units)', (16, 185, 129)),
        ('Handcrafted Leather Tote Bag', 'SKU: B-09 · Tan Leather', '₹4,499', 'LOW STOCK (Only 3 left)', (245, 158, 11)),
        ('Noise Cancelling ANC Earbuds', 'SKU: E-12 · Matte Black', '₹2,999', 'BEST SELLER', (37, 99, 235)),
        ('Artisan Ceramic Coffee Set', 'SKU: C-05 · Set of 4', '₹1,299', 'IN STOCK (85 units)', (16, 185, 129))
    ]
    py = by + 80
    for name, sku, price, stock, col in products:
        draw.rounded_rectangle([bx+30, py, 1110, py+60], radius=14, fill=(255, 255, 255), outline=(230, 235, 245), width=1)
        draw.rounded_rectangle([bx+45, py+10, bx+85, py+50], radius=8, fill=(240, 245, 255))
        draw.text((bx+55, py+20), '🛍️', font=f_h2)
        draw.text((bx+105, py+12), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+105, py+34), sku, font=f_xs, fill=(110, 120, 135))
        draw.text((bx+410, py+20), price, font=f_h2, fill=(217, 119, 6))
        draw.rounded_rectangle([bx+510, py+18, 1090, py+44], radius=8, fill=(248, 250, 255), outline=col, width=1)
        draw.text((bx+525, py+24), stock, font=f_badge, fill=col)
        py += 72

    im.save(os.path.join(REF_DIR, 'product-space.jpg'), quality=92)
    print('Generated product-space.jpg')


# 10. SERVICES MANAGEMENT
def gen_services_management():
    im = create_base((10, 25, 45), (18, 45, 75), (2, 132, 199))
    draw_header_left(im, 'services-management', 'Services Management & Appointment Booking', 'Booking & Scheduling', 'Online Booking Calendar, Transparent Rate Cards & Instant WhatsApp Confirmations', 'Smart Booking', (2, 132, 199))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Fill Your Calendar', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Eliminate missed calls and booking friction.', font=f_body, fill=(200, 235, 255))
    
    pts = [
        ('Real-Time Slot Availability', 'Prevents double-booking automatically.'),
        ('Instant WhatsApp Booking Slips', 'Confirmation sent straight to client mobile.'),
        ('Advance Token Deposits', 'Optionally collect UPI booking fees in advance.'),
        ('Staff Assignment', 'Assign specific doctors, stylists, or technicians.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(2, 132, 199))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(185, 225, 250))
        y += 58

    # Right Booking Calendar Mockup
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 230, 255), width=2)
    
    # Selected Service Card
    draw.rounded_rectangle([bx+30, by+20, 1110, by+95], radius=16, fill=(240, 249, 255), outline=(186, 230, 253), width=1)
    draw.text((bx+50, by+32), 'SELECTED SERVICE: Comprehensive Skin Consultation & Care', font=f_body_bold, fill=(2, 132, 199))
    draw.text((bx+50, by+58), 'Duration: 45 Mins · Fee: ₹1,200 · Specialist: Dr. Radhika Sharma (Senior Dermatologist)', font=f_xs, fill=(70, 85, 105))

    # Available Slots Selector
    sy = by + 115
    draw.text((bx+30, sy), 'Select Available Date & Time Slot', font=f_title, fill=(16, 24, 63))
    
    # Date Pills
    dates = ['Today, 26 Oct', 'Tomorrow, 27 Oct', 'Wed, 28 Oct', 'Thu, 29 Oct']
    dx = bx + 30
    for i, d in enumerate(dates):
        act = (i == 0)
        draw.rounded_rectangle([dx, sy+38, dx+130, sy+70], radius=10, fill=(2, 132, 199) if act else (245, 248, 255), outline=(2, 132, 199) if act else (225, 235, 245), width=1)
        draw.text((dx+18, sy+47), d, font=f_sm_bold, fill=(255, 255, 255) if act else (50, 70, 90))
        dx += 140

    # Time slots
    slots = [
        ('10:00 AM', 'Available', (16, 185, 129)),
        ('11:30 AM', 'Available', (16, 185, 129)),
        ('02:00 PM', 'Filled', (239, 68, 68)),
        ('04:30 PM', 'Available', (16, 185, 129))
    ]
    tx, ty = bx+30, sy+85
    for tm, st, col in slots:
        draw.rounded_rectangle([tx, ty, tx+130, ty+42], radius=8, fill=(248, 250, 255), outline=col, width=1)
        draw.text((tx+12, ty+12), tm, font=f_body_bold, fill=(16, 24, 63))
        draw.text((tx+80, ty+14), st, font=f_xs, fill=col)
        tx += 140

    # Confirmation CTA
    draw.rounded_rectangle([bx+30, sy+145, 1110, sy+190], radius=12, fill=(2, 132, 199))
    draw.text((bx+210, sy+158), 'CONFIRM BOOKING & RECEIVE WHATSAPP SLIP', font=f_body_bold, fill=(255, 255, 255))

    im.save(os.path.join(REF_DIR, 'services-management.jpg'), quality=92)
    print('Generated services-management.jpg')


# 11. PAYMENT GATEWAYS
def gen_payment_gateways():
    im = create_base((10, 30, 25), (18, 55, 45), (16, 185, 129))
    draw_header_left(im, 'payment-gateways', 'Instant UPI & Payment Gateways', 'Finance & Payments', 'Accept GPay, PhonePe, Paytm, Cards & NetBanking with 24hr Direct Bank Settlement', 'Instant Settlement', (16, 185, 129))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Friction-Free Payments', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Get paid instantly with zero setup hassle.', font=f_body, fill=(210, 245, 230))
    
    pts = [
        ('100% UPI Apps Supported', 'Google Pay, PhonePe, Paytm, BHIM & CRED.'),
        ('Direct Bank Settlement', 'Funds transfer directly into your current account.'),
        ('PCI-DSS 256-Bit SSL', 'Bank grade encryption with zero fraud liability.'),
        ('Automated Payment Receipts', 'Instant WhatsApp invoice sent upon success.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(16, 185, 129))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(190, 235, 220))
        y += 58

    # Right Checkout Modal Mockup
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 240, 225), width=2)
    
    # Amount header
    draw.rounded_rectangle([bx+30, by+20, 1110, by+90], radius=16, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    draw.text((bx+50, by+32), 'SECURE PAYMENT CHECKOUT', font=f_xs, fill=(22, 101, 52))
    draw.text((bx+50, by+52), 'Amount Payable: ₹2,499.00', font=f_title, fill=(16, 24, 63))
    draw.text((bx+420, by+54), '🔒 256-Bit Bank Encrypted', font=f_sm_bold, fill=(22, 101, 52))

    # Payment Methods Grid
    my = by + 110
    draw.text((bx+30, my), 'Select Payment Method', font=f_title, fill=(16, 24, 63))
    
    methods = [
        ('⚡ Google Pay / PhonePe', 'Instant 1-Tap UPI Intent on Mobile', 'FASTEST', (16, 185, 129)),
        ('📱 Paytm / BHIM UPI', 'Scan QR Code or Enter VPA ID', 'POPULAR', (37, 99, 235)),
        ('💳 Credit & Debit Cards', 'Visa, MasterCard, RuPay (Zero OTP Lag)', 'SECURE', (139, 92, 246)),
        ('🏛️ NetBanking & Wallets', 'All major Indian private & public banks', 'DIRECT', (245, 158, 11))
    ]
    ry = my + 38
    for name, desc, badge, col in methods:
        draw.rounded_rectangle([bx+30, ry, 1110, ry+46], radius=12, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
        draw.ellipse([bx+45, ry+15, bx+61, ry+31], fill=col)
        draw.text((bx+75, ry+8), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+75, ry+26), desc, font=f_xs, fill=(110, 120, 135))
        draw.rounded_rectangle([bx+460, ry+12, 1090, ry+34], radius=6, fill=col)
        draw.text((bx+475, ry+16), badge, font=f_badge, fill=(255, 255, 255))
        ry += 54

    im.save(os.path.join(REF_DIR, 'payment-gateways.jpg'), quality=92)
    print('Generated payment-gateways.jpg')


# 12. CANVA & ADOBE INTEGRATION
def gen_canva_adobe():
    im = create_base((12, 30, 45), (25, 45, 65), (225, 29, 72))
    draw_header_left(im, 'canva-adobe', 'Canva & Adobe Creative Suite Sync', 'Design & Integrations', 'Import High-Resolution Graphics & Automatically Optimize for Mobile & Web', 'Creative Sync', (225, 29, 72))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Seamless Asset Flow', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Connect design files straight into production.', font=f_body, fill=(255, 215, 225))
    
    pts = [
        ('Zero Distortion Scaling', 'Aspect ratio auto-lock prevents banner stretching.'),
        ('Auto WebP & 4K Optimization', 'Cuts file size by 80% while retaining sharpness.'),
        ('Hero Slider Carousel Support', 'Turn multiple banners into auto-sliding headers.'),
        ('Transparent PNG Retained', 'Perfect alpha channels for logos and sticker badges.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(225, 29, 72))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 200, 215))
        y += 58

    # Right Studio Sync Workspace
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(250, 215, 225), width=2)
    
    # Integration Bridge Banner
    draw.rounded_rectangle([bx+30, by+20, 1110, by+90], radius=16, fill=(255, 241, 242), outline=(254, 205, 211), width=1)
    draw.text((bx+50, by+32), '🎨 CREATIVE SUITE SYNC CONNECTOR', font=f_xs, fill=(190, 18, 60))
    draw.text((bx+50, by+52), 'Canva Pro & Adobe Creative Cloud Linked', font=f_title, fill=(16, 24, 63))
    draw.text((bx+440, by+54), '⚡ Instant Auto-Sync', font=f_sm_bold, fill=(16, 185, 129))

    # File Import Stream
    iy = by + 110
    draw.text((bx+30, iy), 'Imported Assets & Responsive Multi-Resolutions', font=f_title, fill=(16, 24, 63))
    
    assets = [
        ('Festival_Sale_Banner_4K.png', 'Original 3840x2160 · Canva Pro Export', 'Mobile (1080x1080) & Desktop (1920x600) Ready', (16, 185, 129)),
        ('Official_Brand_Emblem.png', 'Vector 300 DPI · Adobe Illustrator', 'Transparent Alpha Preserved (512x512)', (37, 99, 235)),
        ('Product_Catalog_Cover.jpg', 'High-Res Hero · Photoshop Mockup', 'Optimized to 142KB WebP (-84% size)', (225, 29, 72)),
        ('Staff_Brochure_Fold.pdf', 'Tri-Fold Print Ready · InDesign', 'Exported Vector PDF + Digital Flipbook', (139, 92, 246))
    ]
    ry = iy + 38
    for name, spec, res, col in assets:
        draw.rounded_rectangle([bx+30, ry, 1110, ry+46], radius=12, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
        draw.ellipse([bx+45, ry+15, bx+61, ry+31], fill=col)
        draw.text((bx+75, ry+8), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+75, ry+26), spec, font=f_xs, fill=(110, 120, 135))
        draw.text((bx+320, ry+14), res, font=f_xs, fill=col)
        ry += 54

    im.save(os.path.join(REF_DIR, 'canva-adobe.jpg'), quality=92)
    print('Generated canva-adobe.jpg')


# 13. EMAIL SIGNATURE GENERATOR
def gen_email_signature():
    im = create_base((12, 28, 38), (20, 42, 58), (13, 148, 136))
    draw_header_left(im, 'email-signature', 'Clickable HTML Email Signature Generator', 'Corporate Utilities', 'Turn Every Routine Outgoing Email Into a High-Converting Lead Generation Channel', 'Pro Email', (13, 148, 136))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Turn Emails Into Deals', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Clickable footers that convert prospects.', font=f_body, fill=(200, 235, 230))
    
    pts = [
        ('Universal Email Client Sync', '100% compatible with Gmail, Outlook & Apple Mail.'),
        ('Clickable WhatsApp & Call', 'Recipients start chat with 1 tap from their email.'),
        ('Embedded Dynamic QR Code', 'Desktop viewers scan with phone to save contact.'),
        ('Team-Wide Brand Cohesion', 'Deploy unified company signatures in 2 minutes.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(13, 148, 136))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(185, 225, 220))
        y += 58

    # Right Desktop Email Client Window
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 230, 225), width=2)
    
    # Email Window Header
    draw.rounded_rectangle([bx, by, 1140, by+50], radius=22, fill=(240, 245, 245))
    draw.rectangle([bx, by+35, 1140, by+50], fill=(240, 245, 245))
    draw.ellipse([bx+20, by+18, bx+32, by+30], fill=(239, 68, 68))
    draw.ellipse([bx+40, by+18, bx+52, by+30], fill=(245, 158, 11))
    draw.ellipse([bx+60, by+18, bx+72, by+30], fill=(16, 185, 129))
    draw.text((bx+90, by+16), 'New Message — Project Proposal for Acme Corp', font=f_sm_bold, fill=(70, 80, 90))

    # Email Body Content
    draw.text((bx+30, by+65), 'To: client@acme.com', font=f_sm, fill=(110, 120, 135))
    draw.text((bx+30, by+88), 'Subject: Partnership Proposal & Live Demonstration', font=f_sm_bold, fill=(16, 24, 63))
    draw.line([(bx+30, by+112), (1110, by+112)], fill=(230, 235, 240), width=1)
    
    draw.text((bx+30, by+125), 'Hi John,', font=f_body, fill=(16, 24, 63))
    draw.text((bx+30, by+148), 'Thank you for your interest. Please find our full catalog and proposal details linked below.', font=f_body, fill=(16, 24, 63))
    draw.text((bx+30, by+170), 'Best regards,', font=f_body, fill=(16, 24, 63))

    # Interactive HTML Signature Block
    sy = by + 205
    draw.rounded_rectangle([bx+30, sy, 1110, by+365], radius=16, fill=(248, 250, 255), outline=(210, 225, 240), width=1)
    
    # Avatar
    draw.ellipse([bx+48, sy+18, bx+118, sy+88], fill=(13, 148, 136))
    draw.text((bx+65, sy+40), 'AC', font=f_h2, fill=(255, 255, 255))

    # Details
    draw.text((bx+135, sy+18), 'Alex Chen', font=f_title, fill=(16, 24, 63))
    draw.text((bx+135, sy+48), 'Chief Strategy Officer · OneClickBiz Technologies', font=f_body, fill=(70, 85, 105))
    draw.text((bx+135, sy+70), '📞 +91 98765 43210  |  🌐 www.oneclickbiz.in', font=f_xs, fill=(100, 115, 135))
    
    # Interactive Pills inside email signature
    pills = [
        ('WhatsApp Chat', (16, 185, 129)),
        ('Download vCard', (37, 99, 235)),
        ('Book Appointment', (13, 148, 136)),
        ('Visit Store', (245, 158, 11))
    ]
    px = bx + 135
    for ptext, pcol in pills:
        draw.rounded_rectangle([px, sy+95, px+115, sy+125], radius=8, fill=pcol)
        draw.text((px+10, sy+103), ptext, font=f_badge, fill=(255, 255, 255))
        px += 125

    im.save(os.path.join(REF_DIR, 'email-signature.jpg'), quality=92)
    print('Generated email-signature.jpg')


# 14. REPORT PDF EXTRACT
def gen_report_pdf():
    im = create_base((32, 14, 18), (55, 22, 28), (220, 38, 38))
    draw_header_left(im, 'report-pdf', 'Report PDF Extract & Fact-Sheets', 'Reports & Export', 'Instant Print-Ready Business Analytics, Invoices & Orders in High-Resolution Vector PDF', '1-Click PDF', (220, 38, 38))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Print-Perfect Reports', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Automate bookkeeping and PDF export.', font=f_body, fill=(255, 220, 225))
    
    pts = [
        ('300 DPI Vector Typography', 'Razor sharp on office printers and legal documents.'),
        ('Automated Letterhead & GST', 'Includes registered business details & GSTIN.'),
        ('Itemized Order Invoices', 'Formatted tables with subtotal, tax & total figures.'),
        ('Instant WhatsApp Share', 'Forward heavy PDF reports directly on mobile in 2s.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(220, 38, 38))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 205, 210))
        y += 58

    # Right PDF Document Mockup
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(250, 220, 220), width=2)
    
    # Document Letterhead
    draw.rounded_rectangle([bx+30, by+20, 1110, by+85], radius=14, fill=(254, 242, 242), outline=(254, 202, 202), width=1)
    draw.text((bx+50, by+32), 'ONECLICKBIZZ MONTHLY BUSINESS PERFORMANCE REPORT', font=f_h3, fill=(153, 27, 27))
    draw.text((bx+50, by+58), 'Reporting Period: October 2026 · Generated for Management · GSTIN: 36AAACG1234F1Z5', font=f_xs, fill=(185, 28, 28))
    # PDF badge
    draw.rounded_rectangle([1020, by+32, 1090, by+62], radius=8, fill=(220, 38, 38))
    draw.text((1035, by+40), 'PDF', font=f_body_bold, fill=(255, 255, 255))

    # Summary KPI row
    py = by + 105
    kpis = [('TOTAL INQUIRIES', '1,248 Leads'), ('CONVERTED SALES', '412 Orders'), ('GROSS VALUE', '₹8,42,000')]
    kx = bx + 30
    for l, v in kpis:
        draw.rounded_rectangle([kx, py, kx+195, py+60], radius=10, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
        draw.text((kx+16, py+12), l, font=f_xs, fill=(120, 130, 145))
        draw.text((kx+16, py+30), v, font=f_h2, fill=(16, 24, 63))
        kx += 215

    # Itemized Orders Table
    ty = py + 75
    draw.text((bx+30, ty), 'Recent Itemized Transactions', font=f_title, fill=(16, 24, 63))
    
    records = [
        ('ORD-9021', 'Kavita Sundaram', '2x Handcrafted Leather Bag', '₹8,998', 'PAID (UPI)'),
        ('ORD-9022', 'Rohan Mehra', '1x Luxury Chronograph Watch', '₹7,499', 'PAID (CARD)'),
        ('ORD-9023', 'Sunil Kumar', '1x ANC Wireless Earbuds', '₹2,999', 'PAID (GPay)')
    ]
    ry = ty + 35
    for oid, cust, itm, amt, st in records:
        draw.rounded_rectangle([bx+30, ry, 1110, ry+40], radius=8, fill=(255, 255, 255), outline=(235, 240, 248), width=1)
        draw.text((bx+45, ry+12), oid, font=f_body_bold, fill=(220, 38, 38))
        draw.text((bx+150, ry+12), cust, font=f_body, fill=(16, 24, 63))
        draw.text((bx+310, ry+12), itm, font=f_xs, fill=(100, 115, 135))
        draw.text((bx+510, ry+12), amt, font=f_body_bold, fill=(16, 24, 63))
        draw.text((bx+590, ry+12), st, font=f_badge, fill=(16, 185, 129))
        ry += 46

    im.save(os.path.join(REF_DIR, 'report-pdf.jpg'), quality=92)
    print('Generated report-pdf.jpg')


# 15. LIVE PROFILE
def gen_live_profile():
    im = create_base((32, 10, 20), (55, 18, 32), (225, 29, 72))
    draw_header_left(im, 'live-profile', 'Live Profile & Real-Time Dynamic Sync', 'Real-Time Sync', 'Instant Global Propagation with Live Store Status, Flash Deals & Visitor Counters', 'Live Sync', (225, 29, 72))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Live Business Heartbeat', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Always present your latest info in real-time.', font=f_body, fill=(255, 215, 225))
    
    pts = [
        ('Sub-100ms Global Sync', 'Updates propagate worldwide almost instantaneously.'),
        ('Open / Closed Live Pill', 'Show customers when your store or clinic is open.'),
        ('Flash Offer Tickers', 'Display eye-catching banners for festival offers.'),
        ('Universal Lifetime Link', 'Your URL never expires even if you move offices.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(225, 29, 72))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(245, 200, 210))
        y += 58

    # Right Live Mobile Profile Simulator
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(255, 220, 230), width=2)
    
    # Live Status Bar
    draw.rounded_rectangle([bx+30, by+20, 1110, by+75], radius=14, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    draw.ellipse([bx+50, by+38, bx+66, by+54], fill=(16, 185, 129))
    draw.text((bx+78, by+32), 'STORE OPEN RIGHT NOW · Open till 9:30 PM', font=f_body_bold, fill=(22, 101, 52))
    draw.text((bx+78, by+52), '⚡ Live Global Edge Sync: Active in 200+ Indian cities', font=f_xs, fill=(22, 101, 52))
    draw.text((bx+480, by+38), '🔥 32 Viewing Now', font=f_sm_bold, fill=(220, 38, 38))

    # Flash Announcement Ticker
    draw.rounded_rectangle([bx+30, by+90, 1110, by+135], radius=12, fill=(255, 241, 242), outline=(254, 205, 211), width=1)
    draw.text((bx+50, by+102), '✨ FESTIVAL OFFER: Flat 20% Off Storewide Today! Use Code: DIWALI20 at checkout', font=f_body_bold, fill=(225, 29, 72))

    # Profile Preview Content
    py = by + 155
    draw.text((bx+30, py), 'Interactive Dynamic Profile Hub', font=f_title, fill=(16, 24, 63))
    
    # 2 Feature Preview Blocks
    draw.rounded_rectangle([bx+30, py+38, bx+310, by+365], radius=16, fill=(248, 250, 255), outline=(225, 235, 250), width=1)
    draw.text((bx+50, py+55), 'Live Menu & Offerings', font=f_h3, fill=(16, 24, 63))
    draw.text((bx+50, py+80), 'Updated 2 mins ago with fresh weekend arrivals and price cuts.', font=f_sm, fill=(90, 105, 125))
    draw.rounded_rectangle([bx+50, py+115, bx+200, py+145], radius=8, fill=(225, 29, 72))
    draw.text((bx+65, py+122), 'View Live Menu', font=f_badge, fill=(255, 255, 255))

    draw.rounded_rectangle([bx+330, py+38, 1110, by+365], radius=16, fill=(248, 250, 255), outline=(225, 235, 250), width=1)
    draw.text((bx+350, py+55), 'Instant Client Connectivity', font=f_h3, fill=(16, 24, 63))
    draw.text((bx+350, py+80), 'Clients connect instantly via WhatsApp, Phone, Google Maps directions, or UPI payment without any app download.', font=f_sm, fill=(90, 105, 125))
    draw.rounded_rectangle([bx+350, py+115, bx+510, py+145], radius=8, fill=(16, 185, 129))
    draw.text((bx+370, py+122), 'Chat on WhatsApp', font=f_badge, fill=(255, 255, 255))

    im.save(os.path.join(REF_DIR, 'live-profile.jpg'), quality=92)
    print('Generated live-profile.jpg')


# 16. DIRECT APP INSTALLATION (PWA)
def gen_direct_app():
    im = create_base((10, 32, 28), (18, 55, 48), (16, 185, 129))
    draw_header_left(im, 'direct-app', 'Direct App Installation (PWA)', 'Mobile App / PWA', 'Add Branded App Icon Directly to Customer Phone Home Screen with 0% Play Store Cut', 'Zero App Store Fee', (16, 185, 129))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Your App On Their Phone', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Skip the 30% App Store cut and review delays.', font=f_body, fill=(210, 245, 235))
    
    pts = [
        ('Zero Play Store Commission', 'Save ₹3,00,000+ on app development & review fees.'),
        ('1-Tap Home Screen Install', 'No passwords or Apple ID needed for customer install.'),
        ('Tiny < 2MB Storage Footprint', 'Customers never delete your app to save phone space.'),
        ('Full-Screen Native UX', 'Distraction-free experience with no browser URL bar.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(16, 185, 129))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(190, 235, 225))
        y += 58

    # Right Phone Home Screen & PWA Prompt
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(200, 240, 230), width=2)
    
    # Smartphone Home Screen Mockup
    draw.rounded_rectangle([bx+30, by+20, 1110, by+85], radius=16, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    draw.text((bx+50, by+32), '📱 PROGRESSIVE WEB APP (PWA) TECHNOLOGY', font=f_xs, fill=(22, 101, 52))
    draw.text((bx+50, by+52), 'Direct Home Screen Installation Prompt', font=f_title, fill=(16, 24, 63))
    draw.text((bx+420, by+54), '✓ iOS & Android Ready', font=f_sm_bold, fill=(22, 101, 52))

    # PWA Install Prompt Card
    py = by + 105
    draw.rounded_rectangle([bx+30, py, 1110, by+365], radius=18, fill=(248, 250, 255), outline=(225, 235, 250), width=1)
    
    # App icon on home screen
    draw.rounded_rectangle([bx+50, py+30, bx+130, py+110], radius=18, fill=(23, 75, 255))
    draw.text((bx+70, py+50), 'OB', font=f_xl, fill=(255, 255, 255))
    # Notification badge "3"
    draw.ellipse([bx+115, py+20, bx+140, py+45], fill=(239, 68, 68))
    draw.text((bx+124, py+26), '3', font=f_badge, fill=(255, 255, 255))

    draw.text((bx+155, py+35), 'Install "Your Brand Store" App', font=f_title, fill=(16, 24, 63))
    draw.text((bx+155, py+68), 'Add to Home Screen for lightning-fast 1-tap shopping & instant WhatsApp order alerts.', font=f_sm, fill=(90, 105, 125))
    
    # Install CTA Button
    draw.rounded_rectangle([bx+155, py+105, bx+340, py+145], radius=12, fill=(16, 185, 129))
    draw.text((bx+180, py+118), 'ADD TO HOME SCREEN', font=f_body_bold, fill=(255, 255, 255))
    draw.rounded_rectangle([bx+355, py+105, bx+460, py+145], radius=12, fill=(255, 255, 255), outline=(200, 210, 225), width=1)
    draw.text((bx+380, py+118), 'Dismiss', font=f_body, fill=(110, 120, 135))

    im.save(os.path.join(REF_DIR, 'direct-app.jpg'), quality=92)
    print('Generated direct-app.jpg')


# 17. BUSINESS MANAGEMENT TOOLS
def gen_business_tools():
    im = create_base((15, 18, 42), (25, 30, 68), (99, 102, 241))
    draw_header_left(im, 'business-tools', 'All-in-One Operations & Growth Suite', 'Operations & Management', 'Unified Operations Cockpit for Customer Contacts, Invoicing, Catalog & Daily Growth', 'Complete Suite', (99, 102, 241))
    draw = ImageDraw.Draw(im)

    # Left Info
    draw.rounded_rectangle([60, 226, 440, 615], radius=24, fill=(255, 255, 255, 15), outline=(255, 255, 255, 40), width=1)
    draw.text((85, 256), 'Unified Operations', font=f_title, fill=(255, 255, 255))
    draw.text((85, 296), 'Replace 6 separate apps with 1 cockpit.', font=f_body, fill=(215, 225, 255))
    
    pts = [
        ('Customer Directory CRM', 'Centralized directory of all past buyers & VIP clients.'),
        ('Automated Invoicing & Bills', 'Create professional GST/non-GST bill estimates.'),
        ('Encrypted Daily Cloud Backups', 'Your data safely stored across multiple cloud zones.'),
        ('Role-Based Staff Access', 'Give billing access to staff while securing financials.')
    ]
    y = 350
    for t, d in pts:
        draw.ellipse([85, y+4, 99, y+18], fill=(99, 102, 241))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+22), d, font=f_sm, fill=(195, 205, 245))
        y += 58

    # Right Command Cockpit 6-Grid
    bx, by = 475, 226
    draw.rounded_rectangle([bx, by, 1140, 615], radius=24, fill=(255, 255, 255), outline=(215, 225, 255), width=2)
    
    draw.text((bx+30, by+20), 'Central Business Command Cockpit', font=f_title, fill=(16, 24, 63))
    
    modules = [
        ('👥 Customer CRM Leads', '4,821 Active Contacts', '+18 leads today', (37, 99, 235)),
        ('💬 WhatsApp Order Queue', '24 Orders Pending', 'All paid via UPI', (16, 185, 129)),
        ('🧾 Invoicing & Tax Bills', '₹8.42 Lakhs MTD', '38 invoices sent', (99, 102, 241)),
        ('📦 Product Catalog Space', '1,240 Total SKUs', '100% In Stock', (245, 158, 11)),
        ('⭐ 5-Star Review Booster', '4.9 Rating (148 Reviews)', 'Google Business #1', (234, 179, 8)),
        ('📅 Staff & Appointments', '12 Bookings Today', 'Next at 11:30 AM', (236, 72, 153))
    ]
    mx, my = bx+30, by+65
    for title, val, sub, col in modules:
        draw.rounded_rectangle([mx, my, mx+200, my+95], radius=14, fill=(248, 250, 255), outline=(230, 235, 248), width=1)
        draw.text((mx+14, my+14), title, font=f_sm_bold, fill=(16, 24, 63))
        draw.text((mx+14, my+38), val, font=f_body_bold, fill=col)
        draw.text((mx+14, my+64), sub, font=f_xs, fill=(110, 120, 135))
        
        mx += 215
        if mx > 1000:
            mx = bx+30
            my += 110

    im.save(os.path.join(REF_DIR, 'business-tools.jpg'), quality=92)
    print('Generated business-tools.jpg')


if __name__ == '__main__':
    gen_personal_profile()
    gen_custom_domain()
    gen_gallery_space()
    gen_articles_blogs()
    gen_commercial_usage()
    gen_scaling_business()
    gen_custom_templates()
    gen_easy_designing()
    gen_product_space()
    gen_services_management()
    gen_payment_gateways()
    gen_canva_adobe()
    gen_email_signature()
    gen_report_pdf()
    gen_live_profile()
    gen_direct_app()
    gen_business_tools()
    print('ALL 17 UNIQUE SERVICE REFERENCE IMAGES GENERATED SUCCESSFULLY!')
