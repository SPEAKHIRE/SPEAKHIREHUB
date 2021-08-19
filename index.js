const express = require("express")
var app = express();
const mysql = require("mysql")
const cors = require("cors")
// download them by : npm install express sequelize mysql2 cors --save

//create an application
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    port: "3036",
    database: "speakhire",
});

//connect with mysql
db.connect((err) => {
    if (err){
        throw err
    }
    console.log('MySQL Connected')
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({
        message: `Hello ${name}`
    });
});

//create database
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE speakhire';
    db.query(sql, err => {
        if (err){
            throw err;
        }
        res.send('Database created!');
    });
}); 

app.get('/createprofile', (req,res) => {
    let sql = "CREATE TABLE profile(user_id int NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role ENUM('1','2','3','4','5'), first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, application_status INT NOT NULL, hear_about_us VARCHAR(255) NULL, PRIMARY KEY(user_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Profile table created!')
    });
});

app.get('/createprofileapp', (req,res) => {
    let sql = "CREATE TABLE app_info(user_id int, application_status INT NOT NULL, status ENUM('0','1','2','3','4','5'), application_type ENUM('0','1','2'), updated_by VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, FOREIGN KEY(user_id) REFERENCES profile(user_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Application Status table created!')
    });
});

app.get('/createintern', (req,res) => {
    let sql = "CREATE TABLE intern(application_id int NOT NULL AUTO_INCREMENT, intern_id int(10) NOT NULL, school_id int NOT NULL, user_id INT NOT NULL, through_school BIT, DOB DATE NOT NULL, gender VARCHAR(255) NOT NULL, grade SMALLINT(20) NULL, headshot VARCHAR(255) NOT NULL, has_phone BIT NOT NULL, phone_number VARCHAR(15) NULL, citizenship VARCHAR(255), citizenship_option VARCHAR(255), parent_origination VARCHAR(255) NULL, parents_arrive VARCHAR(255) NULL, you_arrive int(3) NULL, regional_nationality VARCHAR(255) NOT NULL, race_ethnicity_more VARCHAR(255) NOT NULL, parent_address VARCHAR(255) NOT NULL, languages_spoken VARCHAR(255) NOT NULL, other_languages_spoken VARCHAR(255) NOT NULL, religion VARCHAR(255) NOT NULL, had_internship bit NOT NULL, had_job_q1 VARCHAR(255) NULL, had_job_q2 BIT NULL, had_job_q3 VARCHAR(255) NULL, had_volunteer BIT NULL, number_of_volunteer INT(100) NULL, number_of_vol_hours INT (100) NULL, gpa SMALLINT(10), consent VARCHAR(255) NULL, commitment_form VARCHAR(255) NULL, app_fee VARCHAR(255) NULL, PRIMARY KEY(application_id, user_id), FOREIGN KEY (user_id) REFERENCES profile(user_id), FOREIGN KEY (school_id) REFERENCES school_info(school_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Intern table created!')
    });
});

app.get('/createinternaddress', (req,res) => {
    let sql = "CREATE TABLE intern_address(intern_address_id int NOT NULL, address VARCHAR(1024) NULL, city VARCHAR(255) NULL, state VARCHAR(255) NULL, zip_code INT(10) NULL, country VARCHAR(30) NULL, FOREIGN KEY (intern_address_id) REFERENCES intern(application_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Intern Address table created!')
    });
});

app.get('/createinternguardian', (req,res) => {
    let sql = "CREATE TABLE guardian_info(parent_id int NOT NULL, address VARCHAR(1024) NOT NULL, phone_number VARCHAR(1024) NOT NULL, first_name VARCHAR(40) NOT NULL, last_name VARCHAR(40) NOT NULL, relationship_to_intern VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, FOREIGN KEY (parent_id) REFERENCES intern(application_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Guardian Info created!')
    });
});

app.get('/createinternschool', (req,res) => {
    let sql = "CREATE TABLE school_address(address_id int NOT NULL, address VARCHAR(1024) NULL, city VARCHAR(255) NULL, state VARCHAR(255) NULL, zip_code INT(10) NULL, country VARCHAR(30) NULL, FOREIGN KEY (address_id) REFERENCES intern(application_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('School Address table created!')
    });
});

app.get('/createsurveyinfo', (req,res) => {
    let sql = "CREATE TABLE survey(survey_id int NOT NULL, cultural_info_1 VARCHAR(255) NULL, cultural_info_2 INT NULL, community_info_1 VARCHAR(255) NULL, community_info_2 INT NULL, career_info_1 BIT NULL, career_info_2 BIT NULL, coach_q INT NOT NULL, volunteer BIT NOT NULL, volunteer_number INT NOT NULL, individual_q_1 INT NOT NULL, individual_q_2 INT NOT NULL, class_1 INT NOT NULL, class_2 VARCHAR(255) NOT NULL, class_3 INT NOT NULL, class_4 INT NOT NULL, class_5 INT NOT NULL, class_6 INT NOT NULL, know_you_1 INT NOT NULL, know_you_2 VARCHAR(255) NOT NULL, know_you_3 VARCHAR(255) NOT NULL, know_you_4 VARCHAR(255) NOT NULL, alum_1 BIT NOT NULL, alum_2 BIT NOT NULL, alum_3 BIT NOT NULL, alum_4 BIT NOT NULL, FOREIGN KEY (survey_id) REFERENCES intern(application_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Survey table created!')
    });
});


app.get('/createchampion', (req,res) => {
    let sql = "CREATE TABLE champion(application_id int NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, DOB DATE NOT NULL, gender VARCHAR(255) NOT NULL, phone_number VARCHAR(15) NULL, citizenship VARCHAR(255), mailing_address VARCHAR(255) NOT NULL, city_res VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL, career VARCHAR(255) NOT NULL, regional_nationality VARCHAR(255) NOT NULL, race VARCHAR(255) NOT NULL, religion VARCHAR(255) NOT NULL, linked_in VARCHAR(255) NULL, resume VARCHAR(255) NULL, degree VARCHAR(255) NOT NULL, university VARCHAR(255) NOT NULL, major VARCHAR(255) NOT NULL, job VARCHAR(255) NOT NULL, immigrant_q VARCHAR(255) NOT NULL, languages VARCHAR(255) NOT NULL, other_languages VARCHAR(255) NOT NULL, other_regional_nationality VARCHAR(255) NOT NULL, photo_waiver VARCHAR(255) NULL, headshot VARCHAR(255) NULL, PRIMARY KEY(application_id), FOREIGN KEY (user_id) REFERENCES profile(user_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('Champion table created!')
    });
});

app.get('/createschool', (req,res) => {
    let sql = "CREATE TABLE school(application_id int(30) NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, school_id INT NOT NULL, school_info VARCHAR(255) NOT NULL, position_of_applicant VARCHAR(255) NOT NULL, phone_number INT(10) NOT NULL, partner_support VARCHAR(255) NOT NULL, no_partner_support VARCHAR(255) NOT NULL, student_population INT(10) NOT NULL, gender_breakdown VARCHAR(255) NOT NULL, ell_percentage INT(10) NOT NULL, low_income_percentage INT(10) NOT NULL, minority_percentage INT(10) NOT NULL, language_percentage INT(10) NOT NULL, lang_needs VARCHAR(255) NOT NULL, ethic_breakdown VARCHAR(255) NOT NULL, interested_in VARCHAR(255) NOT NULL, num_students_considered INT(10) NOT NULL, funds VARCHAR(255) NOT NULL, philiadelphia VARCHAR(255) NULL, advisory_period BIT NOT NULL, activities VARCHAR(255) NOT NULL, student_interests VARCHAR(255) NOT NULL, students_benefits VARCHAR(255) NOT NULL, school_support VARCHAR(255) NOT NULL, your_support VARCHAR(255) NOT NULL, district VARCHAR(255) NOT NULL, principal_name VARCHAR(255) NULL, principal_phone VARCHAR(255) NULL, school_website VARCHAR(255) NULL, PRIMARY KEY (application_id, school_info), FOREIGN KEY (user_id) REFERENCES profile(user_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('School table created!')
    });
});

app.get('/createschoolinfo', (req,res) => {
    let sql = "CREATE TABLE school_info(school_id int(30) NOT NULL AUTO_INCREMENT, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, school_name VARCHAR(255) NOT NULL, PRIMARY KEY(school_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send('School Info table created!')
    });
});


app.listen('3000', () => {
    console.log("Server Started on port 3000");
})