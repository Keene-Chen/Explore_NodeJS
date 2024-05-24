-- CreateTable
CREATE TABLE `emqx_client_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientid` VARCHAR(255) NULL,
    `event` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emqx_messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientid` VARCHAR(255) NULL,
    `topic` VARCHAR(255) NULL,
    `payload` BLOB NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
