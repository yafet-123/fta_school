-- ============================================================
-- Run this in phpMyAdmin → SQL tab for aceitcom_quiz database
-- Creates BookCategory, Book, and BookTopic tables safely
-- ============================================================

-- 1. BookCategory (linked to Subject)
CREATE TABLE IF NOT EXISTS `BookCategory` (
  `id`        INT NOT NULL AUTO_INCREMENT,
  `title`     VARCHAR(255) NOT NULL,
  `subjectId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_bookCategory_subjectId` (`subjectId`),
  INDEX `idx_bookCategory_title` (`title`),
  CONSTRAINT `BookCategory_subject_fkey`
    FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`)
    ON DELETE CASCADE ON UPDATE RESTRICT
);

-- 2. Book (linked to BookCategory)
CREATE TABLE IF NOT EXISTS `Book` (
  `id`             INT NOT NULL AUTO_INCREMENT,
  `title`          VARCHAR(255) NOT NULL,
  `bookFile`       TEXT NOT NULL,
  `bookCategoryId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_book_categoryId` (`bookCategoryId`),
  INDEX `idx_book_title` (`title`),
  CONSTRAINT `Book_category_fkey`
    FOREIGN KEY (`bookCategoryId`) REFERENCES `BookCategory` (`id`)
    ON DELETE CASCADE ON UPDATE RESTRICT
);

-- 3. BookTopic (linked to Book)
CREATE TABLE IF NOT EXISTS `BookTopic` (
  `id`     INT NOT NULL AUTO_INCREMENT,
  `title`  VARCHAR(255) NOT NULL,
  `bookId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_book_topic` (`bookId`),
  CONSTRAINT `BookTopic_book_fkey`
    FOREIGN KEY (`bookId`) REFERENCES `Book` (`id`)
    ON DELETE CASCADE ON UPDATE RESTRICT
);
