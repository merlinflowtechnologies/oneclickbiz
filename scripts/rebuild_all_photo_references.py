import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

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

f_xl = get_font(FONT_BOLD, 26)
f_title = get_font(FONT_BOLD, 22)
f_h2 = get_font(FONT_BOLD, 18)
f_h3 = get_font(FONT_BOLD, 15)
f_body_bold = get_font(FONT_BOLD, 13)
f_body = get_font(FONT_REG, 13)
f_sm_bold = get_font(FONT_BOLD, 11)
f_sm = get_font(FONT_REG, 11)
f_xs = get_font(FONT_REG, 10)
f_badge = get_font(FONT_BOLD, 10)

def create_canvas(bg_top, bg_bottom):
    W, H = 1200, 675
    im = Image.new('RGB', (W, H), bg_top)
    draw = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H
        r = int(bg_top[0] * (1 - t) + bg_bottom[0] * t)
        g = int(bg_top[1] * (1 - t) + bg_bottom[1] * t)
        b = int(bg_top[2] * (1 - t) + bg_bottom[2] * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    return im

def draw_top_header(draw, title, subtitle, badge_text, badge_color):
    draw.rounded_rectangle([60, 30, 200, 56], radius=13, fill=badge_color)
    draw.text((72, 36), badge_text.upper(), font=f_badge, fill=(255, 255, 255))
    draw.text((215, 30), title, font=f_xl, fill=(255, 255, 255))
    draw.text((60, 68), subtitle, font=f_body, fill=(200, 215, 240))
    draw.line([(60, 96), (1140, 96)], fill=(255, 255, 255, 30), width=1)


# 1. PERSONAL PROFILE
def build_personal_profile():
    im = create_canvas((15, 23, 42), (25, 35, 65))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Personal Profile & Verified Digital vCard', '1-Tap Save to Phone Contacts with executive photo, bio, direct WhatsApp & social links.', 'Identity', (37, 99, 235))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Executive Digital Persona', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'Never run out of business cards again.', font=f_body, fill=(180, 205, 240))
    
    pts = [
        ('1-Tap "Add to Contacts"', 'Downloads direct into iOS & Android address books.'),
        ('Instant Communication Hub', 'Direct WhatsApp chat, phone calls, website & UPI.'),
        ('Always Fresh & Up-to-Date', 'Change phone or designation anytime without reprinting.'),
        ('Works With or Without App', 'Scans with any phone camera or NFC tap instantly.')
    ]
    y = 220
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(37, 99, 235))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(160, 185, 220))
        y += 58

    # Right Real Phone Device Mockup
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(210, 225, 250), width=2)
    
    # Use real profile image
    if os.path.exists('public/kishore-profile-v2.png'):
        pimg = Image.open('public/kishore-profile-v2.png').convert('RGB')
        # Center crop and fit
        pw, ph = 600, 480
        pimg_res = pimg.resize((pw, ph), Image.Resampling.LANCZOS)
        mask = Image.new('L', (pw, ph), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, ph], radius=18, fill=255)
        im.paste(pimg_res, (px+20, py+15), mask)
    
    im.save(os.path.join(REF_DIR, 'personal-profile.jpg'), quality=95)
    print('Built photo personal-profile.jpg')


# 2. GALLERY SPACE
def build_gallery_space():
    im = create_canvas((15, 30, 40), (20, 50, 60))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Gallery Space & High-Resolution Portfolio', 'Showcase completed projects, before/after transformations & products in full HD lightbox.', 'Portfolio', (20, 184, 166))
    
    # Use real template_salon.png (which is an exquisite visual portfolio)
    if os.path.exists('public/landing/template_salon.png'):
        sim = Image.open('public/landing/template_salon.png').convert('RGB')
        sw, sh = 1080, 510
        # crop top section of salon template
        cropped = sim.crop((0, 0, sim.width, int(sim.width * (sh / sw))))
        resized = cropped.resize((sw, sh), Image.Resampling.LANCZOS)
        
        # Rounded mask with border
        mask = Image.new('L', (sw, sh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw, sh], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+sw+4, 113+sh+4], radius=22, outline=(20, 184, 166), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'gallery-space.jpg'), quality=95)
    print('Built photo gallery-space.jpg')


# 3. SERVICES MANAGEMENT
def build_services_management():
    im = create_canvas((15, 25, 45), (20, 40, 70))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Services Management & Appointment Booking', 'Interactive rate cards, real-time date/time slot booking & automated WhatsApp slips.', 'Scheduling', (2, 132, 199))
    
    # Use real template_hospital.png (which is doctor appointment scheduling & clinic services)
    if os.path.exists('public/landing/template_hospital.png'):
        him = Image.open('public/landing/template_hospital.png').convert('RGB')
        hw, hh = 1080, 510
        cropped = him.crop((0, 0, him.width, int(him.width * (hh / hw))))
        resized = cropped.resize((hw, hh), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (hw, hh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, hw, hh], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+hw+4, 113+hh+4], radius=22, outline=(2, 132, 199), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'services-management.jpg'), quality=95)
    print('Built photo services-management.jpg')


# 4. ARTICLES & BLOGS
def build_articles_blogs():
    im = create_canvas((15, 22, 50), (22, 36, 80))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Articles & Blogs Publishing Studio', 'Publish SEO-optimized articles, tutorials & business news to rank #1 on Google search.', 'SEO & Content', (59, 130, 246))
    
    # Use real template_education.png (academic blogs, courses, articles)
    if os.path.exists('public/landing/template_education.png'):
        eim = Image.open('public/landing/template_education.png').convert('RGB')
        ew, eh = 1080, 510
        cropped = eim.crop((0, 0, eim.width, int(eim.width * (eh / ew))))
        resized = cropped.resize((ew, eh), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (ew, eh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, ew, eh], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+ew+4, 113+eh+4], radius=22, outline=(59, 130, 246), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'articles-blogs.jpg'), quality=95)
    print('Built photo articles-blogs.jpg')


# 5. COMMERCIAL USAGE
def build_commercial_usage():
    im = create_canvas((18, 24, 38), (30, 40, 60))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Enterprise License & White-Label Rights', '100% commercial clearance, zero platform watermarks & multi-staff management.', 'Enterprise', (249, 115, 22))
    
    # Use real hero-visual-4k.png (multi-device ecosystem)
    if os.path.exists('public/landing/hero-visual-4k.png'):
        him = Image.open('public/landing/hero-visual-4k.png').convert('RGB')
        hw, hh = 1080, 510
        cropped = him.crop((0, 0, him.width, int(him.width * (hh / hw))))
        resized = cropped.resize((hw, hh), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (hw, hh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, hw, hh], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+hw+4, 113+hh+4], radius=22, outline=(249, 115, 22), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'commercial-usage.jpg'), quality=95)
    print('Built photo commercial-usage.jpg')


# 6. REPORT PDF EXTRACT
def build_report_pdf():
    im = create_canvas((28, 15, 20), (50, 22, 30))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Report PDF Extract & Fact-Sheets', 'Print-ready itemized order reports, client inquiries, revenue summaries & GST invoices.', 'Export & PDF', (220, 38, 38))
    
    # Use real template_insurance.png (corporate fact-sheets, reports, analytics)
    if os.path.exists('public/landing/template_insurance.png'):
        iim = Image.open('public/landing/template_insurance.png').convert('RGB')
        iw, ih = 1080, 510
        cropped = iim.crop((0, 0, iim.width, int(iim.width * (ih / iw))))
        resized = cropped.resize((iw, ih), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (iw, ih), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, iw, ih], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+iw+4, 113+ih+4], radius=22, outline=(220, 38, 38), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'report-pdf.jpg'), quality=95)
    print('Built photo report-pdf.jpg')


# 7. LIVE PROFILE
def build_live_profile():
    im = create_canvas((30, 12, 22), (55, 20, 35))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Live Profile & Real-Time Global Sync', 'Sub-100ms Cloudflare edge propagation with live store status pill and visitor ticker.', 'Real-Time Sync', (225, 29, 72))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Living Business Hub', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'Always fresh, always synced in real-time.', font=f_body, fill=(255, 215, 225))
    
    # Live pills on left
    draw.rounded_rectangle([85, 215, 435, 265], radius=12, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    draw.ellipse([100, 232, 116, 248], fill=(16, 185, 129))
    draw.text((125, 225), 'STORE OPEN NOW · Closes 9:30 PM', font=f_body_bold, fill=(22, 101, 52))
    draw.text((125, 245), 'Real-time open status for customers', font=f_xs, fill=(22, 101, 52))
    
    draw.rounded_rectangle([85, 280, 435, 330], radius=12, fill=(255, 241, 242), outline=(254, 205, 211), width=1)
    draw.text((100, 292), '🔥 28 People Browsing Right Now', font=f_body_bold, fill=(225, 29, 72))
    draw.text((100, 312), 'Live visitor counter builds buyer urgency', font=f_xs, fill=(159, 18, 57))

    pts = [
        ('Sub-100ms Edge Sync', 'Updates propagate across 200+ cities in milliseconds.'),
        ('Permanent Lifetime Link', 'Your URL never expires even if you move offices.')
    ]
    y = 355
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(225, 29, 72))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(245, 195, 205))
        y += 58

    # Right Live Profile preview
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(255, 215, 225), width=2)
    if os.path.exists('public/kishore-profile-v2.png'):
        pimg = Image.open('public/kishore-profile-v2.png').convert('RGB')
        pw, ph = 600, 480
        pimg_res = pimg.resize((pw, ph), Image.Resampling.LANCZOS)
        mask = Image.new('L', (pw, ph), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, ph], radius=18, fill=255)
        im.paste(pimg_res, (px+20, py+15), mask)

    im.save(os.path.join(REF_DIR, 'live-profile.jpg'), quality=95)
    print('Built photo live-profile.jpg')


# 8. DIRECT APP INSTALLATION
def build_direct_app():
    im = create_canvas((15, 30, 25), (20, 50, 40))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Direct App Installation (PWA)', 'Add branded app icon directly onto customer smartphones with 0% Play Store commission.', 'Mobile App / PWA', (16, 185, 129))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Native Mobile Experience', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'No Google Play or Apple App Store delays.', font=f_body, fill=(200, 240, 225))
    
    pts = [
        ('1-Tap Frictionless Install', 'Customers add to home screen without account passwords.'),
        ('Zero App Store Commissions', 'Keep 100% of revenue without giving 30% cut.'),
        ('Tiny < 2MB Storage Footprint', 'Lightweight PWA that customers never need to delete.'),
        ('Full-Screen Distraction Free', 'Hides browser address bars for clean app feel.')
    ]
    y = 220
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(16, 185, 129))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(180, 230, 215))
        y += 58

    # Right Phone Mockup
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(200, 240, 225), width=2)
    if os.path.exists('public/landing/mockup_phone3.png'):
        mimg = Image.open('public/landing/mockup_phone3.png').convert('RGBA')
        # Center the phone inside
        mw = 420
        mh = int(mimg.height * (mw / mimg.width))
        mimg_res = mimg.resize((mw, min(mh, 490)), Image.Resampling.LANCZOS)
        im.paste(mimg_res, (px + (640 - mw)//2, py + (515 - min(mh, 490))//2), mimg_res)

    im.save(os.path.join(REF_DIR, 'direct-app.jpg'), quality=95)
    print('Built photo direct-app.jpg')


# 9. EASY DESIGNING
def build_easy_designing():
    im = create_canvas((28, 15, 30), (50, 22, 50))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'No-Code Visual Editor Studio', 'Intuitive drag-and-drop designer with live phone simulator and instant live synchronization.', 'Design Studio', (236, 72, 153))
    
    if os.path.exists('public/landing/how-it-works-visual@2x.png'):
        wim = Image.open('public/landing/how-it-works-visual@2x.png').convert('RGB')
        ww, wh = 1080, 510
        cropped = wim.crop((0, 0, wim.width, int(wim.width * (wh / ww))))
        resized = cropped.resize((ww, wh), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (ww, wh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, ww, wh], radius=20, fill=255)
        draw.rounded_rectangle([58, 113, 58+ww+4, 113+wh+4], radius=22, outline=(236, 72, 153), width=2)
        im.paste(resized, (60, 115), mask)

    im.save(os.path.join(REF_DIR, 'easy-designing.jpg'), quality=95)
    print('Built photo easy-designing.jpg')


# 10. CUSTOM DOMAIN
def build_custom_domain():
    im = create_canvas((15, 25, 45), (20, 38, 70))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Custom Domain & Free Cloudflare 256-Bit SSL', 'Connect your own .com or .in web address with automatic HTTPS and global edge CDN caching.', 'Infrastructure', (14, 165, 233))
    
    # Browser window mockup
    bx, by = 60, 115
    bw, bh = 1080, 510
    draw.rounded_rectangle([bx, by, bx+bw, by+bh], radius=20, fill=(255, 255, 255), outline=(14, 165, 233), width=2)
    
    # Chrome Top Bar
    draw.rounded_rectangle([bx, by, bx+bw, by+55], radius=18, fill=(240, 245, 255))
    draw.rectangle([bx, by+35, bx+bw, by+55], fill=(240, 245, 255))
    draw.ellipse([bx+20, by+20, bx+34, by+34], fill=(239, 68, 68))
    draw.ellipse([bx+42, by+20, bx+56, by+34], fill=(245, 158, 11))
    draw.ellipse([bx+64, by+20, bx+78, by+34], fill=(16, 185, 129))
    
    # URL Bar
    draw.rounded_rectangle([bx+100, by+12, bx+bw-30, by+44], radius=10, fill=(255, 255, 255), outline=(200, 220, 245), width=1)
    draw.text((bx+120, by+18), '🔒 https://www.yourbusiness.com', font=f_body_bold, fill=(16, 24, 63))
    draw.text((bx+bw-280, by+20), '✓ Verified 256-Bit SSL Active', font=f_sm_bold, fill=(16, 185, 129))

    # Real website preview inside browser
    if os.path.exists('public/landing/template_restaurant.png'):
        rim = Image.open('public/landing/template_restaurant.png').convert('RGB')
        rw, rh = bw, bh - 55
        cropped = rim.crop((0, 0, rim.width, int(rim.width * (rh / rw))))
        resized = cropped.resize((rw, rh), Image.Resampling.LANCZOS)
        
        mask = Image.new('L', (rw, rh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, rw, rh], radius=0, fill=255)
        im.paste(resized, (bx, by+55))

    im.save(os.path.join(REF_DIR, 'custom-domain.jpg'), quality=95)
    print('Built photo custom-domain.jpg')


# 11. PRODUCT SPACE
def build_product_space():
    im = create_canvas((28, 20, 10), (50, 35, 15))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Product Space & Catalog Management', 'Unlimited item listings with SKU tags, variant sizes, stock tracking & direct WhatsApp links.', 'Inventory', (217, 119, 6))
    
    # 4 Product Cards Grid with real product photos
    # Load 4 product images from legacy_uploads
    prod_paths = [
        'public/legacy_uploads/vcards/products/27/1002060692.jpg',
        'public/legacy_uploads/vcards/products/9/1002070537.jpg',
        'public/legacy_uploads/vcards/products/17/1002070537.jpg',
        'public/legacy_uploads/vcards/testimonials/20/1002071151.jpg'
    ]
    
    px, py = 60, 115
    pw, ph = 250, 480
    gap = 26
    
    prod_data = [
        ('Handcrafted Gold Necklace', 'SKU: J-102 · 22K Karat', '₹45,999', 'IN STOCK'),
        ('Artisan Diamond Earrings', 'SKU: D-084 · Certified', '₹28,499', 'LOW STOCK'),
        ('Emerald Designer Pendant', 'SKU: E-201 · Limited', '₹19,999', 'IN STOCK'),
        ('Luxury Bridal Jewelry Set', 'SKU: B-990 · Complete Set', '₹89,999', 'PRE-ORDER')
    ]
    
    for i, (name, sku, price, stock) in enumerate(prod_data):
        draw.rounded_rectangle([px, py, px+pw, py+ph], radius=16, fill=(255, 255, 255), outline=(230, 220, 200), width=1)
        
        # Load and paste photo
        p_path = prod_paths[i % len(prod_paths)]
        if os.path.exists(p_path):
            pimg = Image.open(p_path).convert('RGB')
            pimg_res = pimg.resize((pw, 260), Image.Resampling.LANCZOS)
            mask = Image.new('L', (pw, 260), 0)
            ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, 260], radius=14, fill=255)
            im.paste(pimg_res, (px, py), mask)
        
        # Details below photo
        draw.text((px+15, py+280), name, font=f_body_bold, fill=(16, 24, 63))
        draw.text((px+15, py+305), sku, font=f_sm, fill=(120, 110, 100))
        draw.text((px+15, py+335), price, font=f_title, fill=(217, 119, 6))
        
        col = (16, 185, 129) if 'IN STOCK' in stock else (245, 158, 11)
        draw.rounded_rectangle([px+15, py+380, px+115, py+405], radius=6, fill=col)
        draw.text((px+26, py+387), stock, font=f_badge, fill=(255, 255, 255))
        
        # WhatsApp Order trigger
        draw.rounded_rectangle([px+15, py+425, px+pw-15, py+460], radius=10, fill=(16, 185, 129))
        draw.text((px+45, py+436), 'Order via WhatsApp', font=f_body_bold, fill=(255, 255, 255))
        
        px += pw + gap

    im.save(os.path.join(REF_DIR, 'product-space.jpg'), quality=95)
    print('Built photo product-space.jpg')


# 12. PAYMENT GATEWAYS
def build_payment_gateways():
    im = create_canvas((15, 30, 25), (20, 50, 45))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Payment Gateways & Instant UPI Integration', 'Accept Google Pay, PhonePe, Paytm, Cards & NetBanking with 24hr direct bank settlements.', 'Payments', (16, 185, 129))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Frictionless Checkout', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'Collect payments on auto-pilot with 0% hassle.', font=f_body, fill=(200, 240, 230))
    
    pts = [
        ('100% UPI Compatibility', 'GPay, PhonePe, Paytm, BHIM, CRED UPI & QR.'),
        ('Direct Bank Settlement', 'Funds transfer directly into your account in 24 hrs.'),
        ('Bank-Grade 256-Bit SSL', 'PCI-DSS certified encryption for all transactions.'),
        ('Automated WhatsApp Receipts', 'Sends payment confirmation and receipt instantly.')
    ]
    y = 220
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(16, 185, 129))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(180, 230, 220))
        y += 58

    # Right Checkout Sheet Mockup
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(200, 240, 230), width=2)
    
    draw.rounded_rectangle([px+30, py+25, 1110, py+105], radius=16, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    draw.text((px+50, py+38), 'SECURE PAYMENT CHECKOUT', font=f_sm_bold, fill=(22, 101, 52))
    draw.text((px+50, py+60), 'Total Amount: ₹2,499.00', font=f_title, fill=(16, 24, 63))
    draw.text((px+420, py+62), '🔒 256-Bit Bank Encrypted', font=f_body_bold, fill=(22, 101, 52))
    
    methods = [
        ('⚡ Google Pay / PhonePe', 'Instant 1-Tap UPI Intent on Mobile', 'FASTEST', (16, 185, 129)),
        ('📱 Paytm / BHIM UPI', 'Scan QR Code or Enter VPA ID', 'POPULAR', (37, 99, 235)),
        ('💳 Credit & Debit Cards', 'Visa, MasterCard, RuPay (Zero OTP Lag)', 'SECURE', (139, 92, 246)),
        ('🏛️ NetBanking & Wallets', 'All major Indian private & public banks', 'DIRECT', (245, 158, 11))
    ]
    ry = py + 125
    for name, desc, badge, col in methods:
        draw.rounded_rectangle([px+30, ry, 1110, ry+65], radius=12, fill=(248, 250, 255), outline=(230, 235, 245), width=1)
        draw.ellipse([px+50, ry+22, px+70, ry+42], fill=col)
        draw.text((px+85, ry+15), name, font=f_h3, fill=(16, 24, 63))
        draw.text((px+85, ry+38), desc, font=f_sm, fill=(110, 120, 135))
        draw.rounded_rectangle([px+460, ry+20, 1090, ry+48], radius=8, fill=col)
        draw.text((px+475, ry+26), badge, font=f_badge, fill=(255, 255, 255))
        ry += 78

    im.save(os.path.join(REF_DIR, 'payment-gateways.jpg'), quality=95)
    print('Built photo payment-gateways.jpg')


# 13. CANVA & ADOBE
def build_canva_adobe():
    im = create_canvas((15, 30, 45), (25, 45, 65))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Canva & Adobe Creative Suite Sync', 'Import high-resolution promotional graphics and auto-optimize for mobile and desktop.', 'Creative Sync', (225, 29, 72))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Professional Brand Sync', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'Use the design tools you already love.', font=f_body, fill=(245, 215, 225))
    
    pts = [
        ('Zero Distortion Scaling', 'Aspect ratio auto-lock prevents banner distortion.'),
        ('Auto WebP Compression', '80% smaller file sizes while preserving clarity.'),
        ('Hero Slider Support', 'Turn multiple posters into auto-sliding carousels.'),
        ('Transparent PNG Retained', 'Keeps clean alpha channels for logos and emblems.')
    ]
    y = 220
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(225, 29, 72))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(235, 200, 215))
        y += 58

    # Right Canvas Workspace
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(250, 215, 225), width=2)
    
    # Show real graphics
    if os.path.exists('public/images/salon-bg-customers.jpg'):
        sim = Image.open('public/images/salon-bg-customers.jpg').convert('RGB')
        sw, sh = 600, 480
        cropped = sim.crop((0, 0, sim.width, int(sim.width * (sh / sw))))
        resized = cropped.resize((sw, sh), Image.Resampling.LANCZOS)
        mask = Image.new('L', (sw, sh), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw, sh], radius=18, fill=255)
        im.paste(resized, (px+20, py+15), mask)

    im.save(os.path.join(REF_DIR, 'canva-adobe.jpg'), quality=95)
    print('Built photo canva-adobe.jpg')


# 14. EMAIL SIGNATURE
def build_email_signature():
    im = create_canvas((15, 28, 38), (22, 42, 58))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Clickable HTML Email Signature Generator', 'Interactive corporate email footers with WhatsApp, direct call, website & vCard buttons.', 'Email Tools', (13, 148, 136))
    
    # Left Benefit Box
    draw.rounded_rectangle([60, 115, 460, 630], radius=20, fill=(255, 255, 255, 12), outline=(255, 255, 255, 35), width=1)
    draw.text((85, 140), 'Passive Lead Generation', font=f_title, fill=(255, 255, 255))
    draw.text((85, 172), 'Turn everyday emails into business deals.', font=f_body, fill=(200, 235, 230))
    
    pts = [
        ('Universal Email Sync', 'Works on Gmail, Outlook, Apple Mail & Yahoo.'),
        ('Clickable WhatsApp & Call', 'Recipients chat in 1 tap from their email body.'),
        ('Embedded Dynamic QR Code', 'Desktop viewers scan to save contact to phone.'),
        ('Company-Wide Cohesion', 'Deploy unified corporate signatures in 2 minutes.')
    ]
    y = 220
    for t, d in pts:
        draw.ellipse([85, y+3, 97, y+15], fill=(13, 148, 136))
        draw.text((110, y), t, font=f_h3, fill=(255, 255, 255))
        draw.text((110, y+20), d, font=f_sm, fill=(180, 225, 220))
        y += 58

    # Right Desktop Email Compose Window Mockup
    px, py = 500, 115
    draw.rounded_rectangle([px, py, 1140, 630], radius=24, fill=(255, 255, 255), outline=(200, 230, 225), width=2)
    
    # Window Top Bar
    draw.rounded_rectangle([px, py, 1140, py+50], radius=22, fill=(240, 245, 245))
    draw.rectangle([px, py+35, 1140, py+50], fill=(240, 245, 245))
    draw.ellipse([px+20, py+18, px+32, py+30], fill=(239, 68, 68))
    draw.ellipse([px+40, py+18, px+52, py+30], fill=(245, 158, 11))
    draw.ellipse([px+60, py+18, px+72, py+30], fill=(16, 185, 129))
    draw.text((px+90, py+16), 'New Message — OneClickBiz Project Proposal', font=f_sm_bold, fill=(70, 80, 90))

    # Email text
    draw.text((px+30, py+65), 'To: client@acmeworks.com', font=f_sm, fill=(110, 120, 135))
    draw.text((px+30, py+88), 'Subject: Partnership Proposal & Digital Profile Access', font=f_body_bold, fill=(16, 24, 63))
    draw.line([(px+30, py+115), (1110, py+115)], fill=(230, 235, 240), width=1)
    
    draw.text((px+30, py+130), 'Hi John,', font=f_body, fill=(16, 24, 63))
    draw.text((px+30, py+155), 'Thank you for connecting with us today. Looking forward to scaling your business.', font=f_body, fill=(16, 24, 63))
    draw.text((px+30, py+180), 'Best regards,', font=f_body, fill=(16, 24, 63))

    # Clickable HTML Signature Block
    sy = py + 225
    draw.rounded_rectangle([px+30, sy, 1110, py+490], radius=16, fill=(248, 250, 255), outline=(210, 225, 240), width=1)
    
    draw.ellipse([px+48, sy+25, px+118, sy+95], fill=(13, 148, 136))
    draw.text((px+65, sy+47), 'AC', font=f_title, fill=(255, 255, 255))

    draw.text((px+135, sy+25), 'Alex Chen', font=f_title, fill=(16, 24, 63))
    draw.text((px+135, sy+55), 'Chief Strategy Officer · OneClickBiz Technologies', font=f_body, fill=(70, 85, 105))
    draw.text((px+135, sy+80), '📞 +91 98765 43210  |  🌐 www.oneclickbiz.in', font=f_sm, fill=(100, 115, 135))
    
    pills = [
        ('WhatsApp Chat', (16, 185, 129)),
        ('Download vCard', (37, 99, 235)),
        ('Book Appointment', (13, 148, 136)),
        ('Visit Store', (245, 158, 11))
    ]
    p_x = px + 135
    for ptext, pcol in pills:
        draw.rounded_rectangle([p_x, sy+125, p_x+115, sy+160], radius=8, fill=pcol)
        draw.text((p_x+10, sy+136), ptext, font=f_sm_bold, fill=(255, 255, 255))
        p_x += 125

    im.save(os.path.join(REF_DIR, 'email-signature.jpg'), quality=95)
    print('Built photo email-signature.jpg')


# 15. SCALING BUSINESS
def build_scaling_business():
    im = create_canvas((30, 15, 20), (55, 22, 35))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'Multi-Branch Growth & Analytics Engine', 'Manage multiple outlets, regional phone numbers and automated WhatsApp customer retention.', 'Growth & Scale', (239, 68, 68))
    
    # 3 High Impact KPI Tiles
    kpis = [
        ('TOTAL REVENUE', '₹18,45,000', '+28.4% vs last month', (16, 185, 129)),
        ('MONTHLY ORDERS', '4,820 Orders', '3.8x repeat buyers', (37, 99, 235)),
        ('ACTIVE BRANCHES', '12 Outlets', 'Across 4 Metros', (239, 68, 68))
    ]
    kx = 60
    for label, val, sub, col in kpis:
        draw.rounded_rectangle([kx, 115, kx+340, 220], radius=16, fill=(255, 245, 245), outline=(254, 226, 226), width=1)
        draw.text((kx+25, 135), label, font=f_sm, fill=(120, 80, 80))
        draw.text((kx+25, 158), val, font=f_xl, fill=(16, 24, 63))
        draw.text((kx+25, 192), sub, font=f_body_bold, fill=col)
        kx += 370

    # Outlets Performance Breakdown
    oy = 245
    draw.text((60, oy), 'Live Outlet Performance & Lead Routing', font=f_title, fill=(255, 255, 255))
    
    outlets = [
        ('Mumbai Flagship Store', 'Bandra West · Mgr: Rohit S.', '1,840 Orders', '₹7.2L Revenue', (16, 185, 129)),
        ('Bangalore Tech Park', 'Indiranagar · Mgr: Ananya M.', '1,420 Orders', '₹5.8L Revenue', (16, 185, 129)),
        ('Hyderabad Central', 'Jubilee Hills · Mgr: Vikram K.', '1,120 Orders', '₹4.1L Revenue', (37, 99, 235)),
        ('Pune High Street', 'Koregaon Park · Mgr: Sneha P.', '440 Orders', '₹1.35L Revenue', (245, 158, 11))
    ]
    ry = oy + 40
    for name, loc, ords, rev, col in outlets:
        draw.rounded_rectangle([60, ry, 1140, ry+72], radius=14, fill=(255, 255, 255), outline=(235, 240, 250), width=1)
        draw.ellipse([80, ry+26, 100, ry+46], fill=col)
        draw.text((120, ry+16), name, font=f_h2, fill=(16, 24, 63))
        draw.text((120, ry+42), loc, font=f_body, fill=(110, 120, 135))
        draw.text((680, ry+26), ords, font=f_title, fill=(16, 24, 63))
        draw.text((920, ry+26), rev, font=f_title, fill=col)
        ry += 86

    im.save(os.path.join(REF_DIR, 'scaling-business.jpg'), quality=95)
    print('Built photo scaling-business.jpg')


# 16. BUSINESS TOOLS
def build_business_tools():
    im = create_canvas((18, 20, 45), (28, 32, 70))
    draw = ImageDraw.Draw(im)
    draw_top_header(draw, 'All-in-One Operations & Growth Suite', 'Unified operations cockpit for customer contacts, invoicing, catalog & daily growth.', 'Operations', (99, 102, 241))
    
    modules = [
        ('👥 Customer CRM Leads', '4,821 Active Contacts', '+18 leads today', (37, 99, 235)),
        ('💬 WhatsApp Order Queue', '24 Orders Pending', 'All paid via UPI', (16, 185, 129)),
        ('🧾 Invoicing & Tax Bills', '₹8.42 Lakhs MTD', '38 invoices sent', (99, 102, 241)),
        ('📦 Product Catalog Space', '1,240 Total SKUs', '100% In Stock', (245, 158, 11)),
        ('⭐ 5-Star Review Booster', '4.9 Rating (148 Reviews)', 'Google Business #1', (234, 179, 8)),
        ('📅 Staff & Appointments', '12 Bookings Today', 'Next at 11:30 AM', (236, 72, 153))
    ]
    mx, my = 60, 120
    mw, mh = 340, 235
    gap_x, gap_y = 30, 25
    
    for title, val, sub, col in modules:
        draw.rounded_rectangle([mx, my, mx+mw, my+mh], radius=18, fill=(255, 255, 255), outline=(225, 235, 250), width=1)
        draw.text((mx+25, my+25), title, font=f_h2, fill=(16, 24, 63))
        draw.text((mx+25, my+75), val, font=f_title, fill=col)
        draw.text((mx+25, my+125), sub, font=f_body, fill=(100, 115, 135))
        
        # Action button
        draw.rounded_rectangle([mx+25, my+170, mx+160, my+205], radius=8, fill=col)
        draw.text((mx+40, my+180), 'Manage Module →', font=f_badge, fill=(255, 255, 255))
        
        mx += mw + gap_x
        if mx > 1000:
            mx = 60
            my += mh + gap_y

    im.save(os.path.join(REF_DIR, 'business-tools.jpg'), quality=95)
    print('Built photo business-tools.jpg')


if __name__ == '__main__':
    build_personal_profile()
    build_gallery_space()
    build_services_management()
    build_articles_blogs()
    build_commercial_usage()
    build_report_pdf()
    build_live_profile()
    build_direct_app()
    build_easy_designing()
    build_custom_domain()
    build_product_space()
    build_payment_gateways()
    build_canva_adobe()
    build_email_signature()
    build_scaling_business()
    build_business_tools()
    print('REBUILT ALL PHOTO-QUALITY REFERENCE IMAGES!')
