-- KIEM TRA DATABASE CO TON TAI 
-- CREATE SCHEMA `cosmeticproject` ; TAO DATABASE
-- SHOW DATABASES LIKE '%cosmetic%'; 
-- SHOW DATABASES LIKE '%cosmetic%';
-- CHON DATABASE VA SU DUNG NEU T0N TAI 
-- SELECT SCHEMA_NAME 
-- FROM INFORMATION_SCHEMA.SCHEMATA
-- WHERE SCHEMA_NAME = 'cosmeticproject';

DROP DATABASE IF EXISTS dbcosmetic;
CREATE DATABASE dbcosmetic;
USE dbcosmetic;

<<<<<<< HEAD
=======

>>>>>>> nvmtri
-- TAO BANG
CREATE TABLE IF NOT EXISTS PRODUCT(
	PRODUCT_ID varchar(5) NOT NULL,
	PRODUCT_NAME varchar(70) DEFAULT NULL,
<<<<<<< HEAD
	PRODUCT_PRICE int unsigned DEFAULT NULL,
	PRODUCT_CATEGORY varchar(20) DEFAULT NULL,
	PRODUCT_BRAND varchar(4) DEFAULT NULL,
	PRODUCT_DESCRIPTION varchar(90) DEFAULT NULL,
=======
	PRODUCT_PRICE decimal(6, 2) DEFAULT NULL,
	PRODUCT_CATEGORY varchar(20) DEFAULT NULL,
	PRODUCT_BRAND varchar(20) DEFAULT NULL,
	PRODUCT_DESCRIPTION varchar(1000) DEFAULT NULL,
>>>>>>> nvmtri
	NUMBER_OF int unsigned DEFAULT NULL,
    
    -- KHOA CHINH 
	CONSTRAINT PK_PRODUCT
	PRIMARY KEY(PRODUCT_ID)
);

CREATE TABLE IF NOT EXISTS PRODUCT_IMAGE(
	IMAGE_ID varchar(5) NOT NULL,
	PRODUCT_ID varchar(5) DEFAULT NULL,
<<<<<<< HEAD
	PRODUCT_IMAGE varchar(20) DEFAULT NULL,
=======
	PRODUCT_IMAGE varchar(50) DEFAULT NULL,
>>>>>>> nvmtri
    
	CONSTRAINT PK_PRODUCT_IMAGE
	PRIMARY KEY(IMAGE_ID)
);

CREATE TABLE IF NOT EXISTS USERS(
	USER_ID varchar(5) NOT NULL,
	USER_EMAIL varchar(50) DEFAULT NULL,
	USER_PHONE varchar(20) DEFAULT NULL,
    USER_PASSWORD varchar(20) DEFAULT NULL,
    
	CONSTRAINT PK_USERS
	PRIMARY KEY(USER_ID)
);

CREATE TABLE IF NOT EXISTS ADDRESS(
	ADDRESS_ID varchar(5) NOT NULL,
	USER_ID varchar(50) DEFAULT NULL,
	UNIT_NUMBER varchar(20) DEFAULT NULL,
    STREET_NUMBER varchar(20) DEFAULT NULL,
    DICTRICT varchar(20) DEFAULT NULL,
    CITY varchar(20) DEFAULT NULL,
    DEPARTMENT varchar(20) DEFAULT NULL,
    COUNTRY varchar(20) DEFAULT NULL,
    ADRESS_LINE varchar(50) DEFAULT NULL,
    
	CONSTRAINT PK_ADDRESS
	PRIMARY KEY(ADDRESS_ID)
);

<<<<<<< HEAD
-- THIET LAP KHOA PHU
=======
CREATE TABLE IF NOT EXISTS PRODUCT_REVIEW(
	REVIEW_ID int AUTO_INCREMENT NOT NULL, 
	USER_ID varchar(5) NOT NULL,
	PRODUCT_ID varchar(5) NOT NULL,
    RATING DECIMAL(2,1) DEFAULT NULL,
    PRODUCT_REVIEW varchar(100) DEFAULT NULL,
    
	CONSTRAINT PK_PRODUCT_REVIEW
	PRIMARY KEY(REVIEW_ID, USER_ID, PRODUCT_ID)
);

CREATE TABLE IF NOT EXISTS CART(
	CART_ID varchar(5) NOT NULL,
	USER_EMAIL varchar(5) DEFAULT NULL,

	CONSTRAINT PK_CART
	PRIMARY KEY(CART_ID)
);

CREATE TABLE IF NOT EXISTS PRODUCT_CART(
	PRODUCT_CART_ID int AUTO_INCREMENT NOT NULL, 
	CART_ID varchar(5) NOT NULL,
	PRODUCT_ID varchar(5) NOT NULL,
    QUANTITY int NOT NULL,

	CONSTRAINT PK_PRODUCT_CART
	PRIMARY KEY(PRODUCT_CART_ID)
);

CREATE TABLE IF NOT EXISTS PRODUCT_ORDER(
	PRODUCT_ORDER_ID int AUTO_INCREMENT NOT NULL,
    ORDER_ID int NOT NULL, 
	PRODUCT_ID varchar(50) NOT NULL,
    QUANTITY INT NOT NULL,
    
	CONSTRAINT PK_USER_ORDER
	PRIMARY KEY(PRODUCT_ORDER_ID)
);

CREATE TABLE IF NOT EXISTS ORDER(
	ORDER_ID int AUTO_INCREMENT NOT NULL, 
	USER_EMAIL varchar(5) NOT NULL,
	ORDER_DATE date NOT NULL,
    PAYMENT_METHOD varchar(20) NOT NULL,
    ADDRESS_SHIPPING varchar(5) NOT NULL, 
    TOTAL FLOAT NOT NULL,
    ORDER_STATUS varchar(100) DEFAULT NULL,

	CONSTRAINT PK_SHOP_ORDER
	PRIMARY KEY(ORDER_ID)
);

ALTER TABLE ORDER
ADD
	CONSTRAINT FK_ORDER_USERS
	FOREIGN KEY(USER_EMAIL))
	REFERENCES USERS(USER_EMAIL))

ALTER TABLE PRODUCT_ORDER
ADD
	CONSTRAINT FK_PRODUCT_ORDER_ORDER
	FOREIGN KEY(ORDER_ID)
	REFERENCES ORDER(ORDER_ID)

    

-- THIET LAP KHOA PHU -----------------------------------------------------------------
>>>>>>> nvmtri
ALTER TABLE PRODUCT_IMAGE
ADD
	CONSTRAINT FK_PRODUCT_IMAGE_PRODUCT
	FOREIGN KEY(PRODUCT_ID)
	REFERENCES PRODUCT(PRODUCT_ID);
    
ALTER TABLE ADDRESS
ADD
	CONSTRAINT FK_ADDRESS_USERS
	FOREIGN KEY(USER_ID)
	REFERENCES USERS(USER_ID);
    
<<<<<<< HEAD
=======
ALTER TABLE PRODUCT_REVIEW
ADD
	CONSTRAINT FK_PRODUCT_REVIEW_PRODUCT
	FOREIGN KEY(PRODUCT_ID)
	REFERENCES PRODUCT(PRODUCT_ID),
ADD
    CONSTRAINT FK_PRODUCT_REVIEW_USERS
	FOREIGN KEY(USER_ID)
	REFERENCES USERS(USER_ID);

ALTER TABLE CART
ADD
	CONSTRAINT FKCART_USERS
	FOREIGN KEY(USER_EMAIL)
	REFERENCES USERS(USER_EMAIL);

ALTER TABLE PRODUCT_CART
ADD
	CONSTRAINT FK_PRODUCT_CART_PRODUCT
	FOREIGN KEY(PRODUCT_ID)
	REFERENCES PRODUCT(PRODUCT_ID),
ADD
    CONSTRAINT FK_PRODUCT_CART_CART
	FOREIGN KEY(CART_ID)
	REFERENCES CART(CART_ID);
    
ALTER TABLE SHOP_ORDER
ADD
	CONSTRAINT FK_SHOP_ORDER_ADDRESS
	FOREIGN KEY(ADDRESS_ID)
	REFERENCES ADDRESS(ADDRESS_ID);
    
ALTER TABLE USER_ORDER
ADD
	CONSTRAINT FK_USER_ORDER_SHOP_ORDER
	FOREIGN KEY(SHOP_ORDER_ID)
	REFERENCES SHOP_ORDER(SHOP_ORDER_ID),
ADD
	CONSTRAINT FK_USER_ORDER_PRODUCT
	FOREIGN KEY(PRODUCT_ID)
	REFERENCES PRODUCT(PRODUCT_ID);
    
-- -------------------------------------------- INSERT DATA -------------------------------------------------------------------

-- TABLE PRODCUT
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
	('LI01', 'Block Lipstick', 28, 'Block Lipstick', 'ILIA', 
	 'What it is: A clean, handcrafted lipstick with h igh-impact color and supreme hydration, for all-day wear and care\n
      How it works: Clean color, big impact. This full-coverage lipstick is handcrafted with custom pigments in organic castor 
      seed oil—giving you four times the intensity with a creamy finish. For a bold, longwearing lip that stays smooth. In a 
      range of ultra-wearable nudes, reds, and berries\n
	  0.14 oz | 4 g', 10);
      
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES     
	('LI02', 'M·A·C X WHITNEY HOUSTON', 23, 'Block Lipstick', 'MAC',
	'A curated lineup of four new red and neutral lipsticks in Amplified and Matte textures, wrapped in special-edition gold packaging.\n
     CREMESHEEN\n
     Creamy, semi-glossy finish\n
     Provides immediate shine\n
     Provides instant hydration\n', 3);
     
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
	('MA01', 'High Impact™ Mascara', 23, 'Mascara', 'clinique',
     'Who It\'s For All\n
     Skin Types\n
     What It Is\n
     Instant drama for lashes. Kicks up the volume and length of each and every lash.\n
     What It Does\n
     Creates lusher, plusher, bolder lashes. Pure, deep color adds to the impact. Lash definition draws attention to eyes.', 6);
     
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('PE01', 'IDOLE EDP PERFUME', 107, 'PERFUME', 'Lancome Paris',
    'NEW GENERATION PERFUMES\n
    Discover the world\'s thinnest fragrance: Thin, Nomadic, Created from the future.\n
    Feel the fresh & sweet fragrance of Idôle perfume, which brings a sense of comfort\n
    but extreme power. The scent is possessed by young people to reveal their own charismatic aura.\n
    WHAT MAKES THE DIFFERENCE\n
    New generation sweet rose ingredients are grown & harvested sustainably to preserve the essence and\n
    bring the intense vitality of the new era to the jasmine scent to help increase the freshness and natural\n
    vitality of this scent.', 4);

INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES   
    ('PE02', 'PERFUME LA VIE EST BELLE OUI', 99, 'PERFUME', 'Lancome Paris',
    'LIFE IS BEAUTIFUL\n
    With bold OUI, Lancôme reaffirms its timeless power: LIFE IS BEAUTIFUL.\n
    Celebrate the beauty of life with the new Eau de Parfum d\'Exception.\n
    - DISTINCT AND NOBLE\n
    SCENTS - A COMBINATION OF THE MOST PRECIOUS INGREDIENTS IN PERFUMES\n
    - UNIQUE BOTTLE DESIGNS ADORNED WITH ROWS OF YELLOW FIREWORKS', 2);

INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('SK01','All About Clean™ 2-in-1 Charcoal Mask + Scrub', 32, 'skincare', 'clinique',
    'Who It\'s For\n
    All Skin Types\n
    What It Is\n
    Five-minute dual-action detoxifying face mask and scrub that helps remove pollution, impurities,\n
    excess oil, plus refines skin’s texture.\n
	What It Does\n
    Two-in-one formula with bamboo charcoal and kaolin clay delivers a powerful,\n
    detoxifying clean for polished skin. Leaves skin clear, bright, and feeling smooth.', 4);
    
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('SE01', 'Anew Platinum Lift Sculptor Age-Delay Lifting Serum', 45, 'SERUM', 'avon',
    'With an innovative antioxidant technology containing niacinamide (vitamin B3) and panthenol (pro-vitamin B5)\n
    plus collagen-stimulating peptides. Use AM and PM before moisturizer. 1 fl. oz.', 2);
    
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('PO01', 'Colors of LOVE Glow Beads Illuminating Powder', 30, 'Powder', 'avon',
    'LOVE THE GLOW\n
    Light up the room with a skin-loving glow collection that’s truly illuminating!\n
    Time for a glow up. Luminous heart-shaped and round powder beads blend beautifully\n
    to create instant radiance, while the lightweight formula provides a delicate pearlescent\n
    finish on all skin tones. .71 oz. net wt.', 1);
    
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('PR01', 'VDL Expert Color Primer for Eyes', 24, 'Primer', 'avon',
    'Prep lids for smoother application and enhance shadow shades for a more vibrant, brighter result.\n
    Infused with skin-caring Tahitian black pearl powder, this primer is rich in amino acids and helps deliver\n
    moisturization and brightening effects. Comes in three shades: Shimmer, Serenity and Original to suit a variety of looks.\n
    Each, .22 oz. net wt.', 2);
    
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF)
VALUES
    ('ES01', 'Glimmer Eyeshadow Quad', 15, 'Eyeshadow', 'avon',
    'Intensify your eyes with new, Glimmer Eyeshadow Quads. Unique shade families specifically curated to enhance\n
    a variety of eye colors while creating your most expressive and alluring eyes.\n
    Glimmer Eyeshadow Quads feature a range of finishes from smooth mattes and dimensional satins to multi-faceted glitters.\n
    Rich pigment payoff makes colors pop with just a single swipe. Long-wearing, creamy powder formula hugs eyelids for\n
    all day wear, without the messy fallout. Grab a quad and create your dreamiest eyes yet! .21 oz. total net wt.', 4);
    
SELECT * FROM PRODUCT;

-- Table PRODUCT_IMAGE
INSERT INTO PRODUCT_IMAGE(IMAGE_ID, PRODUCT_ID, PRODUCT_IMAGE)
VALUES
    ('I001', 'LI01', '/img/product/LI01-1.png'),
    ('I002', 'LI01', '/img/product/LI01-2.png'),
    ('I003', 'LI01', '/img/product/LI01-3.png'),
	('I004', 'LI02', '/img/product/LI02-1.png'),
    ('I005', 'LI02', '/img/product/LI02-2.png'),
    ('I006', 'LI02', '/img/product/LI02-3.png'),
	('I007', 'MA01', '/img/product/MA01-1.png'),
    ('I008', 'MA01', '/img/product/MA01-2.png'),
    ('I009', 'MA01', '/img/product/MA01-3.png'),
	('I010', 'PE01', '/img/product/PE01-1.png'),
    ('I011', 'PE01', '/img/product/PE01-2.png'),
    ('I012', 'PE01', '/img/product/PE01-3.png'),
	('I013', 'PE02', '/img/product/PE02-1.png'),
    ('I014', 'PE02', '/img/product/PE02-2.png'),
    ('I015', 'PE02', '/img/product/PE02-3.png'),
	('I016', 'SK01', '/img/product/SK01-1.png'),
    ('I017', 'SK01', '/img/product/SK01-2.png'),
    ('I018', 'SK01', '/img/product/SK01-3.png'),
	('I019', 'SE01', '/img/product/SE01-1.png'),
    ('I020', 'SE01', '/img/product/SE01-2.png'),
    ('I021', 'SE01', '/img/product/SE01-3.png'),
	('I022', 'PO01', '/img/product/PO01-1.png'),
    ('I023', 'PO01', '/img/product/PO01-2.png'),
    ('I024', 'PO01', '/img/product/PO01-3.png'),
	('I025', 'PR01', '/img/product/PR01-1.png'),
    ('I026', 'PR01', '/img/product/PR01-2.png'),
    ('I027', 'PR01', '/img/product/PR01-3.png'),
	('I028', 'ES01', '/img/product/ES01-1.png'),
    ('I029', 'ES01', '/img/product/ES01-2.png'),
    ('I030', 'ES01', '/img/product/ES01-3.png');

SELECT * FROM PRODUCT_IMAGE;

SELECT 
	PR.*,
    IMG.PRODUCT_IMAGE
FROM PRODUCT  PR
INNER JOIN PRODUCT_IMAGE IMG ON PR.PRODUCT_ID = IMG.PRODUCT_ID

-- Table USER

-- Table PRODUCT_REVIEW




    
>>>>>>> nvmtri
    






