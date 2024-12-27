CREATE TABLE IF NOT EXISTS cagnottes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO cagnottes (name, amount) VALUES
('Martin', 50.00),
('Pierre', 75.50),
('Thomas', 100.00);
