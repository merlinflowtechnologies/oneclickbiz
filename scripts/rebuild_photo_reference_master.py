#!/usr/bin/env python3
"""
Rebuild all 17 custom reference images for OneClickBiz with 100% photographic,
device mockups and real template screenshots.
Zero plain text canvas. Zero ugly headers inside the image.
16:9 widescreen 1280x720 aspect ratio.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

REF_DIR = 'public/services/references'
os.makedirs(REF_DIR, exist_ok=True)

# Font helpers
def get_font(size, bold=False):
    try:
        if bold:
            return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', size)
        else:
            return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', size)
    except:
        return ImageFont.load_default()

f_micro = get_font(10)
f_xs = get_font(11)
f_sm = get_font(13)
f_sm_b = get_font(13, True)
f_md = get_font(15)
f_md_b = get_font(15, True)
f_lg = get_font(18, True)
f_xl = get_font(22, True)

def make_base_canvas(theme='dark'):
    W, H = 1280, 720
    if theme == 'dark':
        im = Image.new('RGB', (W, H), (10, 14, 26))
        draw = ImageDraw.Draw(im)
        for r in range(480, 0, -25):
            alpha = int(30 * (1 - r/480))
            draw.ellipse([W//2 - int(r*1.4), H//2 - int(r*0.9), W//2 + int(r*1.4), H//2 + int(r*0.9)],
                         fill=(12 + alpha//2, 18 + alpha, 40 + alpha*2))
    elif theme == 'slate':
        im = Image.new('RGB', (W, H), (15, 23, 42))
        draw = ImageDraw.Draw(im)
        for r in range(480, 0, -25):
            alpha = int(25 * (1 - r/480))
            draw.ellipse([W//2 - int(r*1.4), H//2 - int(r*0.9), W//2 + int(r*1.4), H//2 + int(r*0.9)],
                         fill=(20 + alpha, 30 + alpha*2, 60 + alpha*2))
    else:
        im = Image.new('RGB', (W, H), (240, 244, 250))
        draw = ImageDraw.Draw(im)
    return im

def add_drop_shadow(canvas, box, radius=16, blur=10, opacity=140):
    x1, y1, x2, y2 = box
    w = x2 - x1
    h = y2 - y1
    pad = blur * 2
    shadow = Image.new('RGBA', (w + pad*2, h + pad*2), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle([pad, pad, pad + w, pad + h], radius=radius, fill=(0, 0, 0, opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(shadow, (x1 - pad, y1 - pad), shadow)

def draw_mac_window(canvas, box, url='', title=''):
    x1, y1, x2, y2 = box
    w = x2 - x1
    h = y2 - y1
    add_drop_shadow(canvas, box, radius=14, blur=10, opacity=160)
    
    draw = ImageDraw.Draw(canvas)
    # Window border & background
    draw.rounded_rectangle([x1, y1, x2, y2], radius=14, fill=(24, 30, 46), outline=(60, 75, 110), width=1)
    # Titlebar
    tb_h = 36
    draw.rounded_rectangle([x1, y1, x2, y1 + tb_h], radius=14, fill=(18, 22, 36))
    draw.rectangle([x1, y1 + 14, x2, y1 + tb_h], fill=(18, 22, 36))
    draw.line([(x1, y1 + tb_h), (x2, y1 + tb_h)], fill=(45, 55, 80), width=1)
    
    # Traffic lights
    draw.ellipse([x1 + 14, y1 + 12, x1 + 24, y1 + 22], fill=(239, 68, 68))
    draw.ellipse([x1 + 30, y1 + 12, x1 + 40, y1 + 22], fill=(245, 158, 11))
    draw.ellipse([x1 + 46, y1 + 12, x1 + 56, y1 + 22], fill=(16, 185, 129))
    
    # URL pill
    if url:
        pill_w = min(420, w - 160)
        px1 = x1 + (w - pill_w) // 2
        px2 = px1 + pill_w
        draw.rounded_rectangle([px1, y1 + 7, px2, y1 + 29], radius=6, fill=(10, 14, 24), outline=(40, 50, 75))
        draw.text((px1 + 14, y1 + 11), f'🔒 {url}', font=f_xs, fill=(150, 170, 205))
    elif title:
        draw.text((x1 + 70, y1 + 10), title, font=f_sm_b, fill=(220, 230, 250))
        
    return (x1 + 1, y1 + tb_h + 1, x2 - 1, y2 - 1)


# 1. CUSTOM TEMPLATES: 4 real website templates in 2x2 browser grid
def gen_custom_templates():
    canvas = make_base_canvas('dark')
    
    def make_browser_card(img_path, width, height, url, badge_text, badge_color):
        card = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        cdraw = ImageDraw.Draw(card)
        hh = 32
        cdraw.rounded_rectangle([0, 0, width, height], radius=14, fill=(24, 30, 46, 255), outline=(60, 75, 110, 255), width=1)
        cdraw.ellipse([12, 10, 22, 20], fill=(239, 68, 68))
        cdraw.ellipse([28, 10, 38, 20], fill=(245, 158, 11))
        cdraw.ellipse([44, 10, 54, 20], fill=(16, 185, 129))
        
        uw = width - 180
        cdraw.rounded_rectangle([64, 6, 64 + uw, 26], radius=6, fill=(14, 18, 30, 255))
        cdraw.text((75, 9), f'🔒 {url}', font=f_xs, fill=(140, 160, 195))
        
        bw = 120
        cdraw.rounded_rectangle([width - bw - 10, 6, width - 10, 26], radius=6, fill=badge_color)
        cdraw.text((width - bw + 8, 9), badge_text, font=f_xs, fill=(255, 255, 255))
        
        if os.path.exists(img_path):
            cimg = Image.open(img_path).convert('RGB')
            cw, ch = width - 2, height - hh - 2
            crop_h = int(cimg.width * (ch / cw))
            cropped = cimg.crop((0, 0, cimg.width, min(cimg.height, crop_h)))
            resized = cropped.resize((cw, ch), Image.Resampling.LANCZOS)
            card.paste(resized, (1, hh))
        return card

    c_rest = make_browser_card('public/landing/template_restaurant.png', 580, 325, 'oneclickbiz.in/bistro-demo', 'Dining & Bistro', (220, 38, 38))
    c_salon = make_browser_card('public/landing/template_salon.png', 580, 325, 'oneclickbiz.in/spa-demo', 'Luxury Salon & Spa', (13, 148, 136))
    c_clinic = make_browser_card('public/landing/template_hospital.png', 580, 325, 'oneclickbiz.in/clinic-demo', 'Medical & Dental', (2, 132, 199))
    c_edu = make_browser_card('public/landing/template_education.png', 580, 325, 'oneclickbiz.in/academy-demo', 'Education & Coaching', (124, 58, 237))

    coords = [(c_rest, (40, 25)), (c_salon, (660, 25)), (c_clinic, (40, 370)), (c_edu, (660, 370))]
    for card, (x, y) in coords:
        add_drop_shadow(canvas, (x, y, x + card.width, y + card.height), radius=14, blur=10, opacity=150)
        canvas.paste(card, (x, y), card)

    canvas.save(os.path.join(REF_DIR, 'custom-templates.jpg'), quality=95)
    print('Generated custom-templates.jpg')


# 2. GALLERY SPACE: Full-width luxury salon portfolio showcase
def gen_gallery_space():
    canvas = make_base_canvas('slate')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), url='oneclickbiz.in/aura-salon/portfolio', title='')
    ix1, iy1, ix2, iy2 = inner
    
    if os.path.exists('public/landing/template_salon.png'):
        sim = Image.open('public/landing/template_salon.png').convert('RGB')
        tw, th = ix2 - ix1, iy2 - iy1
        crop_h = int(sim.width * (th / tw))
        cropped = sim.crop((0, 0, sim.width, min(sim.height, crop_h)))
        resized = cropped.resize((tw, th), Image.Resampling.LANCZOS)
        canvas.paste(resized, (ix1, iy1))
        
    # Floating Lightbox Zoom Card
    lx1, ly1, lx2, ly2 = 820, 420, 1180, 640
    add_drop_shadow(canvas, (lx1, ly1, lx2, ly2), radius=16, blur=12, opacity=180)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([lx1, ly1, lx2, ly2], radius=16, fill=(15, 23, 42, 240), outline=(20, 184, 166), width=2)
    draw.text((lx1 + 20, ly1 + 18), '📷 4K Ultra-HD Lightbox', font=f_md_b, fill=(255, 255, 255))
    draw.text((lx1 + 20, ly1 + 45), 'Full-screen zoom for before/after styling,', font=f_xs, fill=(200, 215, 235))
    draw.text((lx1 + 20, ly1 + 65), 'bridal makeovers & client portfolios.', font=f_xs, fill=(200, 215, 235))
    
    draw.rounded_rectangle([lx1 + 20, ly1 + 105, lx1 + 180, ly1 + 140], radius=8, fill=(20, 184, 166))
    draw.text((lx1 + 35, ly1 + 115), 'View 32 HD Photos →', font=f_xs, fill=(255, 255, 255))
    
    canvas.save(os.path.join(REF_DIR, 'gallery-space.jpg'), quality=95)
    print('Generated gallery-space.jpg')


# 3. SERVICES MANAGEMENT: Real clinic booking with date/time slots
def gen_services_management():
    canvas = make_base_canvas('slate')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), url='oneclickbiz.in/dr-sharma-clinic/book', title='')
    ix1, iy1, ix2, iy2 = inner
    
    if os.path.exists('public/landing/template_hospital.png'):
        him = Image.open('public/landing/template_hospital.png').convert('RGB')
        tw, th = ix2 - ix1, iy2 - iy1
        crop_h = int(him.width * (th / tw))
        cropped = him.crop((0, 0, him.width, min(him.height, crop_h)))
        resized = cropped.resize((tw, th), Image.Resampling.LANCZOS)
        canvas.paste(resized, (ix1, iy1))
        
    # Floating Interactive Booking Widget
    bx1, by1, bx2, by2 = 780, 280, 1180, 640
    add_drop_shadow(canvas, (bx1, by1, bx2, by2), radius=16, blur=14, opacity=200)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=16, fill=(15, 23, 42), outline=(2, 132, 199), width=2)
    
    draw.text((bx1 + 24, by1 + 20), '📅 Doctor Appointment Booking', font=f_md_b, fill=(255, 255, 255))
    draw.text((bx1 + 24, by1 + 48), 'Dr. Rajesh Sharma, MD (Dental Surgeon)', font=f_xs, fill=(160, 190, 230))
    
    # Slot pills
    draw.text((bx1 + 24, by1 + 80), 'SELECT AVAILABLE SLOT TODAY:', font=f_xs, fill=(200, 215, 240))
    slots = [('10:00 AM', False), ('11:30 AM', True), ('02:00 PM', False), ('04:30 PM', False)]
    sx, sy = bx1 + 24, by1 + 105
    for s_time, selected in slots:
        col = (2, 132, 199) if selected else (30, 42, 65)
        txt_col = (255, 255, 255) if selected else (180, 200, 230)
        draw.rounded_rectangle([sx, sy, sx + 80, sy + 32], radius=8, fill=col, outline=(2, 132, 199) if not selected else None)
        draw.text((sx + 12, sy + 8), s_time, font=f_xs, fill=txt_col)
        sx += 90
        
    # WhatsApp Confirmation Banner
    draw.rounded_rectangle([bx1 + 24, by1 + 160, bx2 - 24, by1 + 220], radius=10, fill=(22, 101, 52), outline=(34, 197, 94))
    draw.text((bx1 + 36, by1 + 172), '✓ Instant WhatsApp Confirmation Slip', font=f_sm_b, fill=(255, 255, 255))
    draw.text((bx1 + 36, by1 + 194), 'Patient & clinic receive auto reminder alerts', font=f_micro, fill=(220, 252, 231))
    
    # Book Button
    draw.rounded_rectangle([bx1 + 24, by1 + 240, bx2 - 24, by1 + 290], radius=10, fill=(2, 132, 199))
    draw.text((bx1 + 110, by1 + 254), 'Confirm Appointment →', font=f_md_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'services-management.jpg'), quality=95)
    print('Generated services-management.jpg')


# 4. ARTICLES & BLOGS: Publishing studio with Google SEO rank meter
def gen_articles_blogs():
    canvas = make_base_canvas('slate')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), url='oneclickbiz.in/horizon-academy/blog', title='')
    ix1, iy1, ix2, iy2 = inner
    
    if os.path.exists('public/landing/template_education.png'):
        eim = Image.open('public/landing/template_education.png').convert('RGB')
        tw, th = ix2 - ix1, iy2 - iy1
        crop_h = int(eim.width * (th / tw))
        cropped = eim.crop((0, 0, eim.width, min(eim.height, crop_h)))
        resized = cropped.resize((tw, th), Image.Resampling.LANCZOS)
        canvas.paste(resized, (ix1, iy1))
        
    # Floating SEO Cockpit Card
    sx1, sy1, sx2, sy2 = 780, 360, 1180, 640
    add_drop_shadow(canvas, (sx1, sy1, sx2, sy2), radius=16, blur=12, opacity=190)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([sx1, sy1, sx2, sy2], radius=16, fill=(15, 23, 42), outline=(59, 130, 246), width=2)
    
    draw.text((sx1 + 24, sy1 + 20), '🚀 SEO Rank #1 Optimization Score', font=f_md_b, fill=(255, 255, 255))
    draw.text((sx1 + 24, sy1 + 50), 'Score: 98/100 · High Search Traffic', font=f_sm_b, fill=(34, 197, 94))
    
    # Checkmarks
    items = [
        '✓ Auto-Generated Schema.org JSON-LD',
        '✓ Social Media OG Share Tags (WhatsApp/FB)',
        '✓ Fast Sub-1s Accelerated Mobile Pages'
    ]
    iy = sy1 + 85
    for it in items:
        draw.text((sx1 + 24, iy), it, font=f_xs, fill=(210, 225, 245))
        iy += 30
        
    draw.rounded_rectangle([sx1 + 24, sy1 + 185, sx2 - 24, sy1 + 230], radius=8, fill=(59, 130, 246))
    draw.text((sx1 + 90, sy1 + 198), 'Publish Article Live →', font=f_sm_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'articles-blogs.jpg'), quality=95)
    print('Generated articles-blogs.jpg')


# 5. COMMERCIAL USAGE: Multi-device ecosystem with zero watermarks badge
def gen_commercial_usage():
    canvas = make_base_canvas('dark')
    
    if os.path.exists('public/landing/hero-visual-4k.png'):
        him = Image.open('public/landing/hero-visual-4k.png').convert('RGBA')
        hw, hh = 1140, 580
        him_res = him.resize((hw, hh), Image.Resampling.LANCZOS)
        add_drop_shadow(canvas, (70, 70, 70 + hw, 70 + hh), radius=20, blur=15, opacity=180)
        canvas.paste(him_res, (70, 70), him_res)
        
    # Floating Badge
    draw = ImageDraw.Draw(canvas)
    add_drop_shadow(canvas, (80, 520, 540, 660), radius=16, blur=10, opacity=190)
    draw.rounded_rectangle([80, 520, 540, 660], radius=16, fill=(15, 23, 42), outline=(249, 115, 22), width=2)
    draw.text((105, 540), '🛡️ 100% White-Label Commercial License', font=f_md_b, fill=(255, 255, 255))
    draw.text((105, 570), '• Zero OneClickBiz watermarks or third-party ads', font=f_xs, fill=(210, 225, 245))
    draw.text((105, 595), '• Full commercial ownership of customer data & brand', font=f_xs, fill=(210, 225, 245))
    draw.text((105, 620), '• Agency client sub-accounts & multi-admin roles', font=f_xs, fill=(210, 225, 245))

    canvas.save(os.path.join(REF_DIR, 'commercial-usage.jpg'), quality=95)
    print('Generated commercial-usage.jpg')


# 6. REPORT PDF: High-res PDF viewer with itemized invoice & GST table
def gen_report_pdf():
    canvas = make_base_canvas('dark')
    inner = draw_mac_window(canvas, (180, 40, 1100, 680), title='OneClickBiz_Executive_Sales_Report.pdf — Acrobat Reader')
    ix1, iy1, ix2, iy2 = inner
    
    # White paper sheet
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([ix1 + 30, iy1 + 20, ix2 - 30, iy2 - 20], radius=8, fill=(255, 255, 255))
    
    px = ix1 + 60
    py = iy1 + 45
    # Header of document
    draw.text((px, py), 'ONECLICKBIZZ RETAIL & SERVICES LTD.', font=f_lg, fill=(16, 24, 63))
    draw.text((px, py + 30), 'GSTIN: 36AAFCO1234F1Z8 · MONTHLY REVENUE & CLIENT INQUIRY REPORT', font=f_xs, fill=(100, 115, 135))
    draw.line([(px, py + 55), (ix2 - 60, py + 55)], fill=(220, 230, 245), width=2)
    
    # Table headers
    ty = py + 75
    draw.rectangle([px, ty, ix2 - 60, ty + 34], fill=(240, 245, 255))
    draw.text((px + 15, ty + 9), 'SERVICE / PRODUCT ITEM', font=f_sm_b, fill=(30, 50, 90))
    draw.text((px + 360, ty + 9), 'CLIENT', font=f_sm_b, fill=(30, 50, 90))
    draw.text((px + 520, ty + 9), 'STATUS', font=f_sm_b, fill=(30, 50, 90))
    draw.text((px + 670, ty + 9), 'AMOUNT (INR)', font=f_sm_b, fill=(30, 50, 90))
    
    rows = [
        ('Gold Bridal Jewelry Suite (Custom 22K)', 'Mrs. Ananya Sharma', '✓ Paid UPI', '₹1,24,500'),
        ('Executive Digital NFC Card + Web Portal', 'Vikramaditya Rao', '✓ Settled', '₹14,999'),
        ('Bistro Table Reservation (Party of 8)', 'Rohan Malhotra', '✓ Confirmed', '₹8,450'),
        ('Dental Implant Consultation & X-Ray', 'Dr. Meenakshi Iyer', '✓ Paid GPay', '₹4,500'),
        ('Aura Luxury Spa Package (Couples)', 'Siddharth Patel', '✓ Completed', '₹6,800'),
    ]
    ry = ty + 42
    for item, client, status, amt in rows:
        draw.line([(px, ry + 32), (ix2 - 60, ry + 32)], fill=(240, 245, 250), width=1)
        draw.text((px + 15, ry + 8), item, font=f_xs, fill=(30, 40, 60))
        draw.text((px + 360, ry + 8), client, font=f_xs, fill=(70, 85, 110))
        draw.text((px + 520, ry + 8), status, font=f_xs, fill=(22, 101, 52))
        draw.text((px + 670, ry + 8), amt, font=f_sm_b, fill=(16, 24, 63))
        ry += 40
        
    # Total
    draw.line([(px, ry + 10), (ix2 - 60, ry + 10)], fill=(30, 50, 90), width=2)
    draw.text((px + 15, ry + 20), 'TOTAL MONTHLY SETTLEMENTS (MTD):', font=f_md_b, fill=(16, 24, 63))
    draw.text((px + 650, ry + 18), '₹1,59,249.00', font=f_lg, fill=(37, 99, 235))
    
    # Stamp & Export buttons
    draw.rounded_rectangle([ix2 - 250, iy2 - 80, ix2 - 60, iy2 - 40], radius=8, fill=(220, 38, 38))
    draw.text((ix2 - 225, iy2 - 68), '📥 Download PDF (GST)', font=f_sm_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'report-pdf.jpg'), quality=95)
    print('Generated report-pdf.jpg')


# 7. PERSONAL PROFILE: Executive desk setting with phone & NFC card
def gen_personal_profile():
    canvas = make_base_canvas('slate')
    
    # Left Phone showing real digital vCard
    ph_w, ph_h = 360, 620
    px, py = 120, 50
    add_drop_shadow(canvas, (px, py, px + ph_w, py + ph_h), radius=30, blur=18, opacity=200)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([px, py, px + ph_w, py + ph_h], radius=30, fill=(20, 24, 38), outline=(80, 100, 140), width=3)
    
    # Notch
    draw.rounded_rectangle([px + 120, py + 10, px + 240, py + 26], radius=8, fill=(0, 0, 0))
    
    # Real profile inside phone
    if os.path.exists('public/kishore-profile-v2.png'):
        pimg = Image.open('public/kishore-profile-v2.png').convert('RGB')
        cw, ch = ph_w - 16, ph_h - 40
        crop_h = int(pimg.width * (ch / cw))
        cropped = pimg.crop((0, 0, pimg.width, min(pimg.height, crop_h)))
        resized = cropped.resize((cw, ch), Image.Resampling.LANCZOS)
        canvas.paste(resized, (px + 8, py + 30))
        
    # Right: Matte Black NFC Smart Card Floating
    cx, cy, cw, ch = 560, 120, 620, 380
    add_drop_shadow(canvas, (cx, cy, cx + cw, cy + ch), radius=22, blur=16, opacity=190)
    draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=22, fill=(18, 20, 28), outline=(190, 150, 90), width=2)
    
    # Gold Contactless Chip on card
    draw.rounded_rectangle([cx + 50, cy + 60, cx + 130, cy + 125], radius=10, fill=(218, 165, 32), outline=(255, 215, 0), width=1)
    draw.text((cx + 150, cy + 70), 'OneClickBiz Smart NFC Business Card', font=f_md_b, fill=(255, 255, 255))
    draw.text((cx + 150, cy + 98), 'Tap phone or scan QR · Instant Contact Exchange', font=f_xs, fill=(180, 195, 215))
    
    # Card details
    draw.text((cx + 50, cy + 220), 'CH. KISHORE REDDY', font=f_xl, fill=(255, 255, 255))
    draw.text((cx + 50, cy + 260), 'FOUNDER & MANAGING DIRECTOR', font=f_sm_b, fill=(218, 165, 32))
    draw.text((cx + 50, cy + 300), 'VERIFIED IDENTITY · 256-BIT ENCRYPTED NFC', font=f_xs, fill=(140, 160, 185))
    
    # Bottom Action Card
    bx1, by1, bx2, by2 = 560, 530, 1180, 640
    add_drop_shadow(canvas, (bx1, by1, bx2, by2), radius=14, blur=10, opacity=160)
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=14, fill=(37, 99, 235))
    draw.text((bx1 + 30, by1 + 25), '📲 1-Tap "Add to Contacts" (.vcf) Downloads Directly to Phone', font=f_md_b, fill=(255, 255, 255))
    draw.text((bx1 + 30, by1 + 55), 'Includes executive portrait, direct WhatsApp, phone number & business website.', font=f_xs, fill=(220, 235, 255))

    canvas.save(os.path.join(REF_DIR, 'personal-profile.jpg'), quality=95)
    print('Generated personal-profile.jpg')


# 8. LIVE PROFILE: Real-time global sync with live visitor ticker
def gen_live_profile():
    canvas = make_base_canvas('slate')
    
    # Phone displaying profile with pulsing live tag
    px, py, pw, ph = 140, 50, 380, 620
    add_drop_shadow(canvas, (px, py, px + pw, py + ph), radius=28, blur=16, opacity=200)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=28, fill=(20, 24, 38), outline=(225, 29, 72), width=3)
    
    if os.path.exists('public/kishore-profile-v2.png'):
        pimg = Image.open('public/kishore-profile-v2.png').convert('RGB')
        cw, ch = pw - 16, ph - 40
        crop_h = int(pimg.width * (ch / cw))
        cropped = pimg.crop((0, 0, pimg.width, min(pimg.height, crop_h)))
        resized = cropped.resize((cw, ch), Image.Resampling.LANCZOS)
        canvas.paste(resized, (px + 8, py + 25))
        
    # Floating Live Pulsing Indicator Over Phone
    draw.rounded_rectangle([px + 20, py + 40, px + 220, py + 75], radius=18, fill=(16, 185, 129))
    draw.text((px + 35, py + 48), '● LIVE · STORE OPEN', font=f_sm_b, fill=(255, 255, 255))
    
    # Right: Live Global Edge Sync Dashboard
    rx1, ry1, rx2, ry2 = 580, 100, 1180, 620
    add_drop_shadow(canvas, (rx1, ry1, rx2, ry2), radius=18, blur=14, opacity=180)
    draw.rounded_rectangle([rx1, ry1, rx2, ry2], radius=18, fill=(15, 23, 42), outline=(225, 29, 72), width=2)
    
    draw.text((rx1 + 30, ry1 + 30), '⚡ Global Edge Cloud Sync Network', font=f_lg, fill=(255, 255, 255))
    draw.text((rx1 + 30, ry1 + 65), 'Instant updates propagate worldwide in under 100ms.', font=f_xs, fill=(180, 200, 230))
    
    metrics = [
        ('🌐 Active CDN Nodes', '310+ Global Edge Locations'),
        ('⚡ Propagation Latency', '< 65 milliseconds worldwide'),
        ('👥 Current Store Viewers', '142 Active Shoppers Online Now'),
        ('🔒 SSL Security Grade', 'A+ Cloudflare 256-Bit Strict HTTPS')
    ]
    my = ry1 + 115
    for title, val in metrics:
        draw.rounded_rectangle([rx1 + 30, my, rx2 - 30, my + 68], radius=10, fill=(24, 32, 54), outline=(40, 55, 85))
        draw.text((rx1 + 50, my + 14), title, font=f_xs, fill=(150, 175, 210))
        draw.text((rx1 + 50, my + 38), val, font=f_md_b, fill=(255, 255, 255))
        my += 82
        
    draw.rounded_rectangle([rx1 + 30, my + 15, rx2 - 30, my + 65], radius=10, fill=(225, 29, 72))
    draw.text((rx1 + 140, my + 28), 'Auto-Sync Enabled · Zero Downtime', font=f_sm_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'live-profile.jpg'), quality=95)
    print('Generated live-profile.jpg')


# 9. DIRECT APP: Smartphone with native PWA "Add to Home Screen" prompt
def gen_direct_app():
    canvas = make_base_canvas('dark')
    
    # Phone Mockup
    px, py, pw, ph = 440, 40, 400, 640
    add_drop_shadow(canvas, (px, py, px + pw, py + ph), radius=32, blur=18, opacity=200)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=32, fill=(18, 22, 34), outline=(16, 185, 129), width=3)
    
    # Phone interior wallpaper
    draw.rounded_rectangle([px + 10, py + 10, px + pw - 10, py + ph - 10], radius=24, fill=(10, 14, 24))
    
    # Floating Native PWA Installation Modal
    mx1, my1, mx2, my2 = px + 25, py + 220, px + pw - 25, py + 480
    add_drop_shadow(canvas, (mx1, my1, mx2, my2), radius=18, blur=14, opacity=220)
    draw.rounded_rectangle([mx1, my1, mx2, my2], radius=18, fill=(255, 255, 255))
    
    # App Icon inside modal
    if os.path.exists('public/icon-192.png'):
        ic = Image.open('public/icon-192.png').convert('RGBA').resize((60, 60), Image.Resampling.LANCZOS)
        canvas.paste(ic, (mx1 + 25, my1 + 25), ic)
    else:
        draw.rounded_rectangle([mx1 + 25, my1 + 25, mx1 + 85, my1 + 85], radius=14, fill=(37, 99, 235))
        
    draw.text((mx1 + 100, my1 + 28), 'Install OneClickBiz App?', font=f_md_b, fill=(16, 24, 63))
    draw.text((mx1 + 100, my1 + 52), 'Direct Home Screen Access', font=f_xs, fill=(100, 115, 135))
    
    draw.line([(mx1 + 20, my1 + 100), (mx2 - 20, my1 + 100)], fill=(230, 235, 245), width=1)
    
    draw.text((mx1 + 25, my1 + 115), '• Instant 1-tap launch without App Store login', font=f_xs, fill=(70, 85, 105))
    draw.text((mx1 + 25, my1 + 138), '• 0% Google / Apple transaction commissions', font=f_xs, fill=(70, 85, 105))
    draw.text((mx1 + 25, my1 + 160), '• Offline catalog cache & instant push alerts', font=f_xs, fill=(70, 85, 105))
    
    # Action buttons
    draw.rounded_rectangle([mx1 + 25, my1 + 195, mx1 + 150, my1 + 235], radius=8, fill=(240, 243, 250))
    draw.text((mx1 + 65, my1 + 207), 'Cancel', font=f_xs, fill=(70, 85, 105))
    
    draw.rounded_rectangle([mx1 + 165, my1 + 195, mx2 - 25, my1 + 235], radius=8, fill=(16, 185, 129))
    draw.text((mx1 + 195, my1 + 207), 'Install App', font=f_sm_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'direct-app.jpg'), quality=95)
    print('Generated direct-app.jpg')


# 10. EASY DESIGNING: Visual drag-and-drop designer studio
def gen_easy_designing():
    canvas = make_base_canvas('dark')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), title='OneClickBiz Visual Studio — Live Theme & Block Customizer')
    ix1, iy1, ix2, iy2 = inner
    
    if os.path.exists('public/landing/how-it-works-visual@2x.png'):
        him = Image.open('public/landing/how-it-works-visual@2x.png').convert('RGB')
        tw, th = ix2 - ix1, iy2 - iy1
        crop_h = int(him.width * (th / tw))
        cropped = him.crop((0, 0, him.width, min(him.height, crop_h)))
        resized = cropped.resize((tw, th), Image.Resampling.LANCZOS)
        canvas.paste(resized, (ix1, iy1))
        
    # Floating Toolbar Pill
    draw = ImageDraw.Draw(canvas)
    add_drop_shadow(canvas, (80, 530, 600, 650), radius=14, blur=10, opacity=180)
    draw.rounded_rectangle([80, 530, 600, 650], radius=14, fill=(15, 23, 42), outline=(236, 72, 153), width=2)
    draw.text((100, 548), '🎨 Live Drag-and-Drop Builder', font=f_md_b, fill=(255, 255, 255))
    draw.text((100, 578), 'Swap banners, font styles, color schemes & WhatsApp catalogs in 1 click.', font=f_xs, fill=(200, 215, 240))
    draw.text((100, 605), 'Zero coding required · WYSIWYG instantaneous preview.', font=f_xs, fill=(200, 215, 240))

    canvas.save(os.path.join(REF_DIR, 'easy-designing.jpg'), quality=95)
    print('Generated easy-designing.jpg')


# 11. CUSTOM DOMAIN: Browser window with green padlock & DNS verification
def gen_custom_domain():
    canvas = make_base_canvas('slate')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), url='www.yourbrandname.com')
    ix1, iy1, ix2, iy2 = inner
    
    draw = ImageDraw.Draw(canvas)
    # Background interior
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(16, 22, 38))
    
    # Big Centered Domain Card
    dx1, dy1, dx2, dy2 = 240, iy1 + 60, 1040, iy2 - 60
    add_drop_shadow(canvas, (dx1, dy1, dx2, dy2), radius=20, blur=14, opacity=200)
    draw.rounded_rectangle([dx1, dy1, dx2, dy2], radius=20, fill=(22, 28, 48), outline=(14, 165, 233), width=2)
    
    # Padlock & Title
    draw.text((dx1 + 40, dy1 + 40), '🔒 SSL Certificate Status: ACTIVE (Cloudflare 256-Bit)', font=f_lg, fill=(34, 197, 94))
    draw.text((dx1 + 40, dy1 + 80), 'https://www.yourbrandname.com', font=f_xl, fill=(255, 255, 255))
    draw.text((dx1 + 40, dy1 + 120), 'Custom domain mapped with automated DNS resolution & global SSL provisioning.', font=f_sm, fill=(180, 205, 235))
    
    # 3 Checkmark Cards
    checks = [
        ('A Record (Apex Domain)', '104.21.58.12 (Proxied) · Status: Connected', (34, 197, 94)),
        ('CNAME Record (www)', 'oneclickbiz-edge.net · Status: Propagated', (34, 197, 94)),
        ('Automatic HTTPS Rewrite', '256-Bit Strict TLS 1.3 Active', (34, 197, 94))
    ]
    cy = dy1 + 165
    for name, desc, col in checks:
        draw.rounded_rectangle([dx1 + 40, cy, dx2 - 40, cy + 58], radius=10, fill=(15, 20, 36), outline=(40, 55, 85))
        draw.text((dx1 + 60, cy + 12), f'✓ {name}', font=f_sm_b, fill=col)
        draw.text((dx1 + 60, cy + 34), desc, font=f_xs, fill=(150, 175, 210))
        cy += 70

    canvas.save(os.path.join(REF_DIR, 'custom-domain.jpg'), quality=95)
    print('Generated custom-domain.jpg')


# 12. PRODUCT SPACE: Luxury eCommerce catalog with real jewelry & products
def gen_product_space():
    canvas = make_base_canvas('dark')
    
    draw = ImageDraw.Draw(canvas)
    
    # 4 Product Cards
    products = [
        ('22K Royal Gold Necklace', 'SKU-GLD-01', '₹1,45,000', 'In Stock', 'public/legacy_uploads/vcards/products/27/1002060692.jpg'),
        ('Diamond Solitaire Ring', 'SKU-DMD-09', '₹85,000', 'In Stock', 'public/legacy_uploads/vcards/products/9/1002070537.jpg'),
        ('Elite Country Villa Estate', 'SKU-EST-39', '₹2.85 Cr', 'Available', 'public/legacy_uploads/vcards/products/39/Elite-Future-County_15999.JPG'),
        ('Handcrafted Gold Bangles', 'SKU-GLD-38', '₹68,000', 'In Stock', 'public/legacy_uploads/vcards/products/38/SGD-10999.JPG'),
    ]
    
    px, py = 50, 50
    pw, ph = 270, 620
    gap = 25
    
    for title, sku, price, stock, img_path in products:
        add_drop_shadow(canvas, (px, py, px + pw, py + ph), radius=16, blur=12, opacity=170)
        draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, fill=(20, 26, 42), outline=(50, 65, 95), width=1)
        
        # Product Photo Area
        if os.path.exists(img_path):
            try:
                pimg = Image.open(img_path).convert('RGB')
                ih = 300
                crop_h = int(pimg.width * (ih / pw))
                cropped = pimg.crop((0, 0, pimg.width, min(pimg.height, crop_h)))
                resized = cropped.resize((pw - 4, ih), Image.Resampling.LANCZOS)
                canvas.paste(resized, (px + 2, py + 2))
            except Exception as e:
                pass
        
        # Details
        draw.rounded_rectangle([px + 16, py + 320, px + 95, py + 342], radius=6, fill=(22, 101, 52))
        draw.text((px + 24, py + 325), stock, font=f_xs, fill=(255, 255, 255))
        draw.text((px + 110, py + 325), sku, font=f_xs, fill=(140, 160, 190))
        
        draw.text((px + 16, py + 355), title, font=f_md_b, fill=(255, 255, 255))
        draw.text((px + 16, py + 395), price, font=f_lg, fill=(217, 119, 6))
        
        draw.text((px + 16, py + 435), '• Instant WhatsApp Checkout', font=f_xs, fill=(170, 190, 220))
        draw.text((px + 16, py + 458), '• Verified Gold Purity Hallmarked', font=f_xs, fill=(170, 190, 220))
        draw.text((px + 16, py + 481), '• Insured Doorstep Delivery', font=f_xs, fill=(170, 190, 220))
        
        # Order via WhatsApp Button
        draw.rounded_rectangle([px + 16, py + 540, px + pw - 16, py + 590], radius=10, fill=(34, 197, 94))
        draw.text((px + 45, py + 555), 'Order on WhatsApp →', font=f_sm_b, fill=(255, 255, 255))
        
        px += pw + gap

    canvas.save(os.path.join(REF_DIR, 'product-space.jpg'), quality=95)
    print('Generated product-space.jpg')


# 13. PAYMENT GATEWAYS: Real checkout modal with GPay, PhonePe, UPI & Cards
def gen_payment_gateways():
    canvas = make_base_canvas('slate')
    
    # Centered Checkout Modal
    cx1, cy1, cx2, cy2 = 320, 40, 960, 680
    add_drop_shadow(canvas, (cx1, cy1, cx2, cy2), radius=22, blur=16, opacity=220)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([cx1, cy1, cx2, cy2], radius=22, fill=(255, 255, 255))
    
    # Header
    draw.text((cx1 + 35, cy1 + 30), 'Instant Checkout & Payment', font=f_lg, fill=(16, 24, 63))
    draw.text((cx1 + 35, cy1 + 62), 'Amount to Pay: ₹2,499.00 · 256-Bit SSL Encrypted', font=f_xs, fill=(100, 115, 135))
    draw.line([(cx1 + 35, cy1 + 90), (cx2 - 35, cy1 + 90)], fill=(230, 235, 245), width=1)
    
    # 4 Payment Options
    options = [
        ('Google Pay (GPay UPI)', 'Instant 1-tap confirmation', (66, 133, 244)),
        ('PhonePe UPI', 'Preferred for fast UPI auto-pay', (95, 37, 159)),
        ('Paytm & Any BHIM UPI App', 'Scan QR code or enter UPI ID', (0, 185, 245)),
        ('Credit & Debit Cards (Visa / MC)', 'Supports RuPay, Mastercard & Amex', (16, 24, 63))
    ]
    
    oy = cy1 + 110
    for name, sub, col in options:
        draw.rounded_rectangle([cx1 + 35, oy, cx2 - 35, oy + 72], radius=12, fill=(248, 250, 255), outline=(210, 225, 245), width=1)
        draw.ellipse([cx1 + 55, oy + 24, cx1 + 79, oy + 48], fill=col)
        draw.text((cx1 + 95, oy + 16), name, font=f_md_b, fill=(16, 24, 63))
        draw.text((cx1 + 95, oy + 42), sub, font=f_xs, fill=(110, 125, 145))
        oy += 86
        
    # Trust Banner
    draw.rounded_rectangle([cx1 + 35, oy + 10, cx2 - 35, oy + 65], radius=10, fill=(240, 253, 244), outline=(34, 197, 94))
    draw.text((cx1 + 55, oy + 22), '🛡️ Direct 24-Hour Settlement to Merchant Bank Account', font=f_sm_b, fill=(22, 101, 52))
    draw.text((cx1 + 55, oy + 44), '0% Platform Surcharge · Razorpay & Cashfree Certified', font=f_micro, fill=(22, 101, 52))
    
    # Pay Button
    draw.rounded_rectangle([cx1 + 35, cy2 - 75, cx2 - 35, cy2 - 25], radius=12, fill=(16, 185, 129))
    draw.text((cx1 + 220, cy2 - 58), 'Pay Securely ₹2,499 →', font=f_md_b, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'payment-gateways.jpg'), quality=95)
    print('Generated payment-gateways.jpg')


# 14. CANVA & ADOBE: Creative design studio import workspace
def gen_canva_adobe():
    canvas = make_base_canvas('dark')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), title='Canva & Adobe Creative Cloud — OneClickBiz Instant Import Studio')
    ix1, iy1, ix2, iy2 = inner
    
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(18, 22, 36))
    
    # Left Toolbar
    draw.rectangle([ix1, iy1, ix1 + 80, iy2], fill=(12, 16, 26))
    tools = ['🎨', '📐', '🖼️', 'T', '✂️', '📤']
    ty = iy1 + 40
    for t in tools:
        draw.text((ix1 + 28, ty), t, font=f_xl, fill=(255, 255, 255))
        ty += 60
        
    # Center Canvas with promotional banner
    bx1, by1, bx2, by2 = ix1 + 120, iy1 + 40, ix2 - 340, iy2 - 40
    add_drop_shadow(canvas, (bx1, by1, bx2, by2), radius=14, blur=10, opacity=160)
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=14, fill=(225, 29, 72))
    
    draw.text((bx1 + 50, by1 + 60), 'SPECIAL FESTIVAL PROMO', font=f_md_b, fill=(255, 215, 0))
    draw.text((bx1 + 50, by1 + 100), 'UP TO 50% OFF', font=f_xl, fill=(255, 255, 255))
    draw.text((bx1 + 50, by1 + 150), 'Luxury Jewelry & Lifestyle Collection', font=f_md, fill=(255, 255, 255))
    draw.rounded_rectangle([bx1 + 50, by1 + 210, bx1 + 230, by1 + 260], radius=8, fill=(255, 255, 255))
    draw.text((bx1 + 75, by1 + 225), 'Shop Now on WhatsApp', font=f_sm_b, fill=(225, 29, 72))
    
    # Right Layer Panel
    rx1 = ix2 - 300
    draw.rectangle([rx1, iy1, ix2, iy2], fill=(14, 18, 30))
    draw.text((rx1 + 20, iy1 + 20), 'CANVA IMPORT LAYERS', font=f_sm_b, fill=(200, 215, 240))
    
    layers = [
        'Layer 1: Festival Background 4K',
        'Layer 2: Golden Typography',
        'Layer 3: Product Cutout Shadow',
        'Layer 4: WhatsApp CTA Button'
    ]
    ly = iy1 + 60
    for l in layers:
        draw.rounded_rectangle([rx1 + 15, ly, ix2 - 15, ly + 40], radius=6, fill=(24, 32, 50))
        draw.text((rx1 + 25, ly + 12), l, font=f_xs, fill=(220, 235, 255))
        ly += 50
        
    draw.rounded_rectangle([rx1 + 15, iy2 - 60, ix2 - 15, iy2 - 20], radius=8, fill=(34, 197, 94))
    draw.text((rx1 + 45, iy2 - 46), '1-Click Export to Live Store →', font=f_xs, fill=(255, 255, 255))

    canvas.save(os.path.join(REF_DIR, 'canva-adobe.jpg'), quality=95)
    print('Generated canva-adobe.jpg')


# 15. EMAIL SIGNATURE: Apple Mail / Gmail compose window with interactive footer
def gen_email_signature():
    canvas = make_base_canvas('slate')
    inner = draw_mac_window(canvas, (120, 40, 1160, 680), title='New Message — Apple Mail')
    ix1, iy1, ix2, iy2 = inner
    
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(255, 255, 255))
    
    # Email headers
    ey = iy1 + 20
    draw.text((ix1 + 30, ey), 'To: client-partnership@globalfirm.com', font=f_sm, fill=(70, 85, 110))
    draw.line([(ix1 + 30, ey + 28), (ix2 - 30, ey + 28)], fill=(235, 240, 250), width=1)
    
    ey += 38
    draw.text((ix1 + 30, ey), 'Subject: Exclusive Business Proposal & Digital Catalog', font=f_sm_b, fill=(16, 24, 63))
    draw.line([(ix1 + 30, ey + 28), (ix2 - 30, ey + 28)], fill=(235, 240, 250), width=1)
    
    ey += 45
    draw.text((ix1 + 30, ey), 'Dear Partner,', font=f_sm, fill=(50, 60, 80))
    draw.text((ix1 + 30, ey + 28), 'Thank you for reaching out. Please find our verified digital business profile and full catalog below.', font=f_sm, fill=(50, 60, 80))
    
    # Clickable HTML Signature Block
    sy = ey + 90
    draw.rounded_rectangle([ix1 + 30, sy, ix2 - 30, sy + 220], radius=12, fill=(248, 250, 255), outline=(200, 215, 245), width=1)
    
    # Avatar
    draw.rounded_rectangle([ix1 + 55, sy + 30, ix1 + 145, sy + 120], radius=16, fill=(37, 99, 235))
    draw.text((ix1 + 75, sy + 55), 'CK', font=f_xl, fill=(255, 255, 255))
    
    # Info
    draw.text((ix1 + 170, sy + 30), 'CH. KISHORE REDDY', font=f_lg, fill=(16, 24, 63))
    draw.text((ix1 + 170, sy + 62), 'Managing Director · OneClickBiz Solutions', font=f_sm, fill=(70, 85, 110))
    draw.text((ix1 + 170, sy + 88), '📞 +91 98765 43210  |  ✉️ kishore@oneclickbiz.in  |  🌐 oneclickbiz.in', font=f_xs, fill=(100, 115, 135))
    
    # Buttons inside signature
    bx = ix1 + 170
    btns = [
        ('💬 WhatsApp Chat', (34, 197, 94)),
        ('📲 Add to Contacts', (37, 99, 235)),
        ('🛍️ View Store Catalog', (225, 29, 72))
    ]
    for b_title, b_col in btns:
        draw.rounded_rectangle([bx, sy + 130, bx + 160, sy + 170], radius=8, fill=b_col)
        draw.text((bx + 15, sy + 142), b_title, font=f_xs, fill=(255, 255, 255))
        bx += 175

    canvas.save(os.path.join(REF_DIR, 'email-signature.jpg'), quality=95)
    print('Generated email-signature.jpg')


# 16. SCALING BUSINESS: Executive multi-branch dashboard with growth metrics
def gen_scaling_business():
    canvas = make_base_canvas('dark')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), title='OneClickBiz Multi-Outlet Enterprise Growth Cockpit')
    ix1, iy1, ix2, iy2 = inner
    
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(16, 20, 34))
    
    # Top 3 KPI Cards
    kpis = [
        ('TOTAL NETWORK REVENUE', '₹44.42 Lakhs', '+32% This Month', (34, 197, 94)),
        ('TOTAL DAILY ORDERS', '990 Orders', 'Across 3 Metros', (59, 130, 246)),
        ('ACTIVE CUSTOMER BASE', '18,420 Clients', '94% Repeat Rate', (245, 158, 11))
    ]
    kx = ix1 + 30
    kw = (ix2 - ix1 - 100) // 3
    for title, val, sub, col in kpis:
        draw.rounded_rectangle([kx, iy1 + 25, kx + kw, iy1 + 125], radius=12, fill=(24, 30, 48), outline=(45, 60, 90))
        draw.text((kx + 20, iy1 + 40), title, font=f_xs, fill=(140, 165, 195))
        draw.text((kx + 20, iy1 + 65), val, font=f_lg, fill=col)
        draw.text((kx + 20, iy1 + 95), sub, font=f_micro, fill=(180, 200, 230))
        kx += kw + 20
        
    # Regional Branch Performance List
    draw.text((ix1 + 30, iy1 + 150), 'REGIONAL METRO OUTLETS & STAFF PERMISSIONS', font=f_sm_b, fill=(255, 255, 255))
    
    branches = [
        ('Bengaluru Flagship (Indiranagar)', 'Branch Mgr: Priya Nair', '₹18.4 Lakhs', '420 Orders', (34, 197, 94)),
        ('Mumbai Flagship (Bandra West)', 'Branch Mgr: Amit Deshmukh', '₹14.2 Lakhs', '310 Orders', (59, 130, 246)),
        ('Hyderabad Hub (Jubilee Hills)', 'Branch Mgr: Suresh Varma', '₹11.8 Lakhs', '260 Orders', (236, 72, 153))
    ]
    by = iy1 + 185
    for b_name, b_mgr, b_rev, b_ord, b_col in branches:
        draw.rounded_rectangle([ix1 + 30, by, ix2 - 30, by + 68], radius=10, fill=(22, 28, 45), outline=(40, 55, 85))
        draw.ellipse([ix1 + 50, by + 24, ix1 + 70, by + 44], fill=b_col)
        draw.text((ix1 + 85, by + 14), b_name, font=f_sm_b, fill=(255, 255, 255))
        draw.text((ix1 + 85, by + 38), b_mgr, font=f_xs, fill=(140, 165, 195))
        draw.text((ix1 + 600, by + 24), b_ord, font=f_md_b, fill=(200, 220, 245))
        draw.text((ix1 + 820, by + 24), b_rev, font=f_lg, fill=b_col)
        by += 80

    canvas.save(os.path.join(REF_DIR, 'scaling-business.jpg'), quality=95)
    print('Generated scaling-business.jpg')


# 17. BUSINESS TOOLS: 6 Dark glassmorphism operations modules
def gen_business_tools():
    canvas = make_base_canvas('dark')
    inner = draw_mac_window(canvas, (60, 40, 1220, 680), title='OneClickBiz All-in-One Operations Cockpit')
    ix1, iy1, ix2, iy2 = inner
    
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(16, 20, 34))
    
    modules = [
        ('👥 Customer Leads & CRM', '4,821 Contacts', '+18 New Leads Today', (59, 130, 246)),
        ('💬 WhatsApp Order Stream', '28 Orders Pending', 'All Verified via UPI', (34, 197, 94)),
        ('🧾 GST Invoicing & Tax', '₹8.42 Lakhs MTD', '38 Invoices Settled', (147, 51, 234)),
        ('📦 Product Catalog Space', '1,240 Total SKUs', '100% In Stock Online', (245, 158, 11)),
        ('⭐ 5-Star Review Booster', '4.9 Star Rating', '148 Google Reviews', (234, 179, 8)),
        ('📅 Appointment Calendar', '12 Bookings Today', 'Next at 11:30 AM', (236, 72, 153))
    ]
    
    mx = ix1 + 30
    my = iy1 + 25
    mw = (ix2 - ix1 - 80) // 3
    mh = (iy2 - iy1 - 80) // 2
    
    for title, val, sub, col in modules:
        draw.rounded_rectangle([mx, my, mx + mw, my + mh], radius=14, fill=(24, 30, 50), outline=(45, 60, 95))
        draw.text((mx + 20, my + 20), title, font=f_sm_b, fill=(255, 255, 255))
        draw.text((mx + 20, my + 60), val, font=f_xl, fill=col)
        draw.text((mx + 20, my + 105), sub, font=f_xs, fill=(160, 185, 215))
        
        draw.rounded_rectangle([mx + 20, my + 145, mx + 160, my + 175], radius=6, fill=col)
        draw.text((mx + 35, my + 153), 'Open Module →', font=f_micro, fill=(255, 255, 255))
        
        mx += mw + 20
        if mx > ix2 - 100:
            mx = ix1 + 30
            my += mh + 20

    canvas.save(os.path.join(REF_DIR, 'business-tools.jpg'), quality=95)
    print('Generated business-tools.jpg')


if __name__ == '__main__':
    gen_custom_templates()
    gen_gallery_space()
    gen_services_management()
    gen_articles_blogs()
    gen_commercial_usage()
    gen_report_pdf()
    gen_personal_profile()
    gen_live_profile()
    gen_direct_app()
    gen_easy_designing()
    gen_custom_domain()
    gen_product_space()
    gen_payment_gateways()
    gen_canva_adobe()
    gen_email_signature()
    gen_scaling_business()
    gen_business_tools()
    print('ALL 17 REBUILT TO PHOTO/DEVICE GRADE QUALITY!')
