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
