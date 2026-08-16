-- Run in phpMyAdmin → aceitcom_quiz → SQL tab

-- 1. NoteCategory table
CREATE TABLE IF NOT EXISTS `NoteCategory` (
  `id`        INT NOT NULL AUTO_INCREMENT,
  `title`     VARCHAR(255) NOT NULL,
  `subjectId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_noteCategory_subjectId` (`subjectId`),
  INDEX `idx_noteCategory_title` (`title`),
  CONSTRAINT `NoteCategory_subject_fkey`
    FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`)
    ON DELETE CASCADE ON UPDATE RESTRICT
);

-- 2. Add noteCategoryId column to Note table (nullable, safe migration)
ALTER TABLE `Note`
  ADD COLUMN IF NOT EXISTS `noteCategoryId` INT NULL AFTER `subjectId`,
  ADD INDEX IF NOT EXISTS `Note_ibfk_3` (`noteCategoryId`),
  ADD CONSTRAINT `Note_ibfk_3`
    FOREIGN KEY (`noteCategoryId`) REFERENCES `NoteCategory` (`id`)
    ON DELETE SET NULL ON UPDATE RESTRICT;
