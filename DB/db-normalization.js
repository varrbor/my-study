-- ============================================================
-- NORMALIZATION WALKTHROUGH: 0NF -> 1NF -> 2NF -> 3NF
-- ============================================================
-- This file is self-contained: run top to bottom in PostgreSQL.
-- Each section creates tables, inserts data, and shows a JOIN
-- query that reconstructs the "flat" view of the data at that
-- normalization level.
-- ============================================================


-- ============================================================
-- STEP 0: ORIGINAL (UNNORMALIZED) TABLE
-- ============================================================
-- Problem: class1, class2, class3 are a REPEATING GROUP.
-- This violates 1NF because a column should hold a single
-- atomic value, not "the same kind of thing" repeated across
-- multiple columns.
-- ============================================================

DROP TABLE IF EXISTS class CASCADE;

CREATE TABLE class (
    student_id SERIAL PRIMARY KEY,
    advisor    VARCHAR(100),
    room       VARCHAR(20),
    class1     VARCHAR(100),
    class2     VARCHAR(100),
    class3     VARCHAR(100)
);

INSERT INTO class (advisor, room, class1, class2, class3)
VALUES
    ('Jones', '123', 'Biology', 'Chemistry', 'Physics'),
    ('Smith', '131', 'English', 'Math',      'Library Science');

-- View the unnormalized data:
-- SELECT * FROM class;


-- ============================================================
-- STEP 1: FIRST NORMAL FORM (1NF)
-- ============================================================
-- Rule: Every column holds an atomic value. No repeating groups.
--
-- Fix: Split class1/class2/class3 into one row per (student, class)
-- pair in a separate table.
-- ============================================================

DROP TABLE IF EXISTS student_class_1nf CASCADE;
DROP TABLE IF EXISTS student CASCADE;

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    advisor    VARCHAR(100),
    room       VARCHAR(20)
);

CREATE TABLE student_class_1nf (
    student_id INTEGER REFERENCES student(student_id),
    class      VARCHAR(100),
    PRIMARY KEY (student_id, class)
);

INSERT INTO student (advisor, room) VALUES
    ('Jones', '123'),   -- student_id = 1
    ('Smith', '131');   -- student_id = 2

INSERT INTO student_class_1nf (student_id, class) VALUES
    (1, 'Biology'),
    (1, 'Chemistry'),
    (1, 'Physics'),
    (2, 'English'),
    (2, 'Math'),
    (2, 'Library Science');

-- JOIN to reconstruct the original flat view (1NF level):
SELECT
    s.student_id,
    s.advisor,
    s.room,
    sc.class
FROM student s
JOIN student_class_1nf sc ON s.student_id = sc.student_id
ORDER BY s.student_id;


-- ============================================================
-- STEP 2: SECOND NORMAL FORM (2NF)
-- ============================================================
-- Rule: 1NF + no PARTIAL DEPENDENCY. Every non-key column must
-- depend on the WHOLE composite primary key, not just part of it.
--
-- This only matters for tables with a composite key.
-- student_class_1nf has PK (student_id, class).
--
-- Suppose we add classroom/teacher info directly into that table:
--   class            -> classroom   (partial dependency, only needs "class")
--   class            -> teacher     (partial dependency, only needs "class")
-- These do NOT depend on student_id at all, so they violate 2NF.
--
-- Fix: Move class-only attributes into their own table keyed by
-- class_name alone.
-- ============================================================

DROP TABLE IF EXISTS student_class_2nf CASCADE;
DROP TABLE IF EXISTS class_info CASCADE;

CREATE TABLE class_info (
    class_name VARCHAR(100) PRIMARY KEY,
    classroom  VARCHAR(20),
    teacher    VARCHAR(100)
);

CREATE TABLE student_class_2nf (
    student_id INTEGER REFERENCES student(student_id),
    class_name VARCHAR(100) REFERENCES class_info(class_name),
    PRIMARY KEY (student_id, class_name)
);

INSERT INTO class_info (class_name, classroom, teacher) VALUES
    ('Biology',         'Room 101', 'Dr. Adams'),
    ('Chemistry',       'Room 102', 'Dr. Lee'),
    ('Physics',         'Room 103', 'Dr. Kim'),
    ('English',         'Room 201', 'Ms. Brown'),
    ('Math',            'Room 202', 'Mr. Davis'),
    ('Library Science', 'Room 301', 'Mr. White');

INSERT INTO student_class_2nf (student_id, class_name) VALUES
    (1, 'Biology'),
    (1, 'Chemistry'),
    (1, 'Physics'),
    (2, 'English'),
    (2, 'Math'),
    (2, 'Library Science');

-- JOIN to reconstruct the flat view (2NF level):
SELECT
    s.student_id,
    s.advisor,
    s.room,
    sc.class_name,
    ci.classroom,
    ci.teacher
FROM student s
JOIN student_class_2nf sc ON s.student_id = sc.student_id
JOIN class_info ci         ON sc.class_name = ci.class_name
ORDER BY s.student_id;


-- ============================================================
-- STEP 3: THIRD NORMAL FORM (3NF)
-- ============================================================
-- Rule: 2NF + no TRANSITIVE DEPENDENCY. A non-key column must
-- not depend on another non-key column.
--
-- In the "student" table:
--   student_id -> advisor          (direct, fine)
--   student_id -> room             (but room is really determined
--                                    by advisor, not by student_id!)
--   advisor    -> room             (transitive dependency)
--
-- Example of the problem: if two students share advisor "Jones",
-- room "123" gets duplicated for each of them. If Jones moves to
-- a new room, every student row referencing Jones must be updated.
--
-- Fix: Move room into its own table keyed by advisor_name.
-- ============================================================

DROP TABLE IF EXISTS student_3nf CASCADE;
DROP TABLE IF EXISTS advisor CASCADE;

CREATE TABLE advisor (
    advisor_name VARCHAR(100) PRIMARY KEY,
    room         VARCHAR(20)
);

CREATE TABLE student_3nf (
    student_id   SERIAL PRIMARY KEY,
    advisor_name VARCHAR(100) REFERENCES advisor(advisor_name)
);

INSERT INTO advisor (advisor_name, room) VALUES
    ('Jones', '123'),
    ('Smith', '131');

INSERT INTO student_3nf (advisor_name) VALUES
    ('Jones'),  -- student_id = 1
    ('Smith');  -- student_id = 2

-- Note: class_info and student_class_2nf are already in 3NF —
-- classroom and teacher depend only directly on class_name,
-- not on each other. They are reused as-is.


-- ============================================================
-- FINAL JOIN: FULL 3NF SCHEMA RECONSTRUCTED AS ONE FLAT VIEW
-- ============================================================
SELECT
    st.student_id,
    st.advisor_name   AS advisor,
    a.room             AS advisor_room,
    sc.class_name,
    ci.classroom,
    ci.teacher
FROM student_3nf st
JOIN advisor a             ON st.advisor_name = a.advisor_name
JOIN student_class_2nf sc  ON st.student_id   = sc.student_id
JOIN class_info ci         ON sc.class_name   = ci.class_name
ORDER BY st.student_id;


-- ============================================================
-- SUMMARY
-- ============================================================
-- 0NF: class(student_id, advisor, room, class1, class2, class3)
--
-- 1NF: fixed repeating groups
--   student(student_id, advisor, room)
--   student_class_1nf(student_id, class)
--
-- 2NF: fixed partial dependency (classroom/teacher depended
--      only on "class", not on student_id)
--   student(student_id, advisor, room)
--   class_info(class_name, classroom, teacher)
--   student_class_2nf(student_id, class_name)
--
-- 3NF: fixed transitive dependency (room depended on advisor,
--      not directly on student_id)
--   advisor(advisor_name, room)
--   student_3nf(student_id, advisor_name)
--   class_info(class_name, classroom, teacher)
--   student_class_2nf(student_id, class_name)
-- ============================================================