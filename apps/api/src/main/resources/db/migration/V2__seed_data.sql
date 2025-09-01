-- Insert categories
INSERT INTO categories (slug, name_fr, name_en, name_ar, description_fr, description_en, description_ar, is_active, display_order) VALUES
('miels', 'Miels', 'Honeys', 'عسل', 'Découvrez notre sélection de miels naturels du terroir marocain', 'Discover our selection of natural honeys from Moroccan terroir', 'اكتشف مجموعتنا من العسل الطبيعي من التراث المغربي', true, 1),
('pollen', 'Pollen', 'Pollen', 'حبوب اللقاح', 'Pollen d''abeille riche en nutriments', 'Bee pollen rich in nutrients', 'حبوب لقاح النحل الغنية بالمغذيات', true, 2),
('produits-ruche', 'Produits de la Ruche', 'Hive Products', 'منتجات النحل', 'Autres produits de la ruche: propolis, gelée royale', 'Other hive products: propolis, royal jelly', 'منتجات أخرى من الخلية: البروبوليس، غذاء الملكات', true, 3);

-- Insert products
INSERT INTO products (sku, slug, name_fr, name_en, name_ar, description_fr, description_en, description_ar, price, currency, stock_quantity, weight_grams, ingredients, origin, is_halal, is_active, is_featured, category_id) VALUES
('HNY-ORA-500', 'miel-oranger-500g', 'Miel d''Oranger 500g', 'Orange Blossom Honey 500g', 'عسل زهر البرتقال 500غ', 
'Notre miel d''oranger est récolté dans les vergers d''agrumes du Souss. Sa texture crémeuse et son goût doux et floral en font un délice pour les papilles. Parfait pour sucrer naturellement vos boissons chaudes ou à déguster sur du pain.',
'Our orange blossom honey is harvested from the citrus groves of Souss. Its creamy texture and sweet, floral taste make it a delight for the taste buds. Perfect for naturally sweetening your hot drinks or enjoying on bread.',
'يتم حصاد عسل زهر البرتقال لدينا من بساتين الحمضيات في سوس. قوامه الكريمي وطعمه الحلو الزهري يجعله متعة للذوق. مثالي لتحلية مشروباتك الساخنة بشكل طبيعي أو للاستمتاع به على الخبز.',
89.00, 'MAD', 120, 500, '100% Miel naturel d''oranger', 'Souss, Maroc', true, true, true, 1),

('HNY-THY-500', 'miel-thym-500g', 'Miel de Thym 500g', 'Thyme Honey 500g', 'عسل الزعتر 500غ',
'Le miel de thym est reconnu pour ses propriétés antiseptiques et son goût unique. Récolté dans les montagnes de l''Atlas, ce miel ambré possède des notes herbacées caractéristiques.',
'Thyme honey is known for its antiseptic properties and unique taste. Harvested in the Atlas Mountains, this amber honey has characteristic herbaceous notes.',
'عسل الزعتر معروف بخصائصه المطهرة وطعمه الفريد. يتم حصاده في جبال الأطلس، هذا العسل الكهرماني له نكهات عشبية مميزة.',
95.00, 'MAD', 80, 500, '100% Miel naturel de thym', 'Atlas, Maroc', true, true, true, 1),

('HNY-EUC-500', 'miel-eucalyptus-500g', 'Miel d''Eucalyptus 500g', 'Eucalyptus Honey 500g', 'عسل الأوكالبتوس 500غ',
'Le miel d''eucalyptus est apprécié pour ses vertus respiratoires. Sa couleur ambrée foncée et son goût mentholé en font un allié précieux pendant l''hiver.',
'Eucalyptus honey is appreciated for its respiratory benefits. Its dark amber color and mentholated taste make it a valuable ally during winter.',
'عسل الأوكالبتوس محبوب لفوائده التنفسية. لونه الكهرماني الداكن وطعمه المنثولي يجعله حليفًا قيمًا خلال الشتاء.',
85.00, 'MAD', 100, 500, '100% Miel naturel d''eucalyptus', 'Gharb, Maroc', true, true, false, 1),

('POL-BEE-250', 'pollen-abeille-250g', 'Pollen d''Abeille 250g', 'Bee Pollen 250g', 'حبوب لقاح النحل 250غ',
'Le pollen d''abeille est un super-aliment riche en protéines, vitamines et minéraux. Récolté avec soin par nos abeilles, il constitue un excellent complément alimentaire naturel.',
'Bee pollen is a superfood rich in proteins, vitamins and minerals. Carefully collected by our bees, it makes an excellent natural dietary supplement.',
'حبوب لقاح النحل هي غذاء فائق غني بالبروتينات والفيتامينات والمعادن. يتم جمعها بعناية من قبل نحلنا، وتشكل مكملاً غذائياً طبيعياً ممتازاً.',
120.00, 'MAD', 50, 250, '100% Pollen d''abeille naturel', 'Diverses régions, Maroc', true, true, false, 2),

('HNY-MUL-1000', 'miel-multifloral-1kg', 'Miel Toutes Fleurs 1kg', 'Wildflower Honey 1kg', 'عسل متعدد الأزهار 1كغ',
'Notre miel toutes fleurs est un mélange harmonieux de nectars récoltés sur diverses fleurs sauvages. Chaque pot offre une expérience gustative unique selon la saison de récolte.',
'Our wildflower honey is a harmonious blend of nectars collected from various wild flowers. Each jar offers a unique taste experience depending on the harvest season.',
'عسلنا متعدد الأزهار هو مزيج متناغم من الرحيق المجموع من أزهار برية مختلفة. كل برطمان يقدم تجربة ذوقية فريدة حسب موسم الحصاد.',
150.00, 'MAD', 60, 1000, '100% Miel naturel multifloral', 'Diverses régions, Maroc', true, true, false, 1);

-- Insert product images
INSERT INTO product_images (product_id, image_url) VALUES
(1, '/images/products/miel-oranger-1.jpg'),
(1, '/images/products/miel-oranger-2.jpg'),
(2, '/images/products/miel-thym-1.jpg'),
(2, '/images/products/miel-thym-2.jpg'),
(3, '/images/products/miel-eucalyptus-1.jpg'),
(4, '/images/products/pollen-abeille-1.jpg'),
(5, '/images/products/miel-multifloral-1.jpg');

-- Insert users (passwords will be BCrypt hashed: Admin!234 and Customer!234)
-- Note: These are example hashes, the actual application should generate proper BCrypt hashes
INSERT INTO users (name, email, password, phone, role, enabled, email_verified) VALUES
('Admin User', 'admin@darlemlih.ma', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCqXMfJVgPEtuDSqGaQ4mBm', '+212600000001', 'ADMIN', true, true),
('Customer User', 'customer@darlemlih.ma', '$2a$12$SME34mBRdqO3V6z8Xz7gDuvx1j8xJ9Z7qGPwLXXYJxXCj7qrJ3RpO', '+212600000002', 'CUSTOMER', true, true),
('Test Customer', 'test@example.com', '$2a$12$SME34mBRdqO3V6z8Xz7gDuvx1j8xJ9Z7qGPwLXXYJxXCj7qrJ3RpO', '+212600000003', 'CUSTOMER', true, false);

-- Insert addresses for customer user
INSERT INTO addresses (user_id, line1, line2, city, region, postal_code, country, is_default) VALUES
(2, '123 Rue Mohammed V', 'Appartement 4', 'Casablanca', 'Casablanca-Settat', '20000', 'Morocco', true),
(2, '456 Avenue Hassan II', NULL, 'Rabat', 'Rabat-Salé-Kénitra', '10000', 'Morocco', false);

-- Insert a sample paid order
INSERT INTO orders (order_number, user_id, status, subtotal, shipping_cost, discount, total, currency, payment_provider, payment_intent_id, shipping_name, shipping_phone, shipping_line1, shipping_city, shipping_region, shipping_postal_code, shipping_country) VALUES
('ORD-2025-000001', 2, 'PAID', 274.00, 30.00, 0.00, 304.00, 'MAD', 'mock', 'pi_mock_123456789', 'Customer User', '+212600000002', '123 Rue Mohammed V', 'Casablanca', 'Casablanca-Settat', '20000', 'Morocco');

-- Insert order items for the sample order
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
(1, 1, 2, 89.00, 178.00),
(1, 2, 1, 95.00, 95.00);
