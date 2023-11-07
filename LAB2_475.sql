DROP DATABASE IF EXISTS LAB2_475;
CREATE DATABASE LAB2_475;
use LAB2_475;

CREATE TABLE DEPARTMENT(
    name VARCHAR(25) PRIMARY KEY NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    location VARCHAR(128),
    budget DECIMAL(15, 2)
);

CREATE TABLE FACULTY(
    bunet_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(128),
    firstname VARCHAR(128),
    lastname VARCHAR(128),
    office VARCHAR(11)
);

CREATE TABLE SEMESTER(
    code VARCHAR(25) PRIMARY KEY NOT NULL,
    academic_calendar YEAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tuition_fee DECIMAL(8,2) NOT NULL
);
CREATE TABLE COURSE(
    code VARCHAR(25) NOT NULL,
    semester_code VARCHAR(25) NOT NULL,   
    name VARCHAR(128) NOT NULL,
    credit_hours INT NOT NULL,
    tutor_id INT NOT NULL,

    PRIMARY KEY (code, semester_code),
    FOREIGN KEY (semester_code) REFERENCES SEMESTER(code),
    FOREIGN KEY (tutor_id) REFERENCES FACULTY(bunet_id)
);

CREATE TABLE STUDENT(
    bunet_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    GPA DECIMAL(5, 2) DEFAULT 0,
    department_code VARCHAR(25),
    last_enrolled_semester VARCHAR(25),

    FOREIGN KEY (department_code) REFERENCES DEPARTMENT(name) on update cascade on delete cascade,
    FOREIGN KEY (last_enrolled_semester) REFERENCES SEMESTER(code) on update cascade on delete cascade
);

CREATE TABLE STUDENTCOURSE(
    course_id VARCHAR(25) NOT NULL,
    student_code INT NOT NULL,
    semester_code VARCHAR(25) NOT NULL,

    PRIMARY KEY (course_id, student_code, semester_code),
    FOREIGN KEY (course_id) REFERENCES COURSE(code) on update cascade on delete cascade,
    FOREIGN KEY (student_code) REFERENCES STUDENT(bunet_id) on update cascade on delete cascade,
    FOREIGN KEY (semester_code) REFERENCES SEMESTER(code) on update cascade on delete cascade
);

INSERT INTO DEPARTMENT (name, full_name, location, budget)
VALUES('ACC', 'Accounting', 'BECC', ROUND(RAND() * 1000000, 2)),
    ('AD', 'Art and Design', 'Bradley Hall', ROUND(RAND() * 1000000, 2)),
    ('BIO', 'Biology', 'Swords Hall', ROUND(RAND() * 1000000, 2)),
    ('BCH', 'Chemistry and Biochemistry', 'BECC', ROUND(RAND() * 1000000, 2)),
    ('CEC', 'Civil Engineering and Construction', 'Bradley Hall', ROUND(RAND() * 1000000, 2)),
    ('COM', 'Communication', 'Swords Hall', ROUND(RAND() * 1000000, 2)),
    ('CSD', 'Communication Sciences and Disorders', 'BECC', ROUND(RAND() * 1000000, 2)),
    ('CSIS', 'Computer Science and Information Systems', 'Bradley Hall', ROUND(RAND() * 1000000, 2)),  
    ('FEC', 'Economics and Finance', 'Swords Hall', ROUND(RAND() * 1000000, 2)),
    ('ECL', 'Education, Counseling and Leadership', 'BECC', ROUND(RAND() * 1000000, 2)),
    ('ECE', 'Electrical and Computer Engineering', 'Bradley Hall', ROUND(RAND() * 1000000, 2)),
    ('ENG', 'English', 'Swords Hall', ROUND(RAND() * 1000000, 2)),
    ('ETL', 'Entrepreneurship, Technology and Law', 'BECC', ROUND(RAND() * 1000000, 2)),
    ('FCS', 'Family and Consumer Sciences', 'Bradley Hall', ROUND(RAND() * 1000000, 2)),
    ('HIS', 'History', 'Swords Hall', ROUND(RAND() * 1000000, 2));

    SELECT * from DEPARTMENT;

    INSERT INTO FACULTY (email, firstname, lastname, office)
VALUES
    ('fs.jdoe@Bradley.edu', 'John', 'Doe', 'Office 101'),
    ('fs.smith@Bradley.edu', 'Mary', 'Smith', 'Office 102'),
    ('fs.johnson@Bradley.edu', 'David', 'Johnson', 'Office 103'),
    ('fs.brown@Bradley.edu', 'Sarah', 'Brown', 'Office 104'),
    ('fs.wilson@Bradley.edu', 'Michael', 'Wilson', 'Office 105'),
    ('fs.anderson@Bradley.edu', 'Jennifer', 'Anderson', 'Office 106'),
    ('fs.taylor@Bradley.edu', 'Robert', 'Taylor', 'Office 107'),
    ('fs.evans@Bradley.edu', 'Linda', 'Evans', 'Office 108'),
    ('fs.parker@Bradley.edu', 'William', 'Parker', 'Office 109'),
    ('fs.white@Bradley.edu', 'Karen', 'White', 'Office 110'),
    ('fs.hall@Bradley.edu', 'Thomas', 'Hall', 'Office 111'),
    ('fs.lewis@Bradley.edu', 'Susan', 'Lewis', 'Office 112'),
    ('fs.clark@Bradley.edu', 'Richard', 'Clark', 'Office 113'),
    ('fs.miller@Bradley.edu', 'Barbara', 'Miller', 'Office 114'),
    ('fs.harris@Bradley.edu', 'Daniel', 'Harris', 'Office 115');
select * from FACULTY;

INSERT INTO SEMESTER (code, academic_calendar, start_date, end_date, tuition_fee)
VALUES
    ('FA23', 2023, '2023-09-01', '2023-12-31', 5000.00),
    ('SP24', 2024, '2024-01-15', '2024-05-15', 5200.00),
    ('FA24', 2024, '2024-09-01', '2024-12-31', 5100.00),
    ('SP25', 2025, '2025-01-15', '2025-05-15', 5300.00),
    ('FA25', 2025, '2025-09-01', '2025-12-31', 5200.00),
    ('SP26', 2026, '2026-01-15', '2026-05-15', 5400.00),
    ('FA26', 2026, '2026-09-01', '2026-12-31', 5300.00),
    ('SP27', 2027, '2027-01-15', '2027-05-15', 5500.00),
    ('FA27', 2027, '2027-09-01', '2027-12-31', 5400.00),
    ('SP28', 2028, '2028-01-15', '2028-05-15', 5600.00),
    ('FA28', 2028, '2028-09-01', '2028-12-31', 5500.00),
    ('SP29', 2029, '2029-01-15', '2029-05-15', 5700.00),
    ('FA29', 2029, '2029-09-01', '2029-12-31', 5600.00),
    ('SP30', 2030, '2030-01-15', '2030-05-15', 5800.00),
    ('FA30', 2030, '2030-09-01', '2030-12-31', 5700.00);

select * from SEMESTER;

INSERT INTO COURSE (code, semester_code, name, credit_hours, tutor_id)
VALUES
    ('CS101', 'FA23', 'Introduction to Programming', 3, 1),
    ('CS201', 'SP24', 'Data Structures', 3, 2),
    ('CS301', 'FA24', 'Algorithms', 3, 2),
    ('CS401', 'SP25', 'Database Management', 3, 3),
    ('CS501', 'FA25', 'Software Engineering', 3, 4),
    ('HIS101', 'FA23', 'World History', 3, 13), 
    ('HIS201', 'SP24', 'American History', 3, 11),
    ('HIS301', 'FA24', 'European History', 3, 9),
    ('HIS401', 'SP25', 'Ancient History', 3, 13),
    ('HIS501', 'FA25', 'Modern History', 3, 12),
    ('BIO101', 'FA23', 'Introduction to Biology', 4, 5),
    ('BIO201', 'SP24', 'Genetics', 4, 7),
    ('BIO301', 'FA24', 'Ecology', 4, 9),
    ('BIO401', 'SP25', 'Cell Biology', 4, 6),
    ('BIO501', 'FA25', 'Microbiology', 4, 4);

select * from COURSE;

    INSERT INTO STUDENT (firstname, lastname, email, department_code, last_enrolled_semester, GPA)
VALUES
    ('Alice', 'Johnson', 'ajohnson@mail.bradley.edu', 'CSIS', 'FA23', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Bob', 'Smith', 'bsmith@mail.bradley.edu', 'HIS', 'FA23', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Charlie', 'Davis', 'cdavis@mail.bradley.edu', 'BIO', 'FA23', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('David', 'Wilson', 'dwilson@mail.bradley.edu', 'CSIS', 'FA24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Eva', 'Martin', 'emartin@mail.bradley.edu', 'HIS', 'FA24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Frank', 'Lee', 'flee@mail.bradley.edu', 'BIO', 'FA24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Grace', 'Brown', 'gbrown@mail.bradley.edu', 'CSIS', 'SP24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Helen', 'Taylor', 'htaylor@mail.bradley.edu', 'HIS', 'SP24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Ivy', 'Anderson', 'ianderson@mail.bradley.edu', 'BIO', 'SP24', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Jack', 'Clark', 'jclark@mail.bradley.edu', 'CSIS', 'FA25', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Katie', 'White', 'kwhite@mail.bradley.edu', 'HIS', 'FA25', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Liam', 'Johnson', 'ljohnson@mail.bradley.edu', 'BIO', 'FA25', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Mia', 'Smith', 'msmith@mail.bradley.edu', 'CSIS', 'SP25', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Noah', 'Davis', 'ndavis@mail.bradley.edu', 'HIS', 'SP25', ROUND(2.75 + (RAND() * 1.25), 2)),
    ('Olivia', 'Wilson', 'owilson@mail.bradley.edu', 'BIO', 'SP25', ROUND(2.75 + (RAND() * 1.25), 2));

select * from STUDENT;

INSERT INTO STUDENTCOURSE (course_id, student_code, semester_code)
VALUES
    ('CS101', 1, 'FA23'),  
    ('HIS101', 2, 'FA23'), 
    ('BIO101', 3, 'FA23'), 
    ('CS101', 4, 'FA24'),  
    ('HIS201', 5, 'FA24'), 
    ('BIO201', 6, 'FA24'), 
    ('CS201', 7, 'SP24'),  
    ('HIS301', 8, 'SP24'), 
    ('BIO301', 9, 'SP24'), 
    ('CS301', 10, 'FA25'), 
    ('HIS401', 11, 'FA25'),
    ('BIO401', 12, 'FA25'),
    ('CS401', 13, 'SP25'), 
    ('HIS501', 14, 'SP25'),
    ('BIO501', 15, 'SP25');

select * from STUDENTCOURSE;

-- Indexes for the DEPARTMENT table
CREATE INDEX idx_department_name ON DEPARTMENT(name);

-- Indexes for the COURSE table
CREATE INDEX idx_course_code ON COURSE(code);
CREATE INDEX idx_course_semester_code ON COURSE(semester_code);
CREATE INDEX idx_course_tutor_id ON COURSE(tutor_id);

-- Indexes for the STUDENT table
CREATE INDEX idx_student_code ON STUDENT(bunet_id);
CREATE INDEX idx_student_department_code ON STUDENT(department_code);
CREATE INDEX idx_student_last_enrolled_semester ON STUDENT(last_enrolled_semester);

-- Indexes for the STUDENTCOURSE table
CREATE INDEX idx_studentcourse_course_id ON STUDENTCOURSE(course_id);
CREATE INDEX idx_studentcourse_student_code ON STUDENTCOURSE(student_code);
CREATE INDEX idx_studentcourse_semester_code ON STUDENTCOURSE(semester_code);

-- Indexes for the FACULTY table
CREATE INDEX idx_faculty_bunet_id ON FACULTY(bunet_id);

-- Indexes for the SEMESTER table
CREATE INDEX idx_semester_code ON SEMESTER(code);
