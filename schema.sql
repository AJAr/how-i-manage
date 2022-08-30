CREATE TABLE `usermanagement`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `comments` TEXT NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
